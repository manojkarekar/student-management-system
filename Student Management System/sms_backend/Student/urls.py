from django.urls import path
from .views import StudentRegisterView, StudentLoginView , StudentLogoutView 
from .views import *

urlpatterns = [
    path('register/', StudentRegisterView.as_view()),
    path('login/', StudentLoginView.as_view()),
    path('logout/', StudentLogoutView.as_view(), name='student-logout'),
    path("verify-email/",VerifyEmailView.as_view()),
    path("dashboard/",StudentDashboardView.as_view())

]
