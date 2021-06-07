from .models import Post, Comment
from rest_framework.serializers import ModelSerializer, Serializer, PrimaryKeyRelatedField, ValidationError
from accounts.serializers import DifferentUsersSerializer
from accounts.models import User

class CommentsSerializer(ModelSerializer):
    class Meta:
        model = Comment
        exclude = ['post', ]


class PostSerializer(ModelSerializer):

    comments = CommentsSerializer(many=True)
    owner = DifferentUsersSerializer(many=False)

    def create(self, validated_data):
        del validated_data['comments']
        return Post.objects.create(**validated_data)

    def update(self, instance, validated_data):
        del validated_data['comments']
        if not instance.owner.id == validated_data.get('owner').id:
            raise ValidationError("You can't update posts of another users")
        instance.title = validated_data.get('title', instance.title)
        instance.text = validated_data.get('text', instance.text)
        instance.balance = validated_data.get('balance', instance.balance)
        instance.save()
        return instance

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['owner', ]

