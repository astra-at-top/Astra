from django.urls import path
from .views import RegisterView

urlpatterns = [
    path("signup", RegisterView.as_view(), name="Signup"),
    path("login", RegisterView.as_view(), name="Login")
]
