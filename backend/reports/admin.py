from django.contrib import admin
from .models import WageRateDetail
from nested_admin import NestedStackedInline, NestedModelAdmin # type: ignore

# Register your models here.

    
class WageRateAdmin(admin.ModelAdmin):
    list_display=('id','project','titleName','st_amount','ot_amount','dt_amount')


    
admin.site.register(WageRateDetail,WageRateAdmin)
# admin.site.register(WageRateDetail)