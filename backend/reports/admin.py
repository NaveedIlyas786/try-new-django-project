from django.contrib import admin
from .models import WageRate,WageRateTitle

# Register your models here.

class WageRateTitleAdmin(admin.ModelAdmin):
    list_display=('id','title')

class WageRateAdmin(admin.ModelAdmin):
    
    
    list_display=('id','area_name','title','st_amount','ot_amount','dt_amount')
    
    
admin.site.register(WageRateTitle,WageRateTitleAdmin)
admin.site.register(WageRate,WageRateAdmin)