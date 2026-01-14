"""
Django settings for Power Company API.
Configured for: REST API, CORS, Jazzmin Admin, and database integration.
"""

from pathlib import Path
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'django-insecure-dev-key-change-in-production')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = ['localhost', '127.0.0.1']


# ==================== Jazzmin Admin Configuration ====================

JAZZMIN_SETTINGS = {
    # Window & Branding
    "site_title": "BIFPCL Admin",
    "site_header": "BIFPCL",
    "site_brand": "BIFPCL Admin",
    "site_logo": None,
    "login_logo": None,
    "login_logo_dark": None,
    "site_logo_classes": "img-circle",
    "site_icon": None,
    "welcome_sign": "Welcome to BIFPCL Admin Panel",
    "copyright": "Bangladesh India Friendship Power Company Ltd.",
    
    # Search
    "search_model": ["api.News", "api.Tender", "api.Career"],
    
    # Top Menu Links
    "topmenu_links": [
        {"name": "Home", "url": "admin:index", "permissions": ["auth.view_user"]},
        {"name": "View Site", "url": "/", "new_window": True},
        {"model": "auth.User"},
    ],
    
    # User Menu Links
    "usermenu_links": [
        {"name": "Website", "url": "/", "new_window": True, "icon": "fas fa-globe"},
    ],
    
    # Side Menu Configuration
    "show_sidebar": True,
    "navigation_expanded": True,
    "hide_apps": [],
    "hide_models": [],
    
    # Model ordering in sidebar
    "order_with_respect_to": [
        "auth",
        "api.News",
        "api.Tender",
        "api.Career",
        "api.ContactMessage",
        "api.Project",
        "api.BoardMember",
        "api.Milestone",
        "api.ProjectStat",
        "api.SustainabilityStat",
        "api.CSRInitiative",
    ],
    
    # Custom icons for apps/models
    "icons": {
        "auth": "fas fa-users-cog",
        "auth.user": "fas fa-user",
        "auth.Group": "fas fa-users",
        "api.Tender": "fas fa-file-contract",
        "api.News": "fas fa-newspaper",
        "api.Career": "fas fa-briefcase",
        "api.ContactMessage": "fas fa-envelope",
        "api.ProjectStat": "fas fa-chart-bar",
        "api.BoardMember": "fas fa-user-tie",
        "api.Project": "fas fa-industry",
        "api.Milestone": "fas fa-flag-checkered",
        "api.SustainabilityStat": "fas fa-leaf",
        "api.CSRInitiative": "fas fa-heart",
    },
    
    # Default icon
    "default_icon_parents": "fas fa-folder",
    "default_icon_children": "fas fa-circle",
    
    # Related Modal
    "related_modal_active": True,
    
    # Customizations
    "custom_css": None,
    "custom_js": None,
    "use_google_fonts_cdn": True,
    "show_ui_builder": False,
    
    # Change view
    "changeform_format": "horizontal_tabs",
    "changeform_format_overrides": {
        "auth.user": "collapsible",
        "auth.group": "vertical_tabs",
    },
}

# Jazzmin UI Tweaks
JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": False,
    "brand_small_text": False,
    "brand_colour": "navbar-dark",
    "accent": "accent-primary",
    "navbar": "navbar-dark navbar-primary",
    "no_navbar_border": False,
    "navbar_fixed": True,
    "layout_boxed": False,
    "footer_fixed": False,
    "sidebar_fixed": True,
    "sidebar": "sidebar-dark-primary",
    "sidebar_nav_small_text": False,
    "sidebar_disable_expand": False,
    "sidebar_nav_child_indent": True,
    "sidebar_nav_compact_style": False,
    "sidebar_nav_legacy_style": False,
    "sidebar_nav_flat_style": False,
    "theme": "default",
    "dark_mode_theme": None,
    "button_classes": {
        "primary": "btn-primary",
        "secondary": "btn-secondary",
        "info": "btn-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
        "success": "btn-success",
    },
}


# ==================== Application Definition ====================

INSTALLED_APPS = [
    # Jazzmin must be BEFORE django.contrib.admin
    'jazzmin',
    
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party apps
    'rest_framework',
    'corsheaders',
    
    # Local apps
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be at top
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# ==================== Database ====================
# Uses DATABASE_URL for Supabase, falls back to SQLite for local dev

import dj_database_url

# Default SQLite for local development
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Override with Supabase if DATABASE_URL is set
DATABASE_URL = os.getenv('DATABASE_URL')
if DATABASE_URL:
    DATABASES['default'] = dj_database_url.config(
        default=DATABASE_URL,
        conn_max_age=600,
        conn_health_checks=True,
    )


# ==================== REST Framework ====================

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}


# ==================== CORS Settings ====================
# Allow frontend to communicate with backend

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',  # Vite dev server
    'http://127.0.0.1:5173',
]

CORS_ALLOW_CREDENTIALS = True


# ==================== Password Validation ====================

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# ==================== Internationalization ====================

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Dhaka'  # Bangladesh timezone
USE_I18N = True
USE_TZ = True


# ==================== Static Files ====================

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
