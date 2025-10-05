from django.urls import path
from . import views

urlpatterns = [
    path('', views.goals, name='goals'),
    path('goal/<str:pk>/', views.goal, name='goal'),

    path('create-goal/', views.createGoal, name='create-goal'),
    path('edit-goal/<str:pk>/', views.editGoal, name='edit-goal'),
    path('delete-goal/<str:pk>/', views.deleteGoal, name='delete-goal'),

    path('create-task/', views.createTask, name='create-task'),
    path('edit-task/<str:pk>/', views.editTask, name='edit-task'),
    path('complete-task/<str:pk>/', views.completeTask, name='complete-task'),
    path('delete-task/<str:pk>/', views.deleteTask, name='delete-task'),
]

