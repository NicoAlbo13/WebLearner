from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from .utils import queryProfiles
from .models import Profile, Interest
from goals.models import Task, Goal
from .forms import CustomUserCreationFormForm, ProfileForm

from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout

# Create your views here.
def profiles(request):
    profilesObj, search_query = queryProfiles(request)

    context = {'profiles': profilesObj, 'search_query': search_query}
    return render(request, 'users/profiles.html', context)

def profile(request, pk):
    profileObj = Profile.objects.get(id=pk)
    tasks = Task.objects.filter(goal__owner__id=pk)
    context = {'profile': profileObj, 'tasks': tasks}
    return render(request, 'users/single-profile.html', context)

def loginPage(request):
    context = {'page': 'login'}

    if request.user.is_authenticated:
        return redirect('profiles')

    if request.method == "POST":
        username = request.POST['username'].lower()
        password = request.POST['password']

        try:
            user = User.objects.get(username=username)
        except:
            messages.warning(request, "User not found")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, "Welcome back!")
            return redirect(request.GET['next'] if 'next' in request.GET else 'account')
        else:
            messages.error(request, 'Incorrect Credentials')

    return render(request, 'users/login-register.html', context)

def logoutPage(request):
    logout(request)
    messages.error(request, 'Logout successful. Bye!')
    return redirect('login')

def registerPage(request):
    form = CustomUserCreationFormForm()

    if request.method == "POST":
        form = CustomUserCreationFormForm(request.POST)
        if form.is_valid:
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()

            messages.success(request, 'User registered successfully!')

            login(request, user)
            return redirect('edit-account')
        else:
            messages.error(request, 'Error during registration')

    context = {'form': form}
    return render(request, 'users/login-register.html', context)

@login_required(login_url='login')
def accountPage(request):
    profile = request.user.profile
    tasks = Task.objects.filter(goal__owner__id=profile.id)
    goals = Goal.objects.filter(owner=profile)
    context = {'profile': profile, 'tasks': tasks, 'goals': goals}
    return render(request, 'users/account.html', context)

@login_required(login_url='login')
def editAccount(request):
    profile = request.user.profile
    form = ProfileForm(instance=profile)

    if request.method == "POST":
        interests = request.POST.get('interests').replace(',', ' ').split()
        form = ProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid:
            profile = form.save()
            for interest in interests:
                Interest.objects.get_or_create(name=interest, owner=profile)
            messages.info(request, 'Your profile was updated')
            return redirect('account')

    context = {'form': form}
    return render(request, 'users/profile-form.html', context)

