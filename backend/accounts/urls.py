from django.urls import path
from .views import UserRegistrationView,UserLoginViews,UserApiListView
urlpatterns = [
    path('Userapi/',UserRegistrationView.as_view(),name="register"),
    path('login/',UserLoginViews.as_view(),name="register"),
    path('UserapiViews/',UserApiListView.as_view(),name="User Registration List"),

]
