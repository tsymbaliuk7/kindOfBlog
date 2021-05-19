from django.db import models
from django.core.validators import MinLengthValidator


class Post(models.Model):
    title = models.CharField(max_length=450, validators=[MinLengthValidator(3, '')])
    text = models.CharField(max_length=3000, validators=[MinLengthValidator(3, '')])
    balance = models.IntegerField(default=0)
    is_liked = models.BooleanField(default=False)
    is_disliked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    text = models.CharField(max_length=3000, validators=[MinLengthValidator(3, '')])
    balance = models.PositiveIntegerField(default=0)
    is_liked = models.BooleanField(default=False)
    is_disliked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)