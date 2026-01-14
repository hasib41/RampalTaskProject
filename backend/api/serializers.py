"""
API Serializers - Convert models to/from JSON.
"""

from rest_framework import serializers
from .models import (
    Tender, News, Career, ContactMessage, ProjectStat,
    BoardMember, SustainabilityStat, Project, Milestone, CSRInitiative
)


class TenderSerializer(serializers.ModelSerializer):
    """Serializer for Tender model."""
    
    class Meta:
        model = Tender
        fields = [
            'id', 'title', 'description', 'reference_number',
            'deadline', 'document_url', 'category', 'created_at', 'is_active'
        ]
        read_only_fields = ['id', 'created_at']


class NewsSerializer(serializers.ModelSerializer):
    """Serializer for News model."""
    
    class Meta:
        model = News
        fields = [
            'id', 'title', 'content', 'summary',
            'image_url', 'is_featured', 'created_at', 'is_active'
        ]
        read_only_fields = ['id', 'created_at']


class CareerSerializer(serializers.ModelSerializer):
    """Serializer for Career model."""
    
    class Meta:
        model = Career
        fields = [
            'id', 'title', 'department', 'location',
            'description', 'requirements', 'job_type',
            'deadline', 'vacancies', 'created_at', 'is_active'
        ]
        read_only_fields = ['id', 'created_at']


class ContactMessageSerializer(serializers.ModelSerializer):
    """Serializer for ContactMessage model."""
    
    class Meta:
        model = ContactMessage
        fields = [
            'id', 'name', 'email', 'phone',
            'subject', 'message', 'is_read', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class ProjectStatSerializer(serializers.ModelSerializer):
    """Serializer for ProjectStat model."""
    
    class Meta:
        model = ProjectStat
        fields = ['id', 'label', 'value', 'suffix', 'icon', 'order', 'is_active']
        read_only_fields = ['id']


class BoardMemberSerializer(serializers.ModelSerializer):
    """Serializer for BoardMember model."""
    
    class Meta:
        model = BoardMember
        fields = [
            'id', 'name', 'title', 'bio', 'image_url',
            'is_chairman', 'order', 'is_active'
        ]
        read_only_fields = ['id']


class SustainabilityStatSerializer(serializers.ModelSerializer):
    """Serializer for SustainabilityStat model."""
    
    class Meta:
        model = SustainabilityStat
        fields = ['id', 'label', 'value', 'trend', 'icon', 'order', 'is_active']
        read_only_fields = ['id']


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for Project model."""
    
    class Meta:
        model = Project
        fields = [
            'id', 'name', 'location', 'description', 'capacity',
            'status', 'category', 'image_url', 'efficiency',
            'is_featured', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class MilestoneSerializer(serializers.ModelSerializer):
    """Serializer for Milestone model."""
    
    class Meta:
        model = Milestone
        fields = ['id', 'year', 'title', 'description', 'order', 'is_active']
        read_only_fields = ['id']


class CSRInitiativeSerializer(serializers.ModelSerializer):
    """Serializer for CSRInitiative model."""
    
    class Meta:
        model = CSRInitiative
        fields = [
            'id', 'title', 'description', 'category',
            'impact_metric', 'image_url', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
