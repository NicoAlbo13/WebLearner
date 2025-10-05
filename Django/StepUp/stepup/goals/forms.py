from django import forms
from .models import Goal, Task, Comment

class GoalForm(forms.ModelForm):
    class Meta:
        model = Goal
        fields = ['title', 'description', 'image',
                    'related_link']
        labels = {'image': 'Image (optional)'}

class TaskForm(forms.ModelForm):
    goal = forms.ModelChoiceField(queryset=Goal.objects.none())

    class Meta:
        model = Task
        fields = "__all__"
        exclude = ["completed"]

    def __init__(self, *args, **kwargs):
        user = kwargs.pop("user")
        super().__init__(*args, **kwargs)
        self.fields["goal"].queryset = Goal.objects.filter(owner=user.profile)

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ["value", "body"]

