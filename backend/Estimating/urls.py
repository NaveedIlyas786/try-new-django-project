from django.urls import path
from .views import EstimatingListView,ProposalView

urlpatterns = [
    path('estimating/',EstimatingListView.as_view(),name='estimating list'),
    path('estimating/<int:id>/', EstimatingListView.as_view(), name='estimating-detail'),
    path('estimating/<int:id>/', EstimatingListView.as_view(),name='estimating put'),
    path('ProposalList/',ProposalView.as_view(),name='Proposals List'),
    path('ProposalList/<int:id>/',ProposalView.as_view(),name='Proposals Update')


]
