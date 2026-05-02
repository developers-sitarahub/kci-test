from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Contact, Inquiry, CareerApplication

@receiver(post_save, sender=Contact)
def send_contact_notification(sender, instance, created, **kwargs):
    if created:
        subject = f"New Contact Submission from {instance.name}"
        message = (
            f"You have received a new contact submission:\n\n"
            f"Name: {instance.name}\n"
            f"Email: {instance.email}\n"
            f"Message:\n{instance.message}\n\n"
            f"This record was saved in the database."
        )
        try:
            recipients = [email.strip() for email in settings.NOTIFICATION_EMAIL.split(',') if email.strip()]
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                recipients,
                fail_silently=False,
            )
        except Exception as e:
            print(f"Failed to send contact email: {e}")

@receiver(post_save, sender=Inquiry)
def send_inquiry_notification(sender, instance, created, **kwargs):
    if created:
        subject = f"New Property Inquiry: {instance.property_title}"
        message = (
            f"A user has inquired about a property:\n\n"
            f"Property: {instance.property_title}\n"
            f"Address: {instance.property_address}\n\n"
            f"Inquirer Name: {instance.name}\n"
            f"Inquirer Email: {instance.email}\n"
            f"Inquirer Phone: {instance.phone}\n"
            f"Message:\n{instance.message}\n"
        )
        try:
            recipients = [email.strip() for email in settings.NOTIFICATION_EMAIL.split(',') if email.strip()]
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                recipients,
                fail_silently=False,
            )
        except Exception as e:
            print(f"Failed to send inquiry email: {e}")

@receiver(post_save, sender=CareerApplication)
def send_career_notification(sender, instance, created, **kwargs):
    if created:
        subject = f"New Career Application from {instance.name}"
        message = (
            f"You have received a new career application:\n\n"
            f"Name: {instance.name}\n"
            f"Email: {instance.email}\n"
            f"Phone: {instance.phone}\n"
            f"Notes:\n{instance.notes}\n\n"
            f"A resume has also been uploaded. You can view it in the Admin Dashboard."
        )
        try:
            recipients = [email.strip() for email in settings.NOTIFICATION_EMAIL.split(',') if email.strip()]
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                recipients,
                fail_silently=False,
            )
        except Exception as e:
            print(f"Failed to send career email: {e}")
