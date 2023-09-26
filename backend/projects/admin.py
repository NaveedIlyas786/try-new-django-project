from django.contrib import admin
from .models import Project_detail,Project




class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id','estimating','job_num','prjct_engnr','bim_oprtr','Forman','prjct_mngr','start_date')
                    







class ProjectDetailAdmin(admin.ModelAdmin):
    list_display = ('id','prnt_id','drctry_Name','file_type','file_name','prjct_id')






# Register the models with their respective admin views
admin.site.register(Project, ProjectAdmin)
admin.site.register(Project_detail, ProjectDetailAdmin)