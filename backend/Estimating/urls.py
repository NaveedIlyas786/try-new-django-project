from django.urls import path
from .views import EstimatingListView,AddendumView,QualificationView,SpecificationViews,SpecificationDetailViews,LocationViews,Estimating_detailView,create_proposal,ProposalServiceView,ProposalView,ServiceViews

urlpatterns = [
    path('estimating/',EstimatingListView.as_view(),name='estimating list'),
    path('estimating/<int:id>/', EstimatingListView.as_view(), name='estimating-detail'),

    path('ProposalList/',ProposalView.as_view(),name='Proposals List'),
    # path('ProposalList/<int:id>/',ProposalViews.as_view(),name='Proposals Update'),

    path('Addendum/',AddendumView.as_view(),name='addendum list'),
    path('Addendum/<int:id>/',AddendumView.as_view(),name='addendum list'),

    path('Qualification/',QualificationView.as_view(),name='Qualification list'),
    path('Qualification/<int:id>/',QualificationView.as_view(),name='Qualification detail'),

    path('specification/',SpecificationViews.as_view(),name='specification list'),
    path('specification/<int:id>/',SpecificationViews.as_view(),name='specification detail'),

    path('service/',ServiceViews.as_view(),name='service list'),
    path('service/<int:id>/',ServiceViews.as_view(),name='service'),
    path('Proposalservices/', ProposalServiceView.as_view(), name='service-list'),
    path('proposals/', create_proposal, name='proposal-list'),

    path('specificationDetail/',SpecificationDetailViews.as_view(),name='Specification Detail list'),
    path('specificationDetail/<int:id>/',SpecificationDetailViews.as_view(),name='Specification Detail'),

    path('location/',LocationViews.as_view(),name='location list'),
    path('location/<int:id>/',LocationViews.as_view(),name='Location Detail'),

    path('Estimating_detail/',Estimating_detailView.as_view(),name='Estimating_detail list'),



]
