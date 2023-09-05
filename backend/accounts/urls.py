from django.urls import path
from .views import UserRegistrationView,UserLoginViews,UserListAPIViews
urlpatterns = [
    path('Userapi/',UserRegistrationView.as_view(),name="register"),
    path('login/',UserLoginViews.as_view(),name="register"),
    path('UserapiViews/',UserListAPIViews.as_view(),name="api user"),

]
