from django.urls import path
from . import views

urlpatterns = [
    path('Project/',views.create_project,name='Project'),
    path('Project/<int:id>/', views.create_project, name='Project'),
    path('projectDrctory/<int:prjct_id>/',views.ProjectDetailListCreateView.as_view(),name='Project Directory'),
    path('delay/notice/', views.Delay_NoticeViews.as_view(),name='Delay notice'),

    path('delay/notice/<int:id>/', views.Delay_NoticeViews.as_view(),name='Delay notice')

]