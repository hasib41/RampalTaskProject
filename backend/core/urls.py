"""
Core URL Configuration.
Routes API requests to the api app.
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def api_root(request):
    """API root endpoint with documentation."""
    return Response({
        'message': 'Power Company API',
        'version': '1.0',
        'endpoints': {
            'tenders': '/api/tenders/',
            'news': '/api/news/',
            'careers': '/api/careers/',
            'contact': '/api/contact/',
            'stats': '/api/stats/',
        }
    })


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('', api_root, name='api-root'),
]
