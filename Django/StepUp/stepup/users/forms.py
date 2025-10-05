from django import forms
from .models import Profile

from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class CustomUserCreationFormForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['first_name', 'email', 'username', 'password1', 'password2']
        labels = {'first_name': 'Name'}

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['name', 'email', 'username', 'country', 'synopsis',
                  'bio', 'profile_img', 'social_instagram', 'social_twitter']
        labels = {'profile_img': 'Profile Image', 'country': 'Country (one word)'}

