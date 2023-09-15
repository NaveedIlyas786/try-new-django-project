from django.db import models
from .validation import validate_file_extension

import os

class Company(models.Model):
    Cmpny_Name = models.CharField(verbose_name="Company Name",max_length=50, null=False, blank=False)
    adress=models.CharField(verbose_name="Adress",max_length=70, null=False, blank=False)
    office_phone_number = models.CharField(max_length=10, null=False, blank=False)
    fax_number = models.CharField(max_length=10, null=False, blank=False)
    license_number = models.CharField(max_length=50, null=False, blank=False)
    logo = models.ImageField(upload_to='logos/', validators=[validate_file_extension], null=False, blank=False)
    email = models.EmailField(default="estimating@dmsmgt.com", editable=False)


    def __str__(self):
        return self.Cmpny_Name


class Project(models.Model):
    company=models.ForeignKey(Company, on_delete=models.CASCADE)
    prjct_Name = models.CharField(verbose_name="Project Name",max_length=255)
    def save(self, *args, **kwargs):
        # Check if the object is new (doesn't have an ID yet)
        is_new = self.pk is None
        super().save(*args, **kwargs)

        if is_new:
            # Create the initial Estimating_detail instances
            initial_detail_data = [
                {'drctry_Name': 'Accounting'},
                {'drctry_Name': 'Contract'},
                {'drctry_Name': 'Estimating'},
                {'drctry_Name': 'Insurance'},
                {'drctry_Name': 'PM'},
                {'drctry_Name': 'Safety'},
                {'drctry_Name': 'Subcontractors'},
            ]

            for data in initial_detail_data:
                Project_detail.objects.create(
                    Project=self, 
                    drctry_Name=data['drctry_Name'],
                    prnt_ID=None,  
                    file_Name=None, 
                    output_Table_Name=None,  
                )
    
    def __str__(self):
        return self.prjct_Name

class Project_detail(models.Model):
    drctry_Name = models.CharField(verbose_name="Folder Name",max_length=255)
    prjct_ID = models.ForeignKey(Project,verbose_name="Project", on_delete=models.CASCADE)
    prnt_ID = models.PositiveIntegerField(verbose_name="Folder Parent ID",null=False, blank=False)  # Set null-Flase here
    file_type = models.CharField(verbose_name="Type Name",max_length=100, null=False, blank=False)  # Set null=Flase here
    output_Table_Name = models.CharField(verbose_name="file Name",max_length=100, null=False, blank=False)  # Set null=False here

    file_field = models.FileField(upload_to='Files/', null=True)
    file_binary_data = models.BinaryField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.file_field:
            with open(self.file_field.path, 'rb') as f:
                self.file_binary_data = f.read()
            
            uploaded_file_name, uploaded_file_extension = os.path.splitext(self.file_field.name)
            uploaded_file_type = uploaded_file_extension.lstrip('.')
            
            self.output_Table_Name = uploaded_file_name
            self.file_type = uploaded_file_type
        
        super().save(*args, **kwargs)

    def __str__(self):
        return self.drctry_Name
