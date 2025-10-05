from rest_framework import serializers
from users.models import Profile, Interest
from goals.models import Goal, Tag, Task, Comment

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ['id', 'name']

class ProfileSerializer(serializers.ModelSerializer):
    interests = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        exclude = ['user']
        read_only_fields = ['id', 'interests', 'flag_url', 'created']

    def get_interests(self, obj):
        interests = obj.interest_set.all()
        serializer = InterestSerializer(interests, many=True)
        return serializer.data

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class ProfileReducedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'name', 'bio', 'profile_img']

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'completed', 'created']
        read_only_fields = ['id', 'created']

class CommentSerializer(serializers.ModelSerializer):
    owner = ProfileReducedSerializer(many=False)
    class Meta:
        model = Comment
        exclude = ['goal']

class GoalSerializer(serializers.ModelSerializer):
    owner = ProfileReducedSerializer(many=False, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    tasks = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Goal
        fields = "__all__"
        read_only_fields = ['id', 'owner', 'tags', 'tasks', 'comments',
                            'total_tasks', 'completion_rate', 'total_vote', 'vote_ratio', 'created']

    def get_tasks(self, obj):
        tasks = obj.tasks.all()
        serializer = TaskSerializer(tasks, many=True)
        return serializer.data

    def get_comments(self, obj):
        comments = obj.comment_set.all()
        serializer = CommentSerializer(comments, many=True)
        return serializer.data
