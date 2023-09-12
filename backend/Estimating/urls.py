from django.urls import path
from .views import EstimatingListView,ProposalView,AddendumView,QualificationView

urlpatterns = [
    path('estimating/',EstimatingListView.as_view(),name='estimating list'),
    path('estimating/<int:id>/', EstimatingListView.as_view(), name='estimating-detail'),
    path('estimating/<int:id>/', EstimatingListView.as_view(),name='estimating put'),
    path('ProposalList/',ProposalView.as_view(),name='Proposals List'),
    path('ProposalList/<int:id>/',ProposalView.as_view(),name='Proposals Update'),
    path('Addendum/',AddendumView.as_view(),name='addendum list'),
    path('Addendum/<int:id>/',AddendumView.as_view(),name='addendum list'),
    path('Qualification/',QualificationView.as_view(),name='Qualification list'),
    path('Qualification/<int:id>/',QualificationView.as_view(),name='Qualification detail'),


]
