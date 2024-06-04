from django.shortcuts import redirect

def allowunauthorize(function):
    def wrapper(self, request, *args, **kwargs):
        try:
            if request.user.is_authenticated:
                return redirect("/")
            else:
                return function(self, request, *args, **kwargs)
        except Exception as e:
            return redirect("/login")
    return wrapper
