import requests
# Models
from .models import Profile
from django.contrib.auth.models import User

# Signals
from django.db.models.signals import post_save, post_delete

def createProfile(sender, instance, created, **kwargs):
    if created:
        user = instance
        Profile.objects.create(
            user = user,
            name = user.first_name,
            email = user.email,
            username = user.username,
        )

def updateUser(sender, instance, created, **kwargs):
    profile = instance
    user = profile.user
    if created == False:
        user.first_name = profile.name
        user.username = profile.username
        user.email = profile.email
        user.save()
        if profile.country:
            url = 'https://restcountries.com/v3.1/name/'
            country = profile.country
            response = requests.get(url+country)
            if response.status_code == 200:
                data = response.json()
                flagURL = data[0]['flags']['png']
                if flagURL != profile.flag_url:
                    Profile.objects.filter(id=profile.id).update(flag_url=flagURL)
        else:
            Profile.objects.filter(id=profile.id).update(flag_url=None)


post_save.connect(createProfile, sender=User)
post_save.connect(updateUser, sender=Profile)
