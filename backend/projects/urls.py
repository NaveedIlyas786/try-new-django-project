from django.urls import path
from . import views

urlpatterns = [
    path('Project/',views.create_project,name='Project'), # type: ignore
    path('Project/<int:id>/', views.create_project, name='Project'),
    path('projectDrctory/<int:prjct_id>/',views.ProjectDetailListCreateView.as_view(),name='Project Directory'),
    path('delay/notice/', views.Delay_NoticeViews.as_view(),name='Delay notice'),

    path('delay/notice/<int:id>/', views.Delay_NoticeViews.as_view(),name='Delay notice'),
    
    path('rfi/',views.RFIViews.as_view(),name='RFI'),
    path('rfi/<int:id>/',views.RFIViews.as_view(),name='RFI'),
    
    path('pco/',views.PCOViews.as_view(),name='PCO'),
    path('pco/<int:id>/',views.PCOViews.as_view(),name='PCO'),

]