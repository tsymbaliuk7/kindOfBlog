from .models import Post, Comment
from rest_framework.serializers import ModelSerializer, Serializer, PrimaryKeyRelatedField


class CommentsSerializer(ModelSerializer):
    class Meta:
        model = Comment
        exclude = ['post', ]


class PostSerializer(ModelSerializer):

    comments = CommentsSerializer(many=True)

    def create(self, validated_data):
        del validated_data['comments']
        return Post.objects.create(**validated_data)

    def update(self, instance, validated_data):
        del validated_data['comments']
        instance.title = validated_data.get('title', instance.title)
        instance.text = validated_data.get('text', instance.text)
        instance.balance = validated_data.get('balance', instance.balance)
        instance.save()
        return instance

    class Meta:
        model = Post
        fields = '__all__'
