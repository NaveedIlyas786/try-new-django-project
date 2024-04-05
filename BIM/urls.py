from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('BimData/',views.BIMViews.as_view(),name='BIM'),
    path('BimData/<int:id>/', views.BIMViews.as_view(), name='BIM'),
    ]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)