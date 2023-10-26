from django.contrib import admin
from .models import Project_detail,Project
from .models import (
    Project, Contract, Schedule_of_Value, Insurance, Bond, Zlien, Submittals, 
    ShopDrawing, Safity, Schedule, Sub_Contractors, LaborRate, Billing, Sov, 
    HDS_system, OnBuild, Buget,Project_detail
)
from Estimating.models import Spec_detail

class ContractInline(admin.StackedInline):
    model = Contract
    extra = 1  

class ScheduleOfValueInline(admin.StackedInline):
    model = Schedule_of_Value
    extra = 1

class InsuranceInline(admin.StackedInline):
    model = Insurance
    extra = 1

class BondInline(admin.StackedInline):
    model = Bond
    extra = 1

class ZlienInline(admin.StackedInline):
    model = Zlien
    extra = 1

class SubmittalsInline(admin.StackedInline):
    model = Submittals
    extra = 1
    # def formfield_for_foreignkey(self, db_field, request, **kwargs):
    #     if db_field.name == 'scop_work_number':
    #         proposal_id = request.GET.get('proposal')
    #         if proposal_id:
    #             kwargs['queryset'] = Spec_detail.objects.filter(sefic__proposal_id=proposal_id)
    #         else:
    #             kwargs['queryset'] = Spec_detail.objects.none()
    #     return super().formfield_for_foreignkey(db_field, request, **kwargs)

class ShopDrawingInline(admin.StackedInline):
    model = ShopDrawing
    extra = 1

class SafityInline(admin.StackedInline):
    model = Safity
    extra = 1

class ScheduleInline(admin.StackedInline):
    model = Schedule
    extra = 1

class SubContractorsInline(admin.StackedInline):
    model = Sub_Contractors
    extra = 1

class LaborRateInline(admin.StackedInline):
    model = LaborRate
    extra = 1

class BillingInline(admin.StackedInline):
    model = Billing
    extra = 1

class SovInline(admin.StackedInline):
    model = Sov
    extra = 1

class HDSSystemInline(admin.StackedInline):
    model = HDS_system
    extra = 1

class OnBuildInline(admin.StackedInline):
    model = OnBuild
    extra = 1

class BugetInline(admin.StackedInline):
    model = Buget
    extra = 1

class ProjectAdmin(admin.ModelAdmin):
    inlines = [
        ContractInline, ScheduleOfValueInline, InsuranceInline, BondInline,
        ZlienInline, SubmittalsInline, ShopDrawingInline, SafityInline,
        ScheduleInline, SubContractorsInline, LaborRateInline, BillingInline,
        SovInline, HDSSystemInline, OnBuildInline, BugetInline
    ]

    
    list_display = ('id','status', 'job_num', 'start_date', 'proposal','prjct_engnr','bim_oprtr','Forman','prjct_mngr','start_date','general_superintendent',
                    'project_address','addendums','bid','Spec','contacts','drywell','finish','wall_type','progress','ro_door','ro_window','substitution')  
    search_fields = ['status', 'job_num'] 






class ProjectDetailAdmin(admin.ModelAdmin):
    list_display = ('id','prnt_id','drctry_Name','file_type','file_name','prjct_id')






# Register the models with their respective admin views
admin.site.register(Project_detail, ProjectDetailAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Contract)
admin.site.register(Schedule_of_Value)
admin.site.register(Insurance)
admin.site.register(Bond)
admin.site.register(Zlien)
admin.site.register(Submittals)
admin.site.register(ShopDrawing)
admin.site.register(Safity)
admin.site.register(Schedule)
admin.site.register(Sub_Contractors)
admin.site.register(LaborRate)
admin.site.register(Billing)
admin.site.register(Sov)
admin.site.register(HDS_system)
admin.site.register(OnBuild)
admin.site.register(Buget)