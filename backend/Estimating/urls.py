from django.urls import path
from .views import EstimatingListView,ProposalView,AddendumView,QualificationView,SpecificationViews,ProposalServiceViews,ServiceViews,SpecificationDetailViews

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
    path('specification/',SpecificationViews.as_view(),name='specification list'),
    path('specification/<int:id>/',SpecificationViews.as_view(),name='specification detail'),
    path('Proosalservice/',ProposalServiceViews.as_view(),name='service list'),
    path('Proosalservice/<int:id>/',ProposalServiceViews.as_view(),name='service detail'),
    path('service/',ServiceViews.as_view(),name='service list'),
    path('service/<int:id>/',ServiceViews.as_view(),name='service'),
    path('specificationDetail/',SpecificationDetailViews.as_view(),name='Specification Detail list'),
    path('specificationDetail/<int:id>/',SpecificationDetailViews.as_view(),name='Specification Detail'),



]
