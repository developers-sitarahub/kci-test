"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Move the actual JSON API to a distinct prefix to avoid collision 
    # with Unfold Admin when it is hosted at the root (/).
    # Since the app name is 'api', Unfold uses '/api/<model>/' for its styled pages.
    path('web-services/', include('api.urls')),
]

# Media files
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path('', admin.site.urls),
]
