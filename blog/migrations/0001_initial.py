# Generated by Django 3.2.2 on 2021-06-02 14:57

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=450, validators=[django.core.validators.MinLengthValidator(3, '')])),
                ('text', models.CharField(max_length=3000, validators=[django.core.validators.MinLengthValidator(3, '')])),
                ('balance', models.IntegerField(default=0)),
                ('is_liked', models.BooleanField(default=False)),
                ('is_disliked', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=3000, validators=[django.core.validators.MinLengthValidator(3, '')])),
                ('balance', models.PositiveIntegerField(default=0)),
                ('is_liked', models.BooleanField(default=False)),
                ('is_disliked', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='blog.post')),
            ],
        ),
    ]
