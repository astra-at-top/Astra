from django.contrib.auth.models import User
from django import forms

class customUser(forms.ModelForm):
    class Meta():
        fields = ["username", "password"]
        model = User
        widgets = {
            "username" : forms.TextInput(attrs={"class":"form-control"}),
            "username" : forms.PasswordInput(attrs={"class":"form-control"}),
        }