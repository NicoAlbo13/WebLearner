import requests
import random
# Models
from .models import Goal

# Signals
from django.db.models.signals import post_save
from django.dispatch import receiver

def defaultImage(sender, instance, created, **kwargs):
    if created:
        goal = instance
        key = 'FylHu4FHGL2WX0vxmuA9G8LAwCF702FbyaEGdCJPYWUGZVmAt2RWTjrt'
        url = 'https://api.pexels.com/v1/search?orientation=landscape&query='
        query = goal.title.replace(" ", "+")
        response = requests.get(url+query, headers={ 'Authorization': key })
        if response.status_code == 200:
            data = response.json()
            images = data.get("photos")
            imgInt = random.randint(0, len(images)-1)
            imageURL = images[imgInt]['src']["landscape"]
            goal.api_image = imageURL
            goal.save()

post_save.connect(defaultImage, sender=Goal)
