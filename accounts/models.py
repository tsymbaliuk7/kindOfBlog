from django.db import models
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if username is None:
            raise TypeError('Users must have usernames')
        if email is None:
            raise TypeError('Users must have emails')
        user = self.model(username=username, email=self.normalize_email(email))

        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password=None):
        if password is None:
            raise TypeError('Superusers must have passwords')
        user = self.model(username=username, email=email, password=password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = UserManager()

    def __str__(self):
        return '{}, email: {}'.format(self.username, self.email)

    def _generate_jwt_token(self):
        dt = datetime.now() + timedelta(hours=5)
        token = jwt.encode({
            'id': self.pk,
            'username': self.username,
            'email': self.email,
            'exp': int(dt.timestamp()),
        }, key=settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')

    def generate_refresh_token(self):
        dt = datetime.now() + timedelta(days=30)
        token = jwt.encode({
            'id': self.pk,
            'exp': int(dt.timestamp()),
        }, key=settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')

    def token(self):
        return self._generate_jwt_token()

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username


class UserRefreshToken(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, unique=True)
    refresh_token = models.CharField(default='', max_length=400)
