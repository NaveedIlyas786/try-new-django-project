from django.urls import path
from . import views

urlpatterns = [
    path('Project/',views.create_project,name='Project'),
    path('Project/<int:id>/', views.create_project, name='Project'),
    path('projectDrctory/',views.ProjectDetailListCreateView.as_view(),name='Project Directory')

]