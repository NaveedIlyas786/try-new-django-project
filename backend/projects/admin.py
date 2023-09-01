from django.contrib import admin
from .models import Project_detail,Project,Company
# Register your models here.

admin.site.register(Project) 
admin.site.register(Project_detail)
admin.site.register(Company)