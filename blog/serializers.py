from .models import Post, Comment
from rest_framework.serializers import ModelSerializer, Serializer


class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
