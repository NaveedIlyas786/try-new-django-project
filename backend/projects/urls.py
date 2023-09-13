from django.urls import path
from .views import CompanyListView

urlpatterns = [
    path('company/',CompanyListView.as_view(),name='Company Detail'),
    path('company/<int:id>/',CompanyListView.as_view(),name='Company Detail'),
]