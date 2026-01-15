"""
BIFPCL Admin Configuration - User-friendly admin panel.
Includes all models with enhanced UI, search, filters, and actions.
"""

from django.contrib import admin
from django.contrib.admin import AdminSite
from django.utils.html import format_html
from django.db.models import Count
from .models import (
    Tender, News, Career, ContactMessage, ProjectStat,
    BoardMember, Project, Milestone, SustainabilityStat, CSRInitiative,
    JobApplication
)


# ==================== Custom Admin Site ====================

class BIFPCLAdminSite(AdminSite):
    """Custom admin site with BIFPCL branding."""
    site_header = '⚡ BIFPCL Admin Panel'
    site_title = 'BIFPCL Administration'
    index_title = 'Welcome to BIFPCL Content Management'
    
    def index(self, request, extra_context=None):
        """Add dashboard statistics to admin index."""
        extra_context = extra_context or {}
        
        # Dashboard statistics
        extra_context['stats'] = {
            'tenders': Tender.objects.filter(is_active=True).count(),
            'news': News.objects.filter(is_active=True).count(),
            'careers': Career.objects.filter(is_active=True).count(),
            'messages': ContactMessage.objects.filter(is_read=False).count(),
            'projects': Project.objects.filter(is_active=True).count(),
            'board_members': BoardMember.objects.filter(is_active=True).count(),
        }
        
        return super().index(request, extra_context)


# Create custom admin site instance
bifpcl_admin = BIFPCLAdminSite(name='bifpcl_admin')


# ==================== Common Mixins ====================

class ActiveStatusMixin:
    """Mixin for common active/inactive actions."""
    
    @admin.action(description='✅ Activate selected items')
    def make_active(self, request, queryset):
        count = queryset.update(is_active=True)
        self.message_user(request, f'✅ {count} item(s) activated successfully.')
    
    @admin.action(description='❌ Deactivate selected items')
    def make_inactive(self, request, queryset):
        count = queryset.update(is_active=False)
        self.message_user(request, f'❌ {count} item(s) deactivated.')


# ==================== Tender Admin ====================

@admin.register(Tender)
class TenderAdmin(ActiveStatusMixin, admin.ModelAdmin):
    list_display = ['reference_number', 'title_short', 'category_badge', 'deadline', 'status_badge', 'is_active']
    list_filter = ['category', 'is_active', 'deadline', 'created_at']
    search_fields = ['title', 'reference_number', 'description']
    ordering = ['-deadline']
    list_per_page = 20
    date_hierarchy = 'deadline'
    actions = ['make_active', 'make_inactive']
    
    fieldsets = (
        ('📋 Basic Information', {
            'fields': ('title', 'reference_number', 'category')
        }),
        ('📝 Details', {
            'fields': ('description', 'document_url')
        }),
        ('📅 Timeline', {
            'fields': ('deadline',)
        }),
        ('⚙️ Status', {
            'fields': ('is_active',),
            'classes': ('collapse',)
        }),
    )
    
    @admin.display(description='Title')
    def title_short(self, obj):
        return obj.title[:50] + '...' if len(obj.title) > 50 else obj.title
    
    @admin.display(description='Category')
    def category_badge(self, obj):
        colors = {
            'goods': '#22c55e',
            'works': '#3b82f6', 
            'services': '#f59e0b',
            'consultancy': '#8b5cf6'
        }
        return format_html(
            '<span style="background: {}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">{}</span>',
            colors.get(obj.category, '#6b7280'),
            obj.get_category_display()
        )
    
    @admin.display(description='Status')
    def status_badge(self, obj):
        from django.utils import timezone
        if obj.deadline > timezone.now():
            return format_html('<span style="color: #22c55e; font-weight: bold;">🟢 Open</span>')
        return format_html('<span style="color: #ef4444; font-weight: bold;">🔴 Closed</span>')


# ==================== News Admin ====================

@admin.register(News)
class NewsAdmin(ActiveStatusMixin, admin.ModelAdmin):
    list_display = ['title', 'featured_badge', 'created_at', 'is_active']
    list_filter = ['is_featured', 'is_active', 'created_at']
    search_fields = ['title', 'content', 'summary']
    ordering = ['-created_at']
    list_per_page = 20
    date_hierarchy = 'created_at'
    actions = ['make_active', 'make_inactive', 'make_featured', 'remove_featured']
    
    fieldsets = (
        ('📰 Article Information', {
            'fields': ('title', 'summary', 'is_featured')
        }),
        ('📝 Content', {
            'fields': ('content', 'image_url')
        }),
        ('⚙️ Status', {
            'fields': ('is_active',),
            'classes': ('collapse',)
        }),
    )
    
    @admin.display(description='Featured')
    def featured_badge(self, obj):
        if obj.is_featured:
            return format_html('<span style="color: #f59e0b; font-weight: bold;">⭐ Featured</span>')
        return format_html('<span style="color: #9ca3af;">—</span>')
    
    @admin.action(description='⭐ Mark as Featured')
    def make_featured(self, request, queryset):
        count = queryset.update(is_featured=True)
        self.message_user(request, f'⭐ {count} article(s) marked as featured.')
    
    @admin.action(description='Remove from Featured')
    def remove_featured(self, request, queryset):
        count = queryset.update(is_featured=False)
        self.message_user(request, f'{count} article(s) removed from featured.')


# ==================== Career Admin ====================

@admin.register(Career)
class CareerAdmin(ActiveStatusMixin, admin.ModelAdmin):
    list_display = ['title', 'department', 'job_type_badge', 'location', 'vacancies', 'deadline', 'is_active']
    list_filter = ['department', 'job_type', 'is_active', 'location']
    search_fields = ['title', 'description', 'requirements', 'department']
    ordering = ['-created_at']
    list_per_page = 20
    list_editable = ['vacancies']
    actions = ['make_active', 'make_inactive']
    
    fieldsets = (
        ('💼 Job Information', {
            'fields': ('title', 'department', 'job_type', 'location')
        }),
        ('📝 Details', {
            'fields': ('description', 'requirements')
        }),
        ('📊 Vacancy Details', {
            'fields': ('vacancies', 'deadline')
        }),
        ('⚙️ Status', {
            'fields': ('is_active',),
            'classes': ('collapse',)
        }),
    )
    
    @admin.display(description='Type')
    def job_type_badge(self, obj):
        colors = {
            'full_time': '#22c55e',
            'part_time': '#3b82f6',
            'contract': '#f59e0b',
            'internship': '#8b5cf6'
        }
        return format_html(
            '<span style="background: {}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">{}</span>',
            colors.get(obj.job_type, '#6b7280'),
            obj.get_job_type_display()
        )


# ==================== Contact Message Admin ====================

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'read_status', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['name', 'email', 'phone', 'subject', 'message', 'created_at']
    ordering = ['-created_at']
    list_per_page = 30
    date_hierarchy = 'created_at'
    actions = ['mark_as_read', 'mark_as_unread']
    
    fieldsets = (
        ('👤 Sender Information', {
            'fields': ('name', 'email', 'phone')
        }),
        ('💬 Message', {
            'fields': ('subject', 'message')
        }),
        ('📅 Metadata', {
            'fields': ('created_at', 'is_read')
        }),
    )
    
    @admin.display(description='Status')
    def read_status(self, obj):
        if obj.is_read:
            return format_html('<span style="color: #9ca3af;">✓ Read</span>')
        return format_html('<span style="color: #ef4444; font-weight: bold;">🔴 Unread</span>')
    
    @admin.action(description='✓ Mark as Read')
    def mark_as_read(self, request, queryset):
        count = queryset.update(is_read=True)
        self.message_user(request, f'✓ {count} message(s) marked as read.')
    
    @admin.action(description='Mark as Unread')
    def mark_as_unread(self, request, queryset):
        count = queryset.update(is_read=False)
        self.message_user(request, f'{count} message(s) marked as unread.')
    
    def has_add_permission(self, request):
        return False  # Messages are from contact form only


# ==================== Project Stat Admin ====================

@admin.register(ProjectStat)
class ProjectStatAdmin(ActiveStatusMixin, admin.ModelAdmin):
    list_display = ['icon', 'label', 'formatted_value', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    ordering = ['order']
    list_per_page = 20
    actions = ['make_active', 'make_inactive']
    
    fieldsets = (
        ('📊 Statistic Information', {
            'fields': ('label', 'value', 'suffix', 'icon')
        }),
        ('⚙️ Display Settings', {
            'fields': ('order', 'is_active')
        }),
    )
    
    @admin.display(description='Value')
    def formatted_value(self, obj):
        return format_html(
            '<span style="font-size: 16px; font-weight: bold;">{}{}</span>',
            obj.value, obj.suffix
        )


# ==================== Board Member Admin ====================

@admin.register(BoardMember)
class BoardMemberAdmin(ActiveStatusMixin, admin.ModelAdmin):
    list_display = ['name', 'title', 'chairman_badge', 'order', 'is_active']
    list_filter = ['is_chairman', 'is_active']
    search_fields = ['name', 'title', 'bio']
    ordering = ['order']
    list_editable = ['order', 'is_active']
    list_per_page = 20
    actions = ['make_active', 'make_inactive']
    
    fieldsets = (
        ('👤 Personal Information', {
            'fields': ('name', 'title', 'is_chairman')
        }),
        ('📝 Biography', {
            'fields': ('bio', 'image_url')
        }),
        ('⚙️ Display Settings', {
            'fields': ('order', 'is_active')
        }),
    )
    
    @admin.display(description='Role')
    def chairman_badge(self, obj):
        if obj.is_chairman:
            return format_html('<span style="color: #f59e0b; font-weight: bold;">👑 Chairman</span>')
        return format_html('<span style="color: #6b7280;">Director</span>')


# ==================== Project Admin ====================

@admin.register(Project)
class ProjectAdmin(ActiveStatusMixin, admin.ModelAdmin):
    list_display = ['name', 'capacity', 'status_badge', 'category_badge', 'featured_badge', 'is_active']
    list_filter = ['status', 'category', 'is_featured', 'is_active']
    search_fields = ['name', 'location', 'description']
    ordering = ['-created_at']
    list_per_page = 20
    actions = ['make_active', 'make_inactive', 'make_featured']
    
    fieldsets = (
        ('🏭 Project Information', {
            'fields': ('name', 'location', 'capacity', 'efficiency')
        }),
        ('📋 Classification', {
            'fields': ('status', 'category', 'is_featured')
        }),
        ('📝 Description', {
            'fields': ('description', 'image_url')
        }),
        ('⚙️ Status', {
            'fields': ('is_active',),
            'classes': ('collapse',)
        }),
    )
    
    @admin.display(description='Status')
    def status_badge(self, obj):
        colors = {
            'operational': '#22c55e',
            'construction': '#f59e0b',
            'planning': '#3b82f6',
            'maintenance': '#ef4444'
        }
        return format_html(
            '<span style="background: {}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">{}</span>',
            colors.get(obj.status, '#6b7280'),
            obj.get_status_display()
        )
    
    @admin.display(description='Category')
    def category_badge(self, obj):
        return obj.get_category_display()
    
    @admin.display(description='Featured')
    def featured_badge(self, obj):
        if obj.is_featured:
            return format_html('<span style="color: #f59e0b;">⭐</span>')
        return ''
    
    @admin.action(description='⭐ Mark as Featured')
    def make_featured(self, request, queryset):
        count = queryset.update(is_featured=True)
        self.message_user(request, f'⭐ {count} project(s) marked as featured.')


# ==================== Milestone Admin ====================

@admin.register(Milestone)
class MilestoneAdmin(ActiveStatusMixin, admin.ModelAdmin):
    list_display = ['year', 'title', 'order', 'is_active']
    list_filter = ['year', 'is_active']
    search_fields = ['title', 'description']
    ordering = ['order', 'year']
    list_editable = ['order', 'is_active']
    list_per_page = 20
    actions = ['make_active', 'make_inactive']
    
    fieldsets = (
        ('📅 Milestone Information', {
            'fields': ('year', 'title')
        }),
        ('📝 Description', {
            'fields': ('description',)
        }),
        ('⚙️ Display Settings', {
            'fields': ('order', 'is_active')
        }),
    )


# ==================== Sustainability Stat Admin ====================

@admin.register(SustainabilityStat)
class SustainabilityStatAdmin(ActiveStatusMixin, admin.ModelAdmin):
    list_display = ['icon', 'label', 'value', 'trend', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    ordering = ['order']
    list_per_page = 20
    actions = ['make_active', 'make_inactive']
    
    fieldsets = (
        ('🌱 Statistic Information', {
            'fields': ('label', 'value', 'trend', 'icon')
        }),
        ('⚙️ Display Settings', {
            'fields': ('order', 'is_active')
        }),
    )


# ==================== CSR Initiative Admin ====================

@admin.register(CSRInitiative)
class CSRInitiativeAdmin(ActiveStatusMixin, admin.ModelAdmin):
    list_display = ['title', 'category_badge', 'impact_metric', 'is_active']
    list_filter = ['category', 'is_active']
    search_fields = ['title', 'description', 'impact_metric']
    ordering = ['-created_at']
    list_per_page = 20
    actions = ['make_active', 'make_inactive']
    
    fieldsets = (
        ('❤️ Initiative Information', {
            'fields': ('title', 'category')
        }),
        ('📝 Details', {
            'fields': ('description', 'impact_metric', 'image_url')
        }),
        ('⚙️ Status', {
            'fields': ('is_active',),
            'classes': ('collapse',)
        }),
    )
    
    @admin.display(description='Category')
    def category_badge(self, obj):
        colors = {
            'education': '#3b82f6',
            'health': '#ef4444',
            'environment': '#22c55e',
            'livelihood': '#f59e0b'
        }
        return format_html(
            '<span style="background: {}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">{}</span>',
            colors.get(obj.category, '#6b7280'),
            obj.get_category_display()
        )


# ==================== Job Application Admin ====================

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'career_title', 'experience_years', 'review_status', 'created_at']
    list_filter = ['is_reviewed', 'career', 'created_at']
    search_fields = ['name', 'email', 'phone', 'current_position', 'career__title']
    readonly_fields = ['name', 'email', 'phone', 'cover_letter', 'resume_url', 
                       'experience_years', 'current_position', 'career', 'created_at']
    ordering = ['-created_at']
    list_per_page = 30
    date_hierarchy = 'created_at'
    actions = ['mark_as_reviewed', 'mark_as_unreviewed']
    
    fieldsets = (
        ('👤 Applicant Information', {
            'fields': ('name', 'email', 'phone', 'current_position')
        }),
        ('💼 Applied Position', {
            'fields': ('career', 'experience_years')
        }),
        ('📝 Application Details', {
            'fields': ('cover_letter', 'resume_url')
        }),
        ('📅 Metadata', {
            'fields': ('created_at', 'is_reviewed')
        }),
    )
    
    @admin.display(description='Position')
    def career_title(self, obj):
        return obj.career.title
    
    @admin.display(description='Status')
    def review_status(self, obj):
        if obj.is_reviewed:
            return format_html('<span style="color: #22c55e;">✓ Reviewed</span>')
        return format_html('<span style="color: #ef4444; font-weight: bold;">🔴 Pending</span>')
    
    @admin.action(description='✓ Mark as Reviewed')
    def mark_as_reviewed(self, request, queryset):
        count = queryset.update(is_reviewed=True)
        self.message_user(request, f'✓ {count} application(s) marked as reviewed.')
    
    @admin.action(description='Mark as Unreviewed')
    def mark_as_unreviewed(self, request, queryset):
        count = queryset.update(is_reviewed=False)
        self.message_user(request, f'{count} application(s) marked as unreviewed.')
    
    def has_add_permission(self, request):
        return False  # Applications are from frontend only
