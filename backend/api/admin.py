"""
Admin Configuration - Register models for Django Admin panel.
"""

from django.contrib import admin
from .models import Tender, News, Career, ContactMessage, ProjectStat


@admin.register(Tender)
class TenderAdmin(admin.ModelAdmin):
    list_display = ['reference_number', 'title', 'category', 'deadline', 'is_active']
    list_filter = ['category', 'is_active', 'deadline']
    search_fields = ['title', 'reference_number', 'description']
    ordering = ['-deadline']


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_featured', 'created_at', 'is_active']
    list_filter = ['is_featured', 'is_active', 'created_at']
    search_fields = ['title', 'content', 'summary']
    ordering = ['-created_at']


@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    list_display = ['title', 'department', 'job_type', 'deadline', 'vacancies', 'is_active']
    list_filter = ['department', 'job_type', 'is_active']
    search_fields = ['title', 'description', 'requirements']
    ordering = ['-created_at']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['name', 'email', 'phone', 'subject', 'message', 'created_at']
    ordering = ['-created_at']


@admin.register(ProjectStat)
class ProjectStatAdmin(admin.ModelAdmin):
    list_display = ['label', 'value', 'suffix', 'icon', 'order', 'is_active']
    list_editable = ['value', 'order', 'is_active']
    ordering = ['order']
