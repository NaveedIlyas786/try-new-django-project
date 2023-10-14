from django.urls import path
from .views import ProjectListCreateView,ProjectDetailListCreateView

urlpatterns = [
    path('ProjectList/',ProjectListCreateView.as_view(),name='Project'),
    path('ProjectList/<int:id>/',ProjectListCreateView.as_view(),name='Project'),

    path('projectDrctory/',ProjectDetailListCreateView.as_view(),name='Project Directory')

]