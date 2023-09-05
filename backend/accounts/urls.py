from django.urls import path
from .views import UserRegistrationView,UserLoginViews,UserProfileViews,UserChangePasswordViews
urlpatterns = [
    path('Userapi/',UserRegistrationView.as_view(),name="register"),
    path('login/',UserLoginViews.as_view(),name="register"),
    path('UserapiViews/',UserProfileViews.as_view(),name="User Registration List"),
    path('User/ChangePassword',UserChangePasswordViews.as_view(),name="Change Password")

]
