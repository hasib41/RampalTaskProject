"""
API Views - Handle HTTP requests.
Uses ViewSets for automatic CRUD operations.
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser

from .models import (
    Tender, News, Career, ContactMessage, ProjectStat,
    BoardMember, SustainabilityStat, Project, Milestone, CSRInitiative
)
from .serializers import (
    TenderSerializer, NewsSerializer, CareerSerializer,
    ContactMessageSerializer, ProjectStatSerializer,
    BoardMemberSerializer, SustainabilityStatSerializer,
    ProjectSerializer, MilestoneSerializer, CSRInitiativeSerializer
)


class TenderViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for Tenders."""
    queryset = Tender.objects.filter(is_active=True)
    serializer_class = TenderSerializer
    permission_classes = [AllowAny]


class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for News."""
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
    """API endpoint for Careers/Jobs."""
    queryset = Career.objects.filter(is_active=True)
    serializer_class = CareerSerializer
    permission_classes = [AllowAny]


class ContactMessageViewSet(viewsets.ModelViewSet):
    """API endpoint for Contact Messages."""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]


class ProjectStatViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for Project Statistics."""
    queryset = ProjectStat.objects.filter(is_active=True)
    serializer_class = ProjectStatSerializer
    permission_classes = [AllowAny]


class BoardMemberViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for Board Members."""
    queryset = BoardMember.objects.filter(is_active=True).order_by('order')
    serializer_class = BoardMemberSerializer
    permission_classes = [AllowAny]


class SustainabilityStatViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for Sustainability Statistics."""
    queryset = SustainabilityStat.objects.filter(is_active=True).order_by('order')
    serializer_class = SustainabilityStatSerializer
    permission_classes = [AllowAny]


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for Projects."""
    queryset = Project.objects.filter(is_active=True)
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured projects."""
        featured = self.queryset.filter(is_featured=True)
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)


class MilestoneViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for Milestones."""
    queryset = Milestone.objects.filter(is_active=True).order_by('order', 'year')
    serializer_class = MilestoneSerializer
    permission_classes = [AllowAny]


class CSRInitiativeViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for CSR Initiatives."""
    queryset = CSRInitiative.objects.filter(is_active=True)
    serializer_class = CSRInitiativeSerializer
    permission_classes = [AllowAny]
