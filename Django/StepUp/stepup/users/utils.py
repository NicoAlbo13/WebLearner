from django.db.models import Q
from .models import Profile, Interest

def queryProfiles(request):
    search_query = ''

    if request.GET.get('q'):
        search_query = request.GET.get('q')

    interests = Interest.objects.filter(name__icontains=search_query)

    profilesObj = Profile.objects.distinct().filter(
                    Q(name__icontains=search_query) |
                    Q(synopsis__icontains=search_query) |
                    Q(interest__in = interests)
                )

    return profilesObj, search_query
