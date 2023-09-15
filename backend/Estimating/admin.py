from django.contrib import admin
from .models import Location,Estimating
# Register your models here.
from django.contrib import admin
from .models import Estimating,Proposals,Service,Addendum,Specification,Spec_detail,Qualification,PropsalsServices







class LocationAdmin(admin.ModelAdmin):
    list_display=['id','name']






class EstimatingAdmin(admin.ModelAdmin):
    list_display = ['id','start_date','Prjct_Name','due_date','status',
                    'company','bid_amount','location', 
                    'estimator', 'bidder']
    list_filter = ['estimator']

   
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        queryset = queryset.select_related('estimator')  # Optimize the number of SQL queries
        return queryset
    






class EstimatingDetail(admin.ModelAdmin):
    list_display=['id','prnt_id','drctry_name','file_type','output_Table_Name']






class ProposalsAdmin(admin.ModelAdmin):
       
    list_display=['id','estimating','date',
                  'architect_name','architect_firm']
    


class ServiceAdmin(admin.ModelAdmin):
    list_display=['id','services']







class PropsalsServicesAdmin(admin.ModelAdmin):
    list_display=['id','propsals','service','serviceTyp']






class AddendumAdmin(admin.ModelAdmin):
    list_display=['id','proposal','date','addendum_Number']








class SpecificationAdmin(admin.ModelAdmin):
    list_display=['id','proposal','specific_name','budget']









class Spec_detailAdmin(admin.ModelAdmin):
    list_display=['id','sefic','number','name']









class QualificationAdmin(admin.ModelAdmin):
    list_display=['id','detail']










admin.site.register(Location,LocationAdmin)
admin.site.register(Estimating, EstimatingAdmin)
admin.site.register(Proposals,ProposalsAdmin)
admin.site.register(Service,ServiceAdmin)
admin.site.register(PropsalsServices,PropsalsServicesAdmin)
admin.site.register(Addendum,AddendumAdmin)
admin.site.register(Specification,SpecificationAdmin)
admin.site.register(Spec_detail,Spec_detailAdmin)
admin.site.register(Qualification,QualificationAdmin)
