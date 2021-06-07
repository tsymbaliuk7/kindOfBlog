import json

from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_201_CREATED, HTTP_301_MOVED_PERMANENTLY, HTTP_204_NO_CONTENT
from .models import Post, Comment
from .serializers import CommentsSerializer, PostSerializer
from accounts.serializers import DifferentUsersSerializer
from accounts.models import User


class PostViewSet(ModelViewSet):
    queryset = Post.objects.order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    # def list(self, request):
    #     posts = Post.objects.all()
    #     serializer = PostSerializer(posts, many=True)
    #     return Response(serializer.data)
    #
    def retrieve(self, request, pk=None, **kwargs):
        owner = get_object_or_404(User, pk=pk)
        posts = Post.objects.filter(owner=owner).order_by('-created_at')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def update(self, request, pk=None, **kwargs):
        post = get_object_or_404(Post, pk=pk)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.validated_data['owner'] = request.user
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_404_NOT_FOUND)

    def create(self, request, **kwargs):
        request.data['owner'] = DifferentUsersSerializer(request.user).data
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['owner'] = request.user
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None, **kwargs):
        post = get_object_or_404(Post, pk=pk)
        if not post.owner.id == request.user.id:
            Response(status=HTTP_404_NOT_FOUND)
        post.delete()
        return Response(status=HTTP_204_NO_CONTENT)

