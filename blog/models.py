from django.db import models
from django.core.validators import MinLengthValidator


class Post(models.Model):
    title = models.CharField(max_length=450, validators=[MinLengthValidator(3, '')])
    text = models.CharField(max_length=3000, validators=[MinLengthValidator(3, '')])
    upvote_num = models.PositiveIntegerField(default=0)
    downvote_num = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.CharField(max_length=3000, validators=[MinLengthValidator(3, '')])
    upvote_num = models.PositiveIntegerField(default=0)
    downvote_num = models.PositiveIntegerField(default=0)