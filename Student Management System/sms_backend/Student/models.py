from django.db import models
from Accounts.models import CustomUser

class StudentProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    roll_no = models.CharField(max_length=50)
    # other fields


