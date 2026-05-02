from django.contrib import admin
from django.utils.html import format_html
from django.utils import timezone
from unfold.admin import ModelAdmin
from unfold.decorators import display
from .models import Contact, CareerApplication, Property, Inquiry, InvestedProject, Newsletter, SiteStatistic, Tenant


# ============================================================
#  CONTACTS
# ============================================================
@admin.register(Contact)
class ContactAdmin(ModelAdmin):
    list_fullwidth = True
    save_on_top = True
    change_form_template = "admin/custom_change_form.html"
    list_display = ("display_name", "display_email", "short_message", "display_created")
    search_fields = ("name", "email", "message")
    list_filter = ("created_at",)
    list_filter_submit = True
    list_per_page = 25
    ordering = ("-created_at",)
    date_hierarchy = "created_at"

    fieldsets = (
        ("Contact Details", {
            "fields": (("name", "email"),),
            "classes": ["tab"],
            "description": "Basic contact information of the person who reached out.",
        }),
        ("Message Content", {
            "fields": ("message",),
            "classes": ["tab"],
        }),
        ("Timestamps", {
            "fields": (("display_created", "display_updated"),),
            "classes": ["tab"],
        }),
    )
    readonly_fields = ("display_created", "display_updated")

    @display(description="Received")
    def display_created(self, obj):
        if not obj.created_at: return "—"
        return obj.created_at.strftime("%b %d, %Y – %I:%M %p")

    @display(description="Updated")
    def display_updated(self, obj):
        if not obj.updated_at: return "—"
        return obj.updated_at.strftime("%b %d, %Y – %I:%M %p")



    @display(description="Name")
    def display_name(self, obj):
        return format_html('<span style="font-weight: 600; color: #1a1a2e;">{}</span>', obj.name)

    @display(description="Email")
    def display_email(self, obj):
        return obj.email

    def short_message(self, obj):
        if not obj.message:
            return "—"
        return obj.message[:80] + ("…" if len(obj.message) > 80 else "")
    short_message.short_description = "Message Preview"


# ============================================================
#  CAREER APPLICATIONS
# ============================================================
@admin.register(CareerApplication)
class CareerApplicationAdmin(ModelAdmin):
    list_fullwidth = True
    save_on_top = True
    change_form_template = "admin/custom_change_form.html"
    list_display = ("name", "email", "phone", "display_resume", "display_notes", "display_created")
    search_fields = ("name", "email", "phone", "notes")
    list_filter = ("created_at",)
    list_filter_submit = True
    list_per_page = 25
    ordering = ("-created_at",)
    date_hierarchy = "created_at"

    fieldsets = (
        ("Applicant Information", {
            "fields": (("name", "email", "phone"),),
            "classes": ["tab"],
            "description": "Personal details submitted by the applicant.",
        }),
        ("Application Data", {
            "fields": ("resume", "notes"),
            "classes": ["tab"],
            "description": "Resume and any additional notes.",
        }),
        ("Timestamps", {
            "fields": (("display_created", "display_updated"),),
            "classes": ["tab"],
        }),
    )
    readonly_fields = ("display_created", "display_updated")

    @display(description="Resume")
    def display_resume(self, obj):
        if obj.resume:
            return format_html(
                '<a href="{}" target="_blank" style="background: #c2a990; color: white; padding: 4px 10px; border-radius: 4px; font-size: 10px; font-weight: bold; text-transform: uppercase;">View PDF</a>',
                obj.resume.url
            )
        return format_html('<span style="color: #94a3b8; font-size: 10px;">—</span>')

    @display(description="Received")
    def display_created(self, obj):
        if not obj.created_at: return "—"
        return obj.created_at.strftime("%b %d, %Y – %I:%M %p")

    @display(description="Updated")
    def display_updated(self, obj):
        if not obj.updated_at: return "—"
        return obj.updated_at.strftime("%b %d, %Y – %I:%M %p")

    def display_notes(self, obj):
        if not obj.notes:
            return "—"
        if len(obj.notes) <= 50:
            return obj.notes
        short_note = obj.notes[:50]
        return format_html(
            '<div style="max-width: 300px; word-wrap: break-word;">'
            '<span>{}</span>'
            '<span id="more-{}" style="display:none">{}</span>'
            ' <a href="javascript:void(0)" onclick="const more = document.getElementById(\'more-{}\'); if(more.style.display===\'none\') {{ more.style.display=\'inline\'; this.innerText=\' Show less\'; }} else {{ more.style.display=\'none\'; this.innerText=\' Show more\'; }}" style="color: #c2a990; font-weight: 600; text-decoration: underline; cursor: pointer;"> Show more</a>'
            '</div>',
            short_note, obj.id, obj.notes[50:], obj.id
        )
    display_notes.short_description = "Notes"


# ============================================================
#  PROPERTIES
# ============================================================
@admin.register(Property)
class PropertyAdmin(ModelAdmin):
    list_fullwidth = True
    save_on_top = True
    change_form_template = "admin/custom_change_form.html"
    list_display = ("title", "address", "display_type", "display_status", "display_price", "display_created")
    search_fields = ("title", "address", "description")
    list_filter = ("property_type", "status", "created_at")
    list_filter_submit = True
    list_per_page = 25
    ordering = ("-created_at",)
    date_hierarchy = "created_at"
    list_editable = ()
    save_as_continue = False

    fieldsets = (
        ("General Information", {
            "fields": (
                ("title", "property_type", "status"),
                ("price_currency", "price"),
                ("size_unit", "size")
            ),
            "classes": ["tab"],
            "description": "Core property details – type, pricing, and current status.",
        }),
        ("Location & Details", {
            "fields": ("address", "description"),
            "classes": ["tab"],
            "description": "Where the property is located and its full description.",
        }),
        ("Media", {
            "fields": ("image",),
            "classes": ["tab"],
            "description": "Upload property images for the listing.",
        }),
        ("Timestamps", {
            "fields": (("display_created", "display_updated"),),
            "classes": ["tab"],
        }),
    )
    readonly_fields = ("display_created", "display_updated")

    @display(description="Status", label={"ACTIVE": "success", "SOLD": "danger", "LEASED": "warning"})
    def display_status(self, obj):
        return obj.status

    @display(description="Type", label={"FOR_SALE": "info", "FOR_LEASE": "warning"})
    def display_type(self, obj):
        return obj.property_type

    @display(description="Price")
    def display_price(self, obj):
        if not obj.price:
            return "—"
        symbol = "₹" if obj.price_currency == "INR" else "$"
        return f"{symbol} {obj.price}"

    @display(description="Listed On")
    def display_created(self, obj):
        if not obj.created_at: return "—"
        return obj.created_at.strftime("%b %d, %Y – %I:%M %p")

    @display(description="Last Updated")
    def display_updated(self, obj):
        if not obj.updated_at: return "—"
        return obj.updated_at.strftime("%b %d, %Y – %I:%M %p")


# ============================================================
#  INQUIRIES
# ============================================================
@admin.register(Inquiry)
class InquiryAdmin(ModelAdmin):
    list_fullwidth = True
    save_on_top = True
    change_form_template = "admin/custom_change_form.html"
    list_display = ("name", "email", "phone", "property_title", "short_message", "display_created")
    search_fields = ("name", "email", "phone", "property_title", "property_address")
    list_filter = ("created_at",)
    list_filter_submit = True
    list_per_page = 25
    ordering = ("-created_at",)
    date_hierarchy = "created_at"

    fieldsets = (
        ("Inquirer Information", {
            "fields": (("name", "email", "phone"),),
            "classes": ["tab"],
            "description": "Who is making this inquiry.",
        }),
        ("Property Interest", {
            "fields": (("property_title", "property_address"), "message"),
            "classes": ["tab"],
            "description": "Which property they are inquiring about.",
        }),
        ("Timestamps", {
            "fields": (("display_created", "display_updated"),),
            "classes": ["tab"],
        }),
    )
    readonly_fields = ("display_created", "display_updated")

    def short_message(self, obj):
        if not obj.message:
            return "—"
        return obj.message[:60] + ("…" if len(obj.message) > 60 else "")
    short_message.short_description = "Message"

    @display(description="Received")
    def display_created(self, obj):
        if not obj.created_at: return "—"
        return obj.created_at.strftime("%b %d, %Y – %I:%M %p")

    @display(description="Updated")
    def display_updated(self, obj):
        if not obj.updated_at: return "—"
        return obj.updated_at.strftime("%b %d, %Y – %I:%M %p")


# ============================================================
#  INVESTED PROJECTS
# ============================================================
@admin.register(InvestedProject)
class InvestedProjectAdmin(ModelAdmin):
    list_fullwidth = True
    save_on_top = True
    change_form_template = "admin/custom_change_form.html"
    list_display = ("title", "location", "short_desc", "display_created")
    search_fields = ("title", "location", "description")
    list_filter = ("created_at",)
    list_filter_submit = True
    list_per_page = 25
    ordering = ("-created_at",)
    date_hierarchy = "created_at"

    fieldsets = (
        ("Project Details", {
            "fields": (("title", "location"),),
            "classes": ["tab"],
            "description": "Basic information about the invested project.",
        }),
        ("Description & Media", {
            "fields": ("description", "image"),
            "classes": ["tab"],
            "description": "Detailed description and promotional image.",
        }),
        ("Timestamps", {
            "fields": (("display_created", "display_updated"),),
            "classes": ["tab"],
        }),
    )
    readonly_fields = ("display_created", "display_updated")

    def short_desc(self, obj):
        if not obj.description:
            return "—"
        return obj.description[:80] + ("…" if len(obj.description) > 80 else "")
    short_desc.short_description = "Description"

    @display(description="Created")
    def display_created(self, obj):
        if not obj.created_at: return "—"
        return obj.created_at.strftime("%b %d, %Y – %I:%M %p")

    @display(description="Updated")
    def display_updated(self, obj):
        if not obj.updated_at: return "—"
        return obj.updated_at.strftime("%b %d, %Y – %I:%M %p")


# ============================================================
#  NEWSLETTERS
# ============================================================
@admin.register(Newsletter)
class NewsletterAdmin(ModelAdmin):
    list_fullwidth = True
    save_on_top = True
    change_form_template = "admin/custom_change_form.html"
    list_display = ("display_email", "display_created")
    search_fields = ("email",)
    list_filter = ("created_at",)
    list_filter_submit = True
    list_per_page = 50
    ordering = ("-created_at",)
    date_hierarchy = "created_at"

    fieldsets = (
        ("Subscriber Details", {
            "fields": ("email",),
            "classes": ["tab"],
            "description": "Details about the newsletter subscriber.",
        }),
        ("Timestamps", {
            "fields": (("display_created", "display_updated"),),
            "classes": ["tab"],
        }),
    )
    readonly_fields = ("display_created", "display_updated")

    @display(description="Subscriber Email")
    def display_email(self, obj):
        return obj.email

    @display(description="Subscribed On")
    def display_created(self, obj):
        if not obj.created_at: return "—"
        return obj.created_at.strftime("%b %d, %Y – %I:%M %p")

    @display(description="Updated")
    def display_updated(self, obj):
        if not obj.updated_at: return "—"
        return obj.updated_at.strftime("%b %d, %Y – %I:%M %p")


# ============================================================
#  USER & GROUP – Unfold styled overrides
# ============================================================
from django.contrib.auth.models import User, Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.admin import GroupAdmin as BaseGroupAdmin
from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm

admin.site.unregister(User)
admin.site.unregister(Group)


@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    list_fullwidth = True
    save_on_top = True
    change_form_template = "admin/custom_change_form.html"
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm
    list_display = ("username", "email", "first_name", "last_name", "display_active", "display_staff", "display_date_joined")
    list_filter = ("is_staff", "is_superuser", "is_active", "date_joined")
    list_filter_submit = True
    ordering = ("-date_joined",)

    @display(description="Active", label=True)
    def display_active(self, obj):
        return "Yes" if obj.is_active else "No"

    @display(description="Staff", label=True)
    def display_staff(self, obj):
        return "Yes" if obj.is_staff else "No"

    @display(description="Joined")
    def display_date_joined(self, obj):
        return obj.date_joined.strftime("%b %d, %Y")


# ============================================================
#  SITE STATISTICS
# ============================================================
@admin.register(SiteStatistic)
class SiteStatisticAdmin(ModelAdmin):
    list_fullwidth = True
    fieldsets = (
        ("Statistic Details", {
            "fields": (("label", "value", "icon"), "order"),
            "classes": ["tab"],
        }),
        ("Timestamps", {
            "fields": (("display_created", "display_updated"),),
            "classes": ["tab"],
        }),
    )
    readonly_fields = ("display_created", "display_updated")

    @display(description="Created")
    def display_created(self, obj):
        if not obj.created_at: return "—"
        return obj.created_at.strftime("%b %d, %Y – %I:%M %p")

    @display(description="Updated")
    def display_updated(self, obj):
        if not obj.updated_at: return "—"
        return obj.updated_at.strftime("%b %d, %Y – %I:%M %p")

    ordering = ("order",)


@admin.register(Group)
class GroupAdmin(BaseGroupAdmin, ModelAdmin):
    pass
@admin.register(Tenant)
class TenantAdmin(ModelAdmin):
    fieldsets = (
        ("Tenant Details", {
            "fields": (("name", "is_active"), "logo", "order"),
            "classes": ["tab"],
        }),
        ("Timestamps", {
            "fields": (("display_created", "display_updated"),),
            "classes": ["tab"],
        }),
    )
    readonly_fields = ("display_created", "display_updated")

    @display(description="Created")
    def display_created(self, obj):
        if not obj.created_at: return "—"
        return obj.created_at.strftime("%b %d, %Y – %I:%M %p")

    @display(description="Updated")
    def display_updated(self, obj):
        if not obj.updated_at: return "—"
        return obj.updated_at.strftime("%b %d, %Y – %I:%M %p")

    search_fields = ("name",)
