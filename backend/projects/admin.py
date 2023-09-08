from django.contrib import admin
from .models import Project_detail,Project,Company
# Register your models here.

class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'Cmpny_Name')


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'prjct_Name', 'company')


class ProjectDetailAdmin(admin.ModelAdmin):
    list_display = ('id', 'drctry_Name', 'prjct_ID', 'prnt_ID', 'file_Name', 'output_Table_Name')


# Register the models with their respective admin views
admin.site.register(Company, CompanyAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Project_detail, ProjectDetailAdmin)