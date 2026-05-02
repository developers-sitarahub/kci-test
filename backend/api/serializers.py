from django.conf import settings
from rest_framework import serializers
from .models import (
    Contact,
    CareerApplication,
    Property,
    Inquiry,
    InvestedProject,
    Newsletter,
    SiteStatistic,
    Tenant,
)


class CloudFrontImageField(serializers.ImageField):
    """
    Custom ImageField that rewrites the returned URL to use the CloudFront
    distribution as the base, transparently replacing the direct S3 URL.

    If CLOUDFRONT_BASE_URL is not set the field falls back to the standard
    Django behaviour (direct S3 URL or local /media/ path).
    """

    def to_representation(self, value):
        if not value:
            return None

        cloudfront_base = getattr(settings, 'CLOUDFRONT_BASE_URL', '').rstrip('/')

        # value.name is the S3 object key (e.g. "properties/image.jpg").
        # Always prefer rewriting via CloudFront when the key is available,
        # so we never accidentally leak the raw S3 URL to the frontend.
        key = getattr(value, 'name', None)
        if cloudfront_base and key:
            return f"{cloudfront_base}/{key.lstrip('/')}"

        # Fallback: no CloudFront configured or key missing — use django-storages URL
        try:
            return value.url
        except Exception:
            return None


class CloudFrontFileField(serializers.FileField):
    """Same as CloudFrontImageField but for generic FileField (e.g. resumes)."""

    def to_representation(self, value):
        if not value:
            return None

        cloudfront_base = getattr(settings, 'CLOUDFRONT_BASE_URL', '').rstrip('/')

        # Always rewrite via CloudFront using the S3 object key when possible.
        key = getattr(value, 'name', None)
        if cloudfront_base and key:
            return f"{cloudfront_base}/{key.lstrip('/')}"

        # Fallback: no CloudFront configured or key missing — use django-storages URL
        try:
            return value.url
        except Exception:
            return None


# ---------------------------------------------------------------------------
# Model serializers
# ---------------------------------------------------------------------------

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class CareerApplicationSerializer(serializers.ModelSerializer):
    """
    `resume` can be submitted two ways:
    - Multipart file (Django Admin / legacy) → handled by CloudFrontFileField
    - Plain S3 key string (presigned-upload flow) → accepted as a char field and
      stored directly; CloudFrontFileField.to_representation still rewrites it to
      the CDN URL on read.
    """
    resume = CloudFrontFileField(required=False, allow_null=True)

    def to_internal_value(self, data):
        # If the client sent a plain string for 'resume' (the S3 key from
        # the presigned upload), treat it as the file name / path directly
        # rather than trying to parse it as an uploaded file.
        resume_val = data.get('resume', None)
        if isinstance(resume_val, str) and resume_val:
            # Remove resume from data so the parent doesn't try to parse it
            # as a file, then re-inject after parent runs.
            mutable = data.copy() if hasattr(data, 'copy') else dict(data)
            mutable.pop('resume', None)
            ret = super().to_internal_value(mutable)
            ret['resume'] = resume_val  # store the raw S3 key
            return ret
        return super().to_internal_value(data)

    class Meta:
        model = CareerApplication
        fields = '__all__'


class PropertySerializer(serializers.ModelSerializer):
    image = CloudFrontImageField(required=False, allow_null=True)

    class Meta:
        model = Property
        fields = '__all__'


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = '__all__'


class InvestedProjectSerializer(serializers.ModelSerializer):
    image = CloudFrontImageField(required=False, allow_null=True)

    class Meta:
        model = InvestedProject
        fields = '__all__'


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = '__all__'


class SiteStatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteStatistic
        fields = '__all__'


class TenantSerializer(serializers.ModelSerializer):
    logo = CloudFrontImageField()

    class Meta:
        model = Tenant
        fields = '__all__'
