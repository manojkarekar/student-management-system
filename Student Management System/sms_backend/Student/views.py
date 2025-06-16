
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


from .utils import send_otp_in_email , generate_otp 

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

            # generate otp and send it 
            if user.is_student:
                otp = generate_otp()
                user.otp = otp
                user.save()
                send_otp_in_email(user.email,otp)
            
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'message': 'Student registered successfully Please verify your email',
                'token': token.key,
                'user_id': user.id ,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# opt verification 
class VerifyEmailView(APIView):
    def post(self,request):
        user_id = request.data.get('user_id')
        otp = request.data.get('otp')

        try:
            user = CustomUser.objects.get(id=user_id)

            if not user.is_student:
                return Response({"error": "OTP verification only for students"}, status=400)
            
            if user.otp == otp:
                user.is_email_verified = True
                user.otp = None
                user.save()
                return Response({"message": "Email verified successfully"}, status=200)
            else:
                return Response({"error": "Invalid OTP"}, status=400)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        

class StudentLoginView(APIView):
    permission_classes = [AllowAny] 

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user  and user.is_student:
            if not user.is_email_verified:
                return Response({'error': 'Email is not verified'}, status=403)

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