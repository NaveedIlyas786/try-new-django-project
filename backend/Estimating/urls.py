from django.urls import path
from .views import EstimatingListView,ProposalView

urlpatterns = [
    path('estimating/',EstimatingListView.as_view(),name='estimating list'),
    path('estimating/<int:id>/', EstimatingListView.as_view(), name='estimating-update'),
    path('estimating/<int:pk>/', EstimatingListView.as_view()),
    path('ProposalList/',ProposalView.as_view(),name='Proposals List'),
    path('ProposalList/<int:pk>/',ProposalView.as_view(),name='Proposals Update')


]
