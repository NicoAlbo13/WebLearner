from .models import Tag, Goal
from django.db.models import Q

def queryGoals(request):
    search_query = ''

    if request.GET.get('q'):
        search_query = request.GET.get('q')

    tags = Tag.objects.filter(name__icontains=search_query)

    goalsObjects = Goal.objects.distinct().filter(
                    Q(title__icontains=search_query) |
                    Q(owner__name__icontains=search_query) |
                    Q(tags__in=tags)
                )
    return goalsObjects, search_query
