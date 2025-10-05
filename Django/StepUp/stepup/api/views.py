from django.shortcuts import get_object_or_404
from django.db import transaction

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from users.models import Profile, Interest
from goals.models import Goal, Tag, Task

from .serializers import ProfileSerializer, InterestSerializer, GoalSerializer, TaskSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {'GET': '/api/'},
        {'GET, PATCH': '/api/profiles/'},

        {'GET, POST': '/api/goals/'},
        {'POST, DELETE': '/api/tags/'},
        {'GET, PATCH, DELETE': '/api/goal/:id/'},
    ]

    return Response(routes)

@api_view(['GET', 'POST', 'PATCH'])
def getProfiles(request):
    if request.method == 'GET':
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data)

    if not request.user.is_authenticated:
        return Response({"error": "No user was provided"}, status=status.HTTP_401_UNAUTHORIZED)

    # POST actions
    if request.method == 'POST':
        profile = request.user.profile
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    # PATCH actions
    profile = request.user.profile
    serializer = ProfileSerializer(profile, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)

    with transaction.atomic():
        serializer.save()
        profile.refresh_from_db()

    return Response(ProfileSerializer(profile).data)

@api_view(['POST', 'DELETE'])
def interest(request):
    if request.method == 'POST':
        if 'name' not in request.data:
            return Response({"error": "name field is required"}, status=status.HTTP_404_NOT_FOUND)

        if not request.user.is_authenticated:
            return Response({"error": "No user was provided"}, status=status.HTTP_401_UNAUTHORIZED)

        profile =  request.user.profile
        serializer = InterestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=profile)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    if 'interest' not in request.data  or len(request.data.get('interest')) < 36:
        return Response({"error": "interest field is required"}, status=status.HTTP_404_NOT_FOUND)

    newinterest = get_object_or_404(Interest, id=request.data['interest'])
    newinterest.delete()
    return Response({'ok': True, 'msg': 'Interest deleted!'})

@api_view(['GET', 'POST'])
def listGoals(request):
    if request.method == 'GET':
        goals = Goal.objects.all()
        return Response(GoalSerializer(goals, many=True).data)

    if not request.user.is_authenticated:
        return Response({"error": "No user was provided"}, status=status.HTTP_401_UNAUTHORIZED)

    serializer = GoalSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    profile = getattr(request.user, 'profile', None)
    if profile is None:
        return Response({"detail": "Profile not found for user."}, status=status.HTTP_400_BAD_REQUEST)

    goal = serializer.save(owner=profile)
    return Response(GoalSerializer(goal).data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def goals(request, pk):
    goal = get_object_or_404(Goal, id=pk)

    if request.method == 'GET':
        return Response(GoalSerializer(goal, many=False).data)

    goal = get_object_or_404(Goal, id=pk, owner=request.user.profile)

    if request.method == 'DELETE':
        id = goal.id
        goal.delete()
        return Response({"id": id, "msg": "Goal was deleted"}, status=status.HTTP_206_PARTIAL_CONTENT)

    serializer = GoalSerializer(goal, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST', 'DELETE'])
def tags(request):
    if 'goal' not in request.data or len(request.data.get('goal')) < 36:
        return Response({"error": "valid goal field is required"}, status=status.HTTP_404_NOT_FOUND)

    if 'tags' not in request.data or not isinstance(request.data.get('tags'), list):
        return Response({"error": "tags field must be a list"}, status=status.HTTP_404_NOT_FOUND)

    goal = Goal.objects.get(id=request.data['goal'])

    if request.method == 'POST':
        for tag in request.data['tags']:
            newtag, created = Tag.objects.get_or_create(name=tag)
            goal.tags.add(newtag)

    if request.method == 'DELETE':
        for tag in request.data['tags']:
            deltag = Tag.objects.get(id=tag)
            goal.tags.remove(deltag)

    return Response(GoalSerializer(goal).data)

@api_view(['POST', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def tasks(request):
    profile = request.user.profile

    if request.method == 'POST':
        #Goal field only required on POST (creation)
        if 'goal' not in request.data or len(request.data.get('goal')) < 36:
            return Response({"error": "valid goal field is required"}, status=status.HTTP_404_NOT_FOUND)

        goal = get_object_or_404(Goal, id=request.data.get('goal'))
        if goal.owner.id != profile.id:
            return Response({"error": "This is not your goal"}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = TaskSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(goal=goal)
        goal.getTasksCount
        return Response(GoalSerializer(goal).data, status=status.HTTP_201_CREATED)

    if 'task' not in request.data or len(request.data.get('task')) < 36:
        return Response({"error": "valid task field is required"}, status=status.HTTP_404_NOT_FOUND)

    task = get_object_or_404(Task, id=request.data['task'], goal__owner_id=profile.id)

    if request.method == 'PATCH':
        serializer = TaskSerializer(task, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        goal = task.goal
        goal.getTasksCount
        return Response(GoalSerializer(goal).data)

    goal = task.goal
    task.delete()
    goal.getTasksCount
    return Response(GoalSerializer(goal).data)


