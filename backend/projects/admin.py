
from django.contrib import admin
from .models import Project_detail,Project




# class ProjectAdmin(admin.ModelAdmin):
#     list_display = ('id','status','general_contractor','job_num','job_name','orignal_contract_amount','scope',
#                     'prjct_engnr','bim_oprtr','Forman','prjct_mngr','estimating','company','estimating_start_date','end_date','start_date')

# class ProjectAdmin(admin.ModelAdmin):
#     list_display = (
#         'id', 'status', 'general_contractor', 'job_num', 'job_name', 'orignal_contract_amount', 'scope',
#         'prjct_engnr', 'bim_oprtr', 'Forman', 'prjct_mngr', 'get_company_name',
#         'get_estimating_start_date', 'get_due_date', 'start_date'
#     )
#     from Estimating.models import Estimating,Company
#     def get_company_name(self, obj):
#         return obj.company.prjct_name if obj.company else None
#     get_company_name.admin_order_field = 'company__prjct_name'  # Allow sorting by this field
#     get_company_name.short_description = 'Company Name'

#     def get_estimating_start_date(self, obj):
#         return obj.estimating.start_date if obj.estimating else None
#     get_estimating_start_date.admin_order_field = 'estimating__start_date'  # Allow sorting by this field
#     get_estimating_start_date.short_description = 'Estimating Start Date'

#     def get_due_date(self, obj):
#         return obj.estimating.due_date if obj.estimating else None
#     get_due_date.admin_order_field = 'estimating__due_date'  # Allow sorting by this field
#     get_due_date.short_description = 'Due Date'              







class ProjectDetailAdmin(admin.ModelAdmin):
    list_display = ('id','prnt_id','drctry_Name','file_type','file_name','prjct_id')






# Register the models with their respective admin views
# admin.site.register(Project, ProjectAdmin)
admin.site.register(Project_detail, ProjectDetailAdmin)