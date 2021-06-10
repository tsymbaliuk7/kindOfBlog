from django.contrib import admin
from django.urls import path, include
from .views import PostViewSet, LikePostView, DislikePostView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', PostViewSet, 'post')

urlpatterns = [
    path('', include(router.urls)),
    path('<int:pk>/', include(router.urls)),
    path('like/<int:pk>/', LikePostView.as_view()),
    path('dislike/<int:pk>/', DislikePostView.as_view()),
]
