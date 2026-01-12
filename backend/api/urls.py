"""
API URL Configuration.
Uses DRF Router for automatic URL generation.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    TenderViewSet, NewsViewSet, CareerViewSet,
    ContactMessageViewSet, ProjectStatViewSet
)

# Create router and register viewsets
router = DefaultRouter()
router.register(r'tenders', TenderViewSet, basename='tender')
router.register(r'news', NewsViewSet, basename='news')
router.register(r'careers', CareerViewSet, basename='career')
router.register(r'contact', ContactMessageViewSet, basename='contact')
router.register(r'stats', ProjectStatViewSet, basename='stat')

# URL patterns
urlpatterns = [
    path('', include(router.urls)),
]
