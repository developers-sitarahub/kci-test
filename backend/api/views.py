import uuid
import boto3
from botocore.config import Config as BotoCoreConfig

from django.conf import settings
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from .models import Contact, CareerApplication, Property, Inquiry, InvestedProject, Newsletter, SiteStatistic, Tenant
from .serializers import (
    ContactSerializer, CareerApplicationSerializer, PropertySerializer,
    InquirySerializer, InvestedProjectSerializer, NewsletterSerializer, SiteStatisticSerializer,
    TenantSerializer,
)

# ---------------------------------------------------------------------------
# Presigned-URL upload endpoint
# ---------------------------------------------------------------------------
# Allowed upload folders and their MIME types (whitelist to avoid abuse).
_ALLOWED_FOLDERS = {
    'resumes':           ['application/pdf'],
    'tenants':           ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    'properties':        ['image/jpeg', 'image/png', 'image/webp'],
    'invested_projects': ['image/jpeg', 'image/png', 'image/webp'],
}

class PresignedUploadView(APIView):
    """
    POST /web-services/upload/presign/
    Body: { "folder": "resumes", "filename": "cv.pdf", "content_type": "application/pdf" }

    Returns:
    {
        "upload_url": "https://kci-media.s3.amazonaws.com/...",  # PUT here directly
        "s3_key":     "resumes/<uuid>.pdf",                      # store this in DB
        "cdn_url":    "https://<cloudfront>/resumes/<uuid>.pdf", # final public URL
    }
    """

    def post(self, request, *args, **kwargs):
        folder       = request.data.get('folder', '').strip().rstrip('/')
        filename     = request.data.get('filename', '').strip()
        content_type = request.data.get('content_type', '').strip()

        # ── Validation ──────────────────────────────────────────────────────
        if folder not in _ALLOWED_FOLDERS:
            return Response(
                {'error': f'Invalid folder. Allowed: {list(_ALLOWED_FOLDERS.keys())}'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        allowed_types = _ALLOWED_FOLDERS[folder]
        if content_type not in allowed_types:
            return Response(
                {'error': f'Invalid content_type for "{folder}". Allowed: {allowed_types}'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not filename:
            return Response({'error': 'filename is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # ── Check S3 is configured ───────────────────────────────────────────
        if not getattr(settings, 'AWS_ACCESS_KEY_ID', None):
            return Response(
                {'error': 'S3 is not configured on this server.'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        # ── Build a UUID-prefixed S3 key to guarantee uniqueness ────────────
        ext    = filename.rsplit('.', 1)[-1] if '.' in filename else ''
        s3_key = f"{folder}/{uuid.uuid4().hex}.{ext}" if ext else f"{folder}/{uuid.uuid4().hex}"

        # ── Generate the presigned PUT URL ───────────────────────────────────
        s3_client = boto3.client(
            's3',
            region_name          = settings.AWS_S3_REGION_NAME,
            aws_access_key_id    = settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key= settings.AWS_SECRET_ACCESS_KEY,
            config               = BotoCoreConfig(signature_version='s3v4'),
        )

        expiry     = getattr(settings, 'AWS_PRESIGNED_EXPIRY', 900)
        upload_url = s3_client.generate_presigned_url(
            'put_object',
            Params={
                'Bucket':      settings.AWS_STORAGE_BUCKET_NAME,
                'Key':         s3_key,
                'ContentType': content_type,
            },
            ExpiresIn=expiry,
        )

        # ── Build the final CDN URL ──────────────────────────────────────────
        cloudfront = getattr(settings, 'CLOUDFRONT_BASE_URL', '').rstrip('/')
        if cloudfront:
            cdn_url = f"{cloudfront}/{s3_key}"
        else:
            bucket = settings.AWS_STORAGE_BUCKET_NAME
            region = settings.AWS_S3_REGION_NAME
            cdn_url = f"https://{bucket}.s3.{region}.amazonaws.com/{s3_key}"

        return Response({
            'upload_url': upload_url,
            's3_key':     s3_key,
            'cdn_url':    cdn_url,
        }, status=status.HTTP_200_OK)


# ---------------------------------------------------------------------------
# Model views
# ---------------------------------------------------------------------------

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
