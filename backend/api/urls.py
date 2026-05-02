from django.urls import path
from .views import (
    ContactCreateView, CareerApplicationCreateView, PropertyListCreateView,
    InquiryCreateView, InvestedProjectListCreateView, NewsletterCreateView,
    SiteStatisticListView, TenantListView,
    PresignedUploadView,
)

urlpatterns = [
    path('contact/',           ContactCreateView.as_view(),           name='contact-create'),
    path('careers/',           CareerApplicationCreateView.as_view(), name='career-create'),
    path('properties/',        PropertyListCreateView.as_view(),      name='property-list-create'),
    path('inquiries/',         InquiryCreateView.as_view(),           name='inquiry-create'),
    path('invested-projects/', InvestedProjectListCreateView.as_view(), name='invested-project-list'),
    path('newsletter/',        NewsletterCreateView.as_view(),        name='newsletter-subscribe'),
    path('site-stats/',        SiteStatisticListView.as_view(),       name='site-stats-list'),
    path('tenants/',           TenantListView.as_view(),              name='tenant-list'),

    # ── Presigned S3 upload URL (browser uploads directly to S3) ──────────
    path('upload/presign/',    PresignedUploadView.as_view(),         name='presigned-upload'),
]
