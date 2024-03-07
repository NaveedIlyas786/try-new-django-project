from django.urls import path
from . import views


urlpatterns = [
    path('wagerate/', views.WageRateView.as_view(), name='wage-rate-title'),
    path('wagerate/<int:id>/', views.WageRateView.as_view(), name='wage-rate-title-detail'),
]