from django.urls import path
from .views import EstimatingListView

urlpatterns = [
    path('estimating/',EstimatingListView.as_view(),name='estimating list'),
    path('estimating/<int:id>/', EstimatingListView.as_view(), name='estimating-detail'),
    path('estimating/<int:pk>/', EstimatingListView.as_view()),

]
