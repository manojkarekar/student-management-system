
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import StudentRegisterSerializer
from Accounts.models import CustomUser
from rest_framework import status, permissions

from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated



# custom permissions
from .permissions import IsStudent


class StudentDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsStudent]

    def get(self, request):
        user = request.user
        return Response({
            "message": "Welcome to the Student Dashboard",
            "student": {
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "is_student": user.is_student
            }
        }, status=200)


class StudentRegisterView(APIView):
    permission_classes = [AllowAny] 

    def post(self, request):
        serializer = StudentRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'message': 'Student registered successfully',
                'token': token.key
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class StudentLoginView(APIView):
    permission_classes = [AllowAny] 

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None and user.is_student:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'message': 'Login successful',
                'token': token.key
            }, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials or not a student'}, status=status.HTTP_401_UNAUTHORIZED)



class StudentLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            # Delete the token to force login again
            request.user.auth_token.delete()
            return Response({'message': 'Logged out successfully.'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'Something went wrong.'}, status=status.HTTP_400_BAD_REQUEST)