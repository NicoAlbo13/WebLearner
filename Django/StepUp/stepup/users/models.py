from django.db import models
import uuid

from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    # One to One Relation with built-in Django User (has interesting features)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(max_length=254, null=True, blank=True)
    username = models.CharField(max_length=150, null=True, blank=True)
    country = models.CharField(max_length=150, null=True, blank=True)
    flag_url = models.CharField(max_length=2000, null=True, blank=True)
    synopsis = models.CharField(max_length=150, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    profile_img = models.ImageField(
        null=True, blank=True, upload_to='profiles/', default='profiles/user-default.png')
    social_instagram = models.CharField(max_length=150, null=True, blank=True)
    social_twitter = models.CharField(max_length=150, null=True, blank=True)
    # Keys
    created = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                            primary_key=True, editable=False)

    def __str__(self):
        return self.name

class Interest(models.Model):
    #Relation
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=150, null=True, blank=True)
    # Keys
    created = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                            primary_key=True, editable=False)

    def __str__(self):
        return self.name
