
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # Users Accounts
    path("api/hr/",include("Accounts.urls")),

    # HR routes 
    path("api/hr/",include("Hr.urls")),

    # Student routes 
    path("api/student/",include("Student.urls")),

    # trainer routes
    path("api/trainer/",include("Trainer.urls")),
]
