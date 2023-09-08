from django.urls import path
from .views import EstimatingListView

urlpatterns = [
    path('estimating/',EstimatingListView.as_view(),name='estimating list'),
]
