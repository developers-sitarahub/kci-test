"""
Sidebar badge callbacks for Unfold admin.
Each function receives a request and returns a count for the sidebar badge.
Returns empty string when count is 0 so no badge is displayed.
"""


def property_count(request):
    from api.models import Property
    count = Property.objects.count()
    return count if count > 0 else ""


def invested_project_count(request):
    from api.models import InvestedProject
    count = InvestedProject.objects.count()
    return count if count > 0 else ""


def contact_count(request):
    from api.models import Contact
    count = Contact.objects.count()
    return count if count > 0 else ""


def inquiry_count(request):
    from api.models import Inquiry
    count = Inquiry.objects.count()
    return count if count > 0 else ""


def newsletter_count(request):
    from api.models import Newsletter
    count = Newsletter.objects.count()
    return count if count > 0 else ""


def career_application_count(request):
    from api.models import CareerApplication
    count = CareerApplication.objects.count()
    return count if count > 0 else ""


def user_count(request):
    from django.contrib.auth.models import User
    count = User.objects.count()
    return count if count > 0 else ""
