from django.contrib import admin

# Register your models here.
from .models import Goal, Task, Comment, Tag

admin.site.register(Goal)

admin.site.register(Task)

admin.site.register(Comment)

admin.site.register(Tag)
