from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from .models import Contact, CareerApplication, Property, Inquiry, InvestedProject, Newsletter, SiteStatistic, Tenant
from .serializers import (
    ContactSerializer, CareerApplicationSerializer, PropertySerializer, 
    InquirySerializer, InvestedProjectSerializer, NewsletterSerializer, SiteStatisticSerializer,
    TenantSerializer
)

class ContactCreateView(generics.ListCreateAPIView):
    queryset = Contact.objects.all().order_by('-created_at')
    serializer_class = ContactSerializer

class CareerApplicationCreateView(generics.ListCreateAPIView):
    queryset = CareerApplication.objects.all().order_by('-created_at')
    serializer_class = CareerApplicationSerializer

class PropertyListCreateView(generics.ListCreateAPIView):
    queryset = Property.objects.all().order_by('-created_at')
    serializer_class = PropertySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['property_type', 'status']

class InquiryCreateView(generics.ListCreateAPIView):
    queryset = Inquiry.objects.all().order_by('-created_at')
    serializer_class = InquirySerializer

class InvestedProjectListCreateView(generics.ListCreateAPIView):
    queryset = InvestedProject.objects.all().order_by('-created_at')
    serializer_class = InvestedProjectSerializer

class NewsletterCreateView(generics.ListCreateAPIView):
    queryset = Newsletter.objects.all().order_by('-created_at')
    serializer_class = NewsletterSerializer

class SiteStatisticListView(generics.ListAPIView):
    queryset = SiteStatistic.objects.all()
    serializer_class = SiteStatisticSerializer

class TenantListView(generics.ListAPIView):
    queryset = Tenant.objects.filter(is_active=True)
    serializer_class = TenantSerializer
