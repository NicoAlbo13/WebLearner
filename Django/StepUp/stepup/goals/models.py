from django.db import models
from users.models import Profile
import uuid

# Create your models here.
class Goal(models.Model):
    #Relation to user
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    #Fields
    title = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default="default.jpg")
    api_image = models.CharField(max_length=2000, null=True, blank=True)
    related_link = models.CharField(max_length=2000, null=True, blank=True)
    total_tasks = models.IntegerField(default=0, null=True, blank=True)
    completion_rate = models.IntegerField(default=0, null=True, blank=True)
    total_vote = models.IntegerField(default=0, null=True, blank=True)
    vote_ratio = models.IntegerField(default=0, null=True, blank=True)
    # Relations
    tags = models.ManyToManyField('Tag', blank=True)
    # Keys
    created = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                            primary_key=True, editable=False)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-completion_rate', '-vote_ratio', '-created']

    @property
    def commentors(self):
        return self.comment_set.all().values_list('owner__id', flat=True)

    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url

    @property
    def getTasksCount(self):
        tasks = self.tasks.all()
        completed = tasks.filter(completed=True).count()
        totalTasks = tasks.count()

        ratio = (completed/totalTasks) * 100 if totalTasks > 0 else 0

        self.total_tasks = totalTasks
        self.completion_rate = ratio
        self.save()

    @property
    def getCommentCount(self):
        comment = self.comment_set.all()
        likes = comment.filter(value="up").count()
        totalComment = comment.count()

        ratio = (likes/totalComment) * 100

        self.total_vote = totalComment
        self.vote_ratio = ratio
        self.save()

class Task(models.Model):
    #Relation to goal
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE, related_name="tasks")
    #Fields
    title = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    completed = models.BooleanField(default=False, null=True, blank=True)
    #Keys
    created = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                            primary_key=True, editable=False)

    def __str__(self):
        return self.title + " - " + self.goal.title

    class Meta:
        ordering = ['completed', '-created']

class Comment(models.Model):
    VOTE_TYPE = (
        ('up', 'Like'),
        ('down', 'Dislike')
    )
    # Relations
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE)
    # Fields
    body = models.TextField(null=True, blank=True)
    value = models.CharField(max_length=50, choices=VOTE_TYPE)
    #Keys
    created = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                            primary_key=True, editable=False)

    class Meta:
        ordering = ['-created', 'value']
        unique_together = [['owner', 'goal']]

    def __str__(self):
        return self.value + ' - ' + self.goal.title

class Tag(models.Model):
    name = models.CharField(max_length=50)
    #Keys
    created = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                            primary_key=True, editable=False)

    def __str__(self):
        return self.name