"""
API Models for Power Company Website.
Defines database structure for: Tenders, News, Careers, Contact.
"""

from django.db import models


class BaseModel(models.Model):
    """Abstract base model with common fields."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class Tender(BaseModel):
    """Tender/Bid announcements."""
    title = models.CharField(max_length=255)
    description = models.TextField()
    reference_number = models.CharField(max_length=50, unique=True)
    deadline = models.DateTimeField()
    document_url = models.URLField(blank=True, null=True)
    category = models.CharField(max_length=100, choices=[
        ('goods', 'Goods'),
        ('works', 'Works'),
        ('services', 'Services'),
        ('consultancy', 'Consultancy'),
    ])

    class Meta:
        ordering = ['-deadline']
        verbose_name_plural = 'Tenders'

    def __str__(self):
        return f"{self.reference_number} - {self.title}"


class News(BaseModel):
    """News and announcements."""
    title = models.CharField(max_length=255)
    content = models.TextField()
    summary = models.CharField(max_length=500)
    image_url = models.URLField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'News'

    def __str__(self):
        return self.title


class Career(BaseModel):
    """Job postings."""
    title = models.CharField(max_length=255)
    department = models.CharField(max_length=100)
    location = models.CharField(max_length=100, default='Rampal, Bagerhat')
    description = models.TextField()
    requirements = models.TextField()
    job_type = models.CharField(max_length=50, choices=[
        ('full_time', 'Full Time'),
        ('part_time', 'Part Time'),
        ('contract', 'Contract'),
        ('internship', 'Internship'),
    ])
    deadline = models.DateField()
    vacancies = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Careers'

    def __str__(self):
        return f"{self.title} - {self.department}"


class ContactMessage(BaseModel):
    """Contact form submissions."""
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Contact Messages'

    def __str__(self):
        return f"{self.name} - {self.subject}"


class ProjectStat(BaseModel):
    """Dynamic project statistics (editable from admin)."""
    label = models.CharField(max_length=50)
    value = models.IntegerField()
    suffix = models.CharField(max_length=20, blank=True)
    icon = models.CharField(max_length=10, default='📊')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name_plural = 'Project Stats'

    def __str__(self):
        return f"{self.label}: {self.value}{self.suffix}"
