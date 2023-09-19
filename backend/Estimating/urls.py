from django.urls import path
from .views import EstimatingListView,QualificationView,LocationViews,Estimating_detailView,create_proposal,ServiceViews

urlpatterns = [
    path('estimating/',EstimatingListView.as_view(),name='estimating list'),
    path('estimating/<int:id>/', EstimatingListView.as_view(), name='estimating-detail'),



    path('proposals/', create_proposal, name='proposal-list'),
    path('proposals/<int:proposal_id>/', create_proposal, name='update-delete-proposal'),



    path('Qualification/',QualificationView.as_view(),name='Qualification list'),
    path('Qualification/<int:id>/',QualificationView.as_view(),name='Qualification detail'),


    path('service/',ServiceViews.as_view(),name='service list'),
    path('service/<int:id>/',ServiceViews.as_view(),name='service'),



    path('location/',LocationViews.as_view(),name='location list'),
    path('location/<int:id>/',LocationViews.as_view(),name='Location Detail'),


    path('Estimating_detail/',Estimating_detailView.as_view(),name='Estimating_detail list'),



]
