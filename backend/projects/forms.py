from django import forms
from django.contrib import admin
from .models import (
    Project, Contract, Schedule_of_Value, Insurance, Bond, Zlien, Submittals,
    ShopDrawing, Safity, Schedule, Sub_Contractors, LaborRate, Billing, Sov,
    HDS_system, OnBuild, Buget, Project_detail
)
from Estimating.models import Spec_detail
from django import forms
from django.utils.translation import ugettext_lazy as _

class SubmittalsInlineForm(forms.ModelForm):
    class Meta:
        model = Submittals
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.proposal:
            self.fields['scop_work_number'].queryset = Spec_detail.objects.filter(
                sefic__proposal=self.instance.proposal
            )
        else:
            self.fields['scop_work_number'].queryset = Spec_detail.objects.none()

class SubmittalsInline(admin.StackedInline):
    model = Submittals
    form = SubmittalsInlineForm
    extra = 1