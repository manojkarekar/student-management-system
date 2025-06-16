import random 
from django.core.mail import send_mail

def generate_otp():
    return str(random.randint(1000000,9999999))


def  send_otp_in_email(email,otp):
    send_mail(
        subject="Your Email Verification OTP",
        message=f"Your OTP for email verification is: {otp}",
        from_email="karekarmanoj2002@gmail.com",
        recipient_list=[email],
    )