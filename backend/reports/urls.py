from django.urls import path
from . import views


urlpatterns = [
    path('wageratetitles/', views.WageRateTitleView.as_view(), name='wage-rate-title'),
    path('wagerates/', views.WageRateView.as_view(), name='wage-rate'),
    path('wageratetitles/<int:pk>/', views.WageRateTitleView.as_view(), name='wage-rate-title-detail'),
    path('wagerates/<int:pk>/', views.WageRateView.as_view(), name='wage-rate-detail'),
]