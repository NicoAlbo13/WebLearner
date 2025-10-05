from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('profiles/', views.getProfiles), # get list of profiles, get an authenticated profile or update profile
    path('interest/', views.interest), # add/remove interest

    path('goals/', views.listGoals), # get/create goals
    path('goals/<str:pk>/', views.goals), # update/remove/get single goal

    path('tags/', views.tags), # add/remove tag
    path('tasks/', views.tasks), # add/update/remove task
]

