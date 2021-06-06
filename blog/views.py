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


class PostViewSet(ModelViewSet):
    queryset = Post.objects.order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    # def list(self, request):
    #     posts = Post.objects.all()
    #     serializer = PostSerializer(posts, many=True)
    #     return Response(serializer.data)
    #
    # def retrieve(self, request, pk=None):
    #     article = get_object_or_404(Post, pk=pk)
    #     serializer = PostSerializer(article)
    #     return Response(serializer.data)
    #
    # def update(self, request, pk=None):
    #     post = get_object_or_404(Post, pk=pk)
    #     serializer = PostSerializer(post, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=HTTP_404_NOT_FOUND)
    #
    def create(self, request, **kwargs):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_404_NOT_FOUND)
    #
    # def destroy(self, request, pk=None):
    #     post = get_object_or_404(Post, pk=pk)
    #     post.delete()
    #     return Response(status=HTTP_204_NO_CONTENT)

