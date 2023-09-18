from django.contrib import admin
from .models import Location,Estimating,Estimating_detail
# Register your models here.
from django.contrib import admin
from .models import Estimating,Proposal,Service,Addendum,Specification,Spec_detail,Qualification,ProposalService







class LocationAdmin(admin.ModelAdmin):
    list_display=['id','name']






class EstimatingAdmin(admin.ModelAdmin):
    list_display = ['id', 'start_date', 'Prjct_Name', 'due_date', 'status',
                    'company', 'bid_amount', 'location', 'estimator', 'bidder']
    list_filter = ['estimator']  # Use 'username' or another field that exists in the 'User' model

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        queryset = queryset.select_related('estimator')  # Optimize the number of SQL queries
        return queryset







class EstimatingDetailAdmin(admin.ModelAdmin):
    list_display=['id','prnt_id','Estimating','drctry_name','file_type','output_Table_Name','file_field']






# class ProposalsAdmin(admin.ModelAdmin):
       
#     list_display = ['id', 'estimating', 'date', 'architect_name', 'architect_firm']
#     search_fields = ['architect_name', 'architect_firm']
#     list_filter = ['date']


# class ServiceAdmin(admin.ModelAdmin):
#     list_display = ['id', 'name', 'type']
#     search_fields = ['name']
#     list_filter = ['type']





# class ProposalServiceAdmin(admin.ModelAdmin):
#     list_display = ['id', 'proposal', 'service', 'type', 'edited_type']
#     search_fields = ['service__name']
#     list_filter = ['type', 'edited_type']

class ProposalServiceInline(admin.TabularInline):
    model = ProposalService
    extra = 1
    fk_name = 'proposal'

class ServiceAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']

class ProposalAdmin(admin.ModelAdmin):
    list_display =['id', 'estimating', 'date', 'architect_name', 'architect_firm']
    inlines = [ProposalServiceInline]
    search_fields = ['architect_name', 'architect_firm']




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
admin.site.register(Proposal,ProposalAdmin)
admin.site.register(Service,ServiceAdmin)
admin.site.register(ProposalService)
admin.site.register(Addendum,AddendumAdmin)
admin.site.register(Specification,SpecificationAdmin)
admin.site.register(Spec_detail,Spec_detailAdmin)
admin.site.register(Qualification,QualificationAdmin)
admin.site.register(Estimating_detail,EstimatingDetailAdmin)