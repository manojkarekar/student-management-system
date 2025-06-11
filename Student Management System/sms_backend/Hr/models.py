from django.db import models
from Accounts.models import CustomUser

class HRProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    department = models.CharField(max_length=100)
