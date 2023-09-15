from django.contrib import admin
from .models import Project_detail,Project,Company





# Register your models here.


class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'Cmpny_Name','adress',
                    'office_phone_number','fax_number',
                    'license_number','email')







class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'prjct_Name', 'company')







class ProjectDetailAdmin(admin.ModelAdmin):
    list_display = ('id','prnt_ID','drctry_Name','file_type','output_Table_Name','prjct_ID')






# Register the models with their respective admin views
admin.site.register(Company, CompanyAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Project_detail, ProjectDetailAdmin)