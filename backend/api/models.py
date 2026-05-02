from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.email}"

    def save(self, *args, **kwargs):
        if self.email:
            self.email = self.email.lower()
        super().save(*args, **kwargs)

class CareerApplication(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.email}"

    def save(self, *args, **kwargs):
        if self.email:
            self.email = self.email.lower()
        super().save(*args, **kwargs)

class Property(models.Model):
    TYPE_CHOICES = (
        ('FOR_SALE', 'For Sale'),
        ('FOR_LEASE', 'For Lease')
    )
    STATUS_CHOICES = (
        ('ACTIVE', 'Active'),
        ('SOLD', 'Sold'),
        ('LEASED', 'Leased')
    )
    CURRENCY_CHOICES = (
        ('INR', 'Rupees (₹)'),
        ('USD', 'Dollars ($)')
    )
    UNIT_CHOICES = (
        ('SQFT', 'Sq. Ft.'),
        ('SQM', 'Sq. M.'),
        ('ACRE', 'Acres')
    )
    title = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    price_currency = models.CharField(max_length=10, choices=CURRENCY_CHOICES, default='INR')
    price = models.CharField(max_length=100, blank=True, null=True)
    size = models.CharField(max_length=100, blank=True, null=True)
    size_unit = models.CharField(max_length=20, choices=UNIT_CHOICES, default='SQFT')
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='properties/', blank=True, null=True)
    property_type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='ACTIVE')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Properties"

class Inquiry(models.Model):
    property_title = models.CharField(max_length=255, blank=True, null=True)
    property_address = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Inquiry from {self.name} about {self.property_title}"

    def save(self, *args, **kwargs):
        if self.email:
            self.email = self.email.lower()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Inquiries"

class InvestedProject(models.Model):
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    image = models.ImageField(upload_to='invested_projects/', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Newsletter(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        if self.email:
            self.email = self.email.lower()
        super().save(*args, **kwargs)

class SiteStatistic(models.Model):
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, help_text="Lucide icon name (Building, MapPin, Leaf, Navigation)")
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.label

    class Meta:
        ordering = ['order']

class Tenant(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='tenants/')
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['order']
