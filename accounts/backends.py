import jwt

from django.conf import settings

from rest_framework import authentication, exceptions

from .models import User


class JWTAuthentication(authentication.BaseAuthentication):
    authentication_header_prefix = 'JWT'

    def authenticate(self, request):
        request.user = None
        auth_header = authentication.get_authorization_header(request).split()
        auth_header_prefix = self.authentication_header_prefix.lower()

        if not auth_header:
            return None

        if len(auth_header) == 1:
            return None

        elif len(auth_header) > 2:
            return None

        prefix = auth_header[0].decode('utf-8')
        token = auth_header[1].decode('utf-8')

        if prefix.lower() != auth_header_prefix:
            return None
        return self._authenticate_credentials(request, token)

    @staticmethod
    def _authenticate_credentials(request, token):
        # try:
        #     payload = jwt.decode(token, key=settings.SECRET_KEY, algorithm='HS256')
        #     print('111111', payload)
        # except Exception:
        #     msg = 'Ошибка аутентификации. Невозможно декодировать токен'
        #     print(2222222)
        #     raise exceptions.AuthenticationFailed(msg)

        payload = jwt.decode(token, key=settings.SECRET_KEY, algorithm='HS256')
        try:
            user = User.objects.get(pk=payload['id'])
        except User.DoesNotExist:
            msg = 'Пользователь соответствующий данному токену не найден.'
            raise exceptions.AuthenticationFailed(msg)

        if not user.is_active:
            msg = 'Данный пользователь деактивирован.'
            raise exceptions.AuthenticationFailed(msg)
        return user, token
