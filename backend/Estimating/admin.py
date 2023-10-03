from django.contrib import admin
from .models import Location,Estimating,Estimating_detail,Company
from django.core.files.storage import default_storage
from import_export.admin import ImportExportModelAdmin


import os
from django.contrib import admin
from .models import Estimating,Proposal,Service,Addendum,Specification,Spec_detail,Qualification,ProposalService,UrlsTable
from nested_admin import NestedStackedInline, NestedModelAdmin
from .forms import EstimatingDetailAdminForm,EstimatingAdminForm








# Register your models here
class UrlsAdmin(admin.ModelAdmin):
    list_display=('id','url','territory','web_name','ps')



class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'Cmpny_Name','adress',
                    'office_phone_number','fax_number',
                    'license_number','email','is_active')

class LocationAdmin(admin.ModelAdmin):
    list_display=['id','name','is_active']






class EstimatingAdmin(admin.ModelAdmin):
    form=EstimatingAdminForm
    list_display = ['id', 'start_date', 'prjct_name','link','time','timezone',
                    'due_date', 'status','company',
                    'bid_amount', 'location', 'estimator',
                    'bidder','bidder_deatil']
    list_filter = ['estimator']  # Use 'username' or another field that exists in the 'User' model

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        queryset = queryset.select_related('estimator')  # Optimize the number of SQL queries
        return queryset

class ViewAdmin(ImportExportModelAdmin,EstimatingAdmin):
    pass





class EstimatingDetailAdmin(admin.ModelAdmin):
    list_display=['id','prnt_id','Estimating','drctry_name','file_type','file_name']

    form = EstimatingDetailAdminForm
    def save_model(self, request, obj, form, change):
        if 'file_field' in form.cleaned_data:
            uploaded_file = form.cleaned_data['file_field']
            obj.file_binary_data = uploaded_file.read()

            uploaded_file_name, uploaded_file_extension = os.path.splitext(uploaded_file.name)
            uploaded_file_type = uploaded_file_extension.lstrip('.')
            
            obj.file_name = uploaded_file_name
            obj.file_type = uploaded_file_type

        super().save_model(request, obj, form, change)





class ProposalServiceInline(admin.TabularInline):
    model = ProposalService
    extra = 1
    fk_name = 'proposal'
    autocomplete_fields = ['service']  # Enable autocomplete for the service field
    sortable_options = {}  # Keeping this to avoid the error you mentioned earlier



class ServiceAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']





class AddendumInline(NestedStackedInline):
    model = Addendum
    extra = 1  # Number of extra empty rows to display
    
class SpecificationDetailInline(NestedStackedInline):
    model = Spec_detail
    extra = 1  # Number of extra empty rows to display



class SpecificationInline(NestedStackedInline): 
    model = Specification
    extra = 1  # Number of extra empty rows to display
    inlines = [SpecificationDetailInline]  # Nested inline for Spec_detail within Specification




class ProposalAdmin(NestedModelAdmin):
    inlines = [AddendumInline, ProposalServiceInline, SpecificationInline]
    list_display = ['id', 'estimating', 'date', 'architect_name', 'architect_firm']
    search_fields = ['architect_name', 'architect_firm']



class QualificationAdmin(admin.ModelAdmin):
    list_display=['id','detail']



admin.site.register(Company, CompanyAdmin)
admin.site.register(Location,LocationAdmin)
admin.site.register(Estimating, EstimatingAdmin)
admin.site.register(Proposal,ProposalAdmin)
admin.site.register(Service,ServiceAdmin)
admin.site.register(Qualification,QualificationAdmin)
admin.site.register(Estimating_detail,EstimatingDetailAdmin)
admin.site.register(UrlsTable,UrlsAdmin)
