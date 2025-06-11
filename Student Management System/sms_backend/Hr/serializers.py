from rest_framework import serializers
from .models import HRProfile

class HRProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = HRProfile
        fields = '__all__'
