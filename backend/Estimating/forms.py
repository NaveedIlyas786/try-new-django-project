from django import forms
from .models import Estimating_detail,Estimating

class EstimatingDetailAdminForm(forms.ModelForm):
    file_field = forms.FileField()  # Temporary file field just for admin
    Estimating = forms.ModelChoiceField(queryset=Estimating.objects.all(), to_field_name="id")
    prnt = forms.ModelChoiceField(queryset=Estimating_detail.objects.all(), to_field_name="id", required=False)

    class Meta:
        model = Estimating_detail
        fields = ['Estimating', 'prnt', 'drctry_name', 'file_type', 'file_name']
    
    def clean_file_field(self):
        file = self.cleaned_data.get('file_field')
        if not file.name.endswith('.pdf'):
            raise forms.ValidationError("Only PDF files are allowed.")
        return file
