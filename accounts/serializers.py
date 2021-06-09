import jwt

from .models import User, UserRefreshToken
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.conf import settings
import datetime

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=400, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password', 'token', 'refresh_token']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)

        if email is None:
            raise serializers.ValidationError(
                'An email address is required to log in.'
            )

        if password is None:
            raise serializers.ValidationError(
                'A password is required to log in.'
            )

        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password was not found.'
            )

        if not user.is_active:
            raise serializers.ValidationError(
                'This user has been deactivated.'
            )

        return {
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'token': user.token,
        }


class RefreshSerializer(serializers.Serializer):

    refresh_token = serializers.CharField(max_length=400)

    def validate(self, data):

        refresh_token = data.get('refresh_token', None)

        if refresh_token is None:
            raise serializers.ValidationError(
                'An refresh_token is None.'
            )

        payload = jwt.decode(refresh_token, key=settings.SECRET_KEY, algorithm='HS256')
        user = User.objects.get(pk=payload['id'])
        exp = payload['exp']

        if exp < int(datetime.datetime.now().timestamp()):
            raise serializers.ValidationError(
                'token expired.'
            )

        if user is None:
            raise serializers.ValidationError(
                'A user with this id was not found.'
            )

        if not user.is_active:
            raise serializers.ValidationError(
                'This user has been deactivated.'
            )

        user_refresh = UserRefreshToken.objects.get(user=user)

        if user_refresh is None:
            raise serializers.ValidationError(
                'Such user have no refresh token'

            )

        if user_refresh.refresh_token != refresh_token:
            raise serializers.ValidationError(
                'refresh_token is wrong!'
            )

        user_refresh.refresh_token = user.generate_refresh_token()
        user_refresh.save()

        return {
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'token': user.token(),
            'refresh_token': user_refresh.refresh_token,
        }


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'token')
        read_only_fields = ('token',)

    def update(self, instance, validated_data):

        password = validated_data.pop('password', None)

        for key, value in validated_data.items():
            setattr(instance, key, value)

        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance


class DifferentUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username')
        read_only_fields = ('id', 'email', 'username')
