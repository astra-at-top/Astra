from django.shortcuts import render, redirect
from django.views import View
from utilities.decorators.decorators import allowunauthorize
from django.http import JsonResponse
from  django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
# Create your views here.

class RegisterView(View):
    template_name = "authenicate.html"
    
    @allowunauthorize
    def get(self, request, *args, **kwargs):
        obj = {}
        if "error_msg" in kwargs:
                obj["error_msg"] =  kwargs["error_msg"]
        
        if "success_msg " in kwargs:
            obj["success_msg"] = kwargs["success_msg"]

        if request.path == "/signup":
            obj["type"] = "Signup"
            return render(request, self.template_name , obj)
        
        if request.path == "/login":
            obj["type"] = "Login"
            return render(request, self.template_name, obj)
        
    def confirmpass(fun):
        def wrapper(self, request):
            try:
                username = request.POST.get("username")
                password = request.POST.get("password")
                confirmpassword = request.POST.get("confirmpassword")

                if username and password and confirmpassword:
                    if request.POST.get("password") == request.POST.get("confirmpassword"):
                        return fun(self, request)
                    else:
                        return self.get(request, error_msg = "password and confirmpasswor does not match ")
                elif request.path == "/logout":
                    return(self, request)
                else:
                    return self.get(request, error_msg = "Some values are missing")
            except Exception as e :
                return self.get(request, error_msg = "Some thing went wrong")
            
        return wrapper

    @confirmpass
    def post(self, request):

        username = request.POST.get("username")
        password = request.POST.get("password")

        if request.path == "/login":
            user = authenticate(request,username=username , password=password )
            if user:
                login(request, user)
                return self.get(request, success_msg="Successfully logged in")
            else:
                 return self.get(request, error_msg = "Invalid credintials")
            
        elif request.path == "/signup":
            newUser = User.objects.create_user(username=username, password=password)
            newUser.save()
            return redirect("/login")
        
        elif request.path == "/logout":
            logout(request)
            return redirect("/login")
        
        return JsonResponse({
            "msg" : "This is accepted"
        })