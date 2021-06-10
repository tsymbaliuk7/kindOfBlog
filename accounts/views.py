import json

from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, get_object_or_404

from .models import User, UserRefreshToken
from .serializers import LoginSerializer, RegistrationSerializer, UserSerializer, DifferentUsersSerializer, RefreshSerializer
from .renderers import UserJSONRenderer


class RegistrationAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer
    renderer_classes = (UserJSONRenderer,)

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        if serializer.is_valid():
            new_user = serializer.save()
            new_token = new_user.generate_refresh_token()
            UserRefreshToken(user=new_user, refresh_token=new_token).save()
            data = {'refresh_token': new_token}
            data.update(serializer.data)
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer
    renderer_classes = (UserJSONRenderer,)

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        if serializer.is_valid():
            new_user = User.objects.get(email=serializer.data['email'])
            new_token = new_user.generate_refresh_token()
            ur = get_object_or_404(UserRefreshToken, user=new_user)
            ur.refresh_token = new_token
            ur.save()
            data = {'refresh_token': new_token}
            data.update(serializer.validated_data)
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RefreshTokenAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = RefreshSerializer

    def post(self, request):
        token = request.data
        serializer = self.serializer_class(data=token)
        print(token)
        if serializer.is_valid():
            print(serializer.validated_data)
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        return Response(None, status=status.HTTP_400_BAD_REQUEST)



class UserAPIView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        serializer_data = request.data
        serializer = self.serializer_class(request.user, data=serializer_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = User.objects.all()
        serializer = DifferentUsersSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(None, status=status.HTTP_400_BAD_REQUEST)
        serializer = DifferentUsersSerializer(user)
        return Response(serializer.data)
