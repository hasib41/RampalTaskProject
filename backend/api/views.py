"""
API Views - Handle HTTP requests.
Uses ViewSets for automatic CRUD operations.
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser

from .models import Tender, News, Career, ContactMessage, ProjectStat
from .serializers import (
    TenderSerializer, NewsSerializer, CareerSerializer,
    ContactMessageSerializer, ProjectStatSerializer
)


class TenderViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for Tenders.
    GET /api/tenders/ - List all active tenders
    GET /api/tenders/{id}/ - Retrieve single tender
    """
    queryset = Tender.objects.filter(is_active=True)
    serializer_class = TenderSerializer
    permission_classes = [AllowAny]


class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for News.
    GET /api/news/ - List all news
    GET /api/news/{id}/ - Retrieve single news
    GET /api/news/featured/ - Get featured news only
    """
    queryset = News.objects.filter(is_active=True)
    serializer_class = NewsSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured news articles."""
        featured = self.queryset.filter(is_featured=True)[:5]
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)


class CareerViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for Careers/Jobs.
    GET /api/careers/ - List all job openings
    GET /api/careers/{id}/ - Retrieve single job
    """
    queryset = Career.objects.filter(is_active=True)
    serializer_class = CareerSerializer
    permission_classes = [AllowAny]


class ContactMessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Contact Messages.
    POST /api/contact/ - Submit contact form
    GET /api/contact/ - Admin only: list messages
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]


class ProjectStatViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for Project Statistics.
    GET /api/stats/ - Get all stats for homepage
    """
    queryset = ProjectStat.objects.filter(is_active=True)
    serializer_class = ProjectStatSerializer
    permission_classes = [AllowAny]
