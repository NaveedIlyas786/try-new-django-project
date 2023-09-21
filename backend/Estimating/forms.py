from django import forms
from .models import Estimating_detail,Estimating

class EstimatingDetailAdminForm(forms.ModelForm):
    file_field = forms.FileField()  # Temporary file field just for admin
    Estimating = forms.ModelChoiceField(queryset=Estimating.objects.all(), to_field_name="id")
    prnt = forms.ModelChoiceField(queryset=Estimating_detail.objects.all(), to_field_name="id", required=False)

    class Meta:
        model = Estimating_detail
        fields = ['Estimating', 'prnt', 'drctry_name', 'file_type', 'output_Table_Name']