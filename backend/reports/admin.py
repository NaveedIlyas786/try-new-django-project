from django.contrib import admin
from .models import WageRateDetail
from nested_admin import NestedStackedInline, NestedModelAdmin # type: ignore

# Register your models here.

    
class WageRateAdmin(admin.ModelAdmin):
    inlines=[WageRateDetailInline]
    list_display=('id','project')


    
admin.site.register(WageRateDetail,WageRateAdmin)
# admin.site.register(WageRateDetail)