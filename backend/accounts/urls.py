from django.urls import path
from .views import UserRegistrationView,UserLoginViews,UserProfileViews,UserChangePasswordViews,SendEmailResetPasswordViews,UserPasswordResetViews
urlpatterns = [
    path('Userapi/',UserRegistrationView.as_view(),name="register"),
    path('Userapi/<int:id>',UserRegistrationView.as_view(),name="register"),


    path('login/',UserLoginViews.as_view(),name="register"),
    path('UserapiViews/',UserProfileViews.as_view(),name="User Registration List"),
    path('User/ChangePassword/',UserChangePasswordViews.as_view(),name="Change Password"),
    path('send-rest-password-email/',SendEmailResetPasswordViews.as_view(),name="Send email Reset password"),
    path('reset-password/<user_ID>/<token>/',UserPasswordResetViews.as_view(),name="reset-Password"),

]