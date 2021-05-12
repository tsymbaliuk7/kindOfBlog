from django.contrib import admin
from django.urls import path, include
from .views import PostViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', PostViewSet, 'post')

urlpatterns = [
    path('', include(router.urls)),
    path('<int:pk>/', include(router.urls))
]
