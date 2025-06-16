from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    is_student = models.BooleanField(default=False)
    is_trainer = models.BooleanField(default=False)
    is_hr = models.BooleanField(default=False)

    is_email_verified = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, blank=True, null=True)