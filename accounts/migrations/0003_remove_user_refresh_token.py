# Generated by Django 3.2.2 on 2021-06-08 15:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20210608_1858'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='refresh_token',
        ),
    ]
