from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    is_student = models.BooleanField(default=False)
    is_trainer = models.BooleanField(default=False)
    is_hr = models.BooleanField(default=False)