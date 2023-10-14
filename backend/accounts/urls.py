from django.urls import path
from . import views
urlpatterns = [
    path('register/', views.UserRegistrationView.as_view(), name="register"),
    path('register/<int:id>/', views.UserRegistrationView.as_view(), name="register_detail"),

    path('approve_user/<int:user_id>/', views.approve_user, name='approve_user'),

    path('disapprove_user/<int:user_id>/', views.disapprove_user, name='disapprove_user'),



    path('login/', views.UserLoginViews.as_view(), name="login"),
    path('profile/', views.UserProfileViews.as_view(), name="profile"),
    path('change_password/', views.UserChangePasswordViews.as_view(), name="change_password"),
    path('send_reset_password_email/', views.SendEmailResetPasswordViews.as_view(), name="send_reset_password_email"),
    path('reset_password/<user_ID>/<token>/', views.UserPasswordResetViews.as_view(), name="reset_password"),

]