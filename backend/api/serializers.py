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
    resume = CloudFrontFileField(required=False, allow_null=True)

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
