from django.urls import path
from .views import ProjectListCreateView

urlpatterns = [
    path('ProjectList/',ProjectListCreateView.as_view(),name='Project'),
]