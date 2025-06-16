# student/serializers.py

from rest_framework import serializers
from Accounts.models import CustomUser
from .models import StudentProfile

# student register serializers 
class StudentRegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)


    # CustomUser is the custom class 
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password','confirm_password', 'first_name','last_name',]
        extra_kwargs = {'password': {'write_only': True}}

    # validate password fields 
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password":["Password do not match...."]})
        return data
    
    
    def create(self, validated_data):
        validated_data.pop('confirm_password') #remove the confirm_password fields 

        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            is_student=True
        )
        StudentProfile.objects.create(user=user)
        return user
