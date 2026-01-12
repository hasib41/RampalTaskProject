"""
API Serializers - Convert models to/from JSON.
"""

from rest_framework import serializers
from .models import Tender, News, Career, ContactMessage, ProjectStat


class TenderSerializer(serializers.ModelSerializer):
    """Serializer for Tender model."""
    
    class Meta:
        model = Tender
        fields = [
            'id', 'title', 'description', 'reference_number',
            'deadline', 'document_url', 'category', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class NewsSerializer(serializers.ModelSerializer):
    """Serializer for News model."""
    
    class Meta:
        model = News
        fields = [
            'id', 'title', 'content', 'summary',
            'image_url', 'is_featured', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class CareerSerializer(serializers.ModelSerializer):
    """Serializer for Career model."""
    
    class Meta:
        model = Career
        fields = [
            'id', 'title', 'department', 'location',
            'description', 'requirements', 'job_type',
            'deadline', 'vacancies', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class ContactMessageSerializer(serializers.ModelSerializer):
    """Serializer for ContactMessage model."""
    
    class Meta:
        model = ContactMessage
        fields = [
            'id', 'name', 'email', 'phone',
            'subject', 'message', 'created_at'
        ]
        read_only_fields = ['id', 'created_at', 'is_read']


class ProjectStatSerializer(serializers.ModelSerializer):
    """Serializer for ProjectStat model."""
    
    class Meta:
        model = ProjectStat
        fields = ['id', 'label', 'value', 'suffix', 'icon', 'order']
        read_only_fields = ['id']
