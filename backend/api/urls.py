"""
API URL Configuration.
Uses DRF Router for automatic URL generation.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    TenderViewSet, NewsViewSet, CareerViewSet,
    ContactMessageViewSet, ProjectStatViewSet,
    BoardMemberViewSet, SustainabilityStatViewSet,
    ProjectViewSet, MilestoneViewSet, CSRInitiativeViewSet
)

# Create router and register viewsets
router = DefaultRouter()
router.register(r'tenders', TenderViewSet, basename='tender')
router.register(r'news', NewsViewSet, basename='news')
router.register(r'careers', CareerViewSet, basename='career')
router.register(r'contact', ContactMessageViewSet, basename='contact')
router.register(r'stats', ProjectStatViewSet, basename='stat')
router.register(r'board', BoardMemberViewSet, basename='board')
router.register(r'sustainability', SustainabilityStatViewSet, basename='sustainability')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'milestones', MilestoneViewSet, basename='milestone')
router.register(r'csr', CSRInitiativeViewSet, basename='csr')

# URL patterns
urlpatterns = [
    path('', include(router.urls)),
]
