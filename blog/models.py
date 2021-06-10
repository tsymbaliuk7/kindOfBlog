from django.db import models
from django.core.validators import MinLengthValidator
from accounts.models import User


class Post(models.Model):
    title = models.CharField(max_length=450, validators=[MinLengthValidator(3, '')])
    text = models.CharField(max_length=3000, validators=[MinLengthValidator(3, '')])
    balance = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    likes = models.ManyToManyField(User, through='blog.LikePost', related_name='post_likes')
    dislikes = models.ManyToManyField(User, through='blog.DislikePost', related_name='post_dislikes')

    def like(self, user):
        like, created = LikePost.objects.get_or_create(user=user, post=self)
        if created:
            self.balance += 1
            try:
                dislike = DislikePost.objects.get(user=user, post=self)
                dislike.delete()
                self.balance += 1
            except DislikePost.DoesNotExist:
                pass
            self.save()
        else:
            self.balance -= 1
            like.delete()
            self.save()

    def dislike(self, user):
        dislike, created = DislikePost.objects.get_or_create(user=user, post=self)
        if created:
            self.balance -= 1
            try:
                like = LikePost.objects.get(user=user, post=self)
                like.delete()
                self.balance -= 1
            except LikePost.DoesNotExist:
                pass
            self.save()
        else:
            self.balance += 1
            dislike.delete()
            self.save()

    def __str__(self):
        return self.title


class LikePost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)


class DislikePost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    text = models.CharField(max_length=3000, validators=[MinLengthValidator(3, '')])
    balance = models.PositiveIntegerField(default=0)
    is_liked = models.BooleanField(default=False)
    is_disliked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
