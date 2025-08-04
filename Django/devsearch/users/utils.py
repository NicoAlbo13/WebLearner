from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

from .models import Skill, Profile
from django.db.models import Q


def paginateProfiles(request, profiles, results):
    page = request.GET.get('page') or 1
    paginator = Paginator(profiles, results)

    try:
        profiles = paginator.page(page)
    except PageNotAnInteger:
        profiles = paginator.page(1)
    except EmptyPage:
        page = paginator.num_pages
        profiles = paginator.page(page)

    leftIndex = (int(page)-4)

    if leftIndex < 1:
        leftIndex = 1

    rightIndex = (int(page)+5)

    if rightIndex > paginator.num_pages:
        rightIndex = paginator.num_pages + 1

    custom_range = range(leftIndex, rightIndex)

    return custom_range, profiles

def searchProfiles(request):
    search_query = ''

    if request.GET.get('text'):
        search_query = request.GET.get('text')

    skills = Skill.objects.filter(name__icontains=search_query)

    profiles = Profile.objects.distinct().filter(
            Q(name__icontains=search_query) |
            Q(synopsis__icontains=search_query)|
            Q(skill__in = skills)
        )

    return profiles, search_query
