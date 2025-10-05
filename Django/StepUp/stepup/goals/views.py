from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from .utils import queryGoals
from .models import Goal, Task, Tag
from .forms import GoalForm, TaskForm, CommentForm

# List all goals
def goals(request):
    goalsObjects, search_query = queryGoals(request)
    context = {'goals': goalsObjects, 'search_query': search_query}
    return render(request, 'goals/goals.html', context)

# List a single goal
def goal(request, pk):
    goalObj = Goal.objects.get(id=pk)
    tasks = goalObj.tasks.all()
    form = CommentForm()

    if request.method == "POST":
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.owner = request.user.profile
            comment.goal = goalObj
            comment.save()

            goalObj.getCommentCount
            messages.success(request, 'Comment saved successfully!')
            return redirect('goal', pk=goalObj.id)

    context = {'goal': goalObj, 'tasks': tasks, 'form': form}
    return render(request, 'goals/single-goal.html', context)

# Form to create a goal
@login_required(login_url='login')
def createGoal(request):
    form = GoalForm()

    if request.method == "POST":
        newtags = request.POST.get('tags').replace(',', '').split()
        form = GoalForm(request.POST, request.FILES)
        if form.is_valid:
            profile = request.user.profile
            goal = form.save(commit=False)
            goal.owner = profile
            goal.save()

            for tag in newtags:
                newtag, created = Tag.objects.get_or_create(name=tag)
                goal.tags.add(newtag)

            messages.success(request, 'You created a new goal!')
            return redirect('account')

    context ={'form': form}
    return render(request, 'goals/goal-form.html', context)

@login_required(login_url='login')
def editGoal(request, pk):
    profile = request.user.profile
    goal = profile.goal_set.get(id=pk)
    form = GoalForm(instance=goal)

    if request.method == "POST":
        newtags = request.POST.get('tags').replace(',', '').split()
        form = GoalForm(request.POST, request.FILES, instance=goal)
        if form.is_valid:
            goal = form.save()

            for tag in newtags:
                newtag, created = Tag.objects.get_or_create(name=tag)
                goal.tags.add(newtag)

            messages.info(request, 'Goal updated')
            return redirect('account')

    context = {'form': form}
    return render(request, 'goals/goal-form.html', context)

@login_required(login_url='login')
def deleteGoal(request, pk):
    profile = request.user.profile
    goal = profile.goal_set.get(id=pk)

    if request.method == "POST":
        goal.delete()
        messages.success(request, 'Goal deleted successfully')
        return redirect('account')

    context = {'item': goal.title}
    return render(request, 'delete-object.html', context)

@login_required(login_url='login')
def createTask(request):
    profile = request.user.profile
    goal = profile.goal_set.all()

    if len(goal) <= 0:
        messages.warning(request, 'You need a goal before adding a task')
        return redirect('account')

    form = TaskForm(user=request.user)
    if request.method == "POST":
        form = TaskForm(request.POST, user=request.user)
        if form.is_valid():
            task = form.save()
            task.goal.getTasksCount
            messages.success(request, 'Task was created')
            return redirect('account')

    context = {'form': form}
    return render(request, 'goals/task-form.html', context)

@login_required(login_url='login')
def editTask(request, pk):
    profile = request.user.profile
    task = get_object_or_404(Task, id=pk, goal__owner=profile)
    form = TaskForm(instance=task, user=request.user)

    if request.method == "POST":
        form = TaskForm(request.POST, user=request.user, instance=task)
        if form.is_valid():
            form.save()
            messages.info(request, 'Task updated!')
            return redirect('account')

    context = {'form': form}
    return render(request, 'goals/task-form.html', context)

@login_required(login_url='login')
def completeTask(request, pk):
    profile = request.user.profile
    task = get_object_or_404(Task, id=pk, goal__owner=profile)
    task.completed = not task.completed
    task.save()
    task.goal.getTasksCount
    if task.completed:
        messages.success(request, 'Congrats! Task completed')
    else:
        messages.warning(request, 'Task reactivated')
    return redirect('account')

@login_required(login_url='login')
def deleteTask(request, pk):
    profile = request.user.profile
    task = get_object_or_404(Task, id=pk, goal__owner=profile)

    if request.method == "POST":
        goal = task.goal
        task.delete()
        goal.getTasksCount
        messages.success(request, 'Task was deleted')
        return redirect('account')

    context = {'item': task}
    return render(request, 'delete-object.html', context)
