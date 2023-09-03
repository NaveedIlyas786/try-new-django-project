from django.urls import path
from .views import UserRegistrationView,UserLoginViews
urlpatterns = [
    path('Userapi/',UserRegistrationView.as_view(),name="register"),
    path('login/',UserLoginViews.as_view(),name="register"),

]
