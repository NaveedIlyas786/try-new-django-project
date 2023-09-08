from django.contrib import admin
from .models import Location,Estimating
# Register your models here.
from django.contrib import admin
from .models import Estimating

class EstimatingAdmin(admin.ModelAdmin):
    list_display = ['id','start_date','Prjct_Name','due_date','status',
                    'Company','bid_amount','location', 
                    'estimator', 'bidder']
    list_filter = ['estimator', 'bidder']
    
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        queryset = queryset.select_related('estimator', 'bidder')  # Optimize the number of SQL queries
        return queryset


admin.site.register(Location)
admin.site.register(Estimating, EstimatingAdmin)
