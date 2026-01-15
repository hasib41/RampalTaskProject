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


class TenderViewSet(viewsets.ModelViewSet):
    """API endpoint for Tenders - Full CRUD."""
    queryset = Tender.objects.all()
    serializer_class = TenderSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.action == 'list':
            return Tender.objects.filter(is_active=True)
        return Tender.objects.all()


class NewsViewSet(viewsets.ModelViewSet):
    """API endpoint for News - Full CRUD."""
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.action == 'list':
            return News.objects.filter(is_active=True)
        return News.objects.all()

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured news articles."""
        featured = News.objects.filter(is_active=True, is_featured=True)[:5]
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)


class CareerViewSet(viewsets.ModelViewSet):
    """API endpoint for Careers/Jobs - Full CRUD."""
    queryset = Career.objects.all()
    serializer_class = CareerSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.action == 'list':
            return Career.objects.filter(is_active=True)
        return Career.objects.all()


class ContactMessageViewSet(viewsets.ModelViewSet):
    """API endpoint for Contact Messages."""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        """Mark a message as read."""
        message = self.get_object()
        message.is_read = True
        message.save()
        return Response({'status': 'marked as read'})


class ProjectStatViewSet(viewsets.ModelViewSet):
    """API endpoint for Project Statistics - Full CRUD."""
    queryset = ProjectStat.objects.all()
    serializer_class = ProjectStatSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.action == 'list':
            return ProjectStat.objects.filter(is_active=True)
        return ProjectStat.objects.all()


class BoardMemberViewSet(viewsets.ModelViewSet):
    """API endpoint for Board Members - Full CRUD."""
    queryset = BoardMember.objects.all()
    serializer_class = BoardMemberSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.action == 'list':
            return BoardMember.objects.filter(is_active=True).order_by('order')
        return BoardMember.objects.all()


class SustainabilityStatViewSet(viewsets.ModelViewSet):
    """API endpoint for Sustainability Statistics - Full CRUD."""
    queryset = SustainabilityStat.objects.all()
    serializer_class = SustainabilityStatSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.action == 'list':
            return SustainabilityStat.objects.filter(is_active=True).order_by('order')
        return SustainabilityStat.objects.all()


class ProjectViewSet(viewsets.ModelViewSet):
    """API endpoint for Projects - Full CRUD."""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.action == 'list':
            return Project.objects.filter(is_active=True)
        return Project.objects.all()

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured projects."""
        featured = Project.objects.filter(is_active=True, is_featured=True)
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)


class MilestoneViewSet(viewsets.ModelViewSet):
    """API endpoint for Milestones - Full CRUD."""
    queryset = Milestone.objects.all()
    serializer_class = MilestoneSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.action == 'list':
            return Milestone.objects.filter(is_active=True).order_by('order', 'year')
        return Milestone.objects.all()


class CSRInitiativeViewSet(viewsets.ModelViewSet):
    """API endpoint for CSR Initiatives - Full CRUD."""
    queryset = CSRInitiative.objects.all()
    serializer_class = CSRInitiativeSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.action == 'list':
            return CSRInitiative.objects.filter(is_active=True)
        return CSRInitiative.objects.all()

