from django.db import models
from .validation import validate_logo_file_extension



class Company(models.Model):
    Cmpny_Name = models.CharField(verbose_name="Company Name",max_length=50, null=True, blank=True)
    adress=models.CharField(verbose_name="Adress",max_length=70, null=True, blank=True)
    office_phone_number = models.CharField(max_length=10, null=True, blank=True)
    fax_number = models.CharField(max_length=10, null=True, blank=True)
    license_number = models.CharField(max_length=50, null=True, blank=True)
    logo = models.ImageField(upload_to='logos/', validators=[validate_logo_file_extension], null=True, blank=True)
    email = models.EmailField(default="estimating@dmsmgt.com", editable=False)


    def __str__(self):
        return self.Cmpny_Name


class Project(models.Model):
    company=models.ForeignKey(Company, on_delete=models.CASCADE)
    prjct_Name = models.CharField(verbose_name="Project Name",max_length=255)

    def __str__(self):
        return self.prjct_Name

class Project_detail(models.Model):
    drctry_Name = models.CharField(verbose_name="Folder Name",max_length=255)
    prjct_ID = models.ForeignKey(Project,verbose_name="Project", on_delete=models.CASCADE)
    prnt_ID = models.PositiveIntegerField(verbose_name="Folder Parent ID",null=True, blank=True)  # Set null=True here
    file_Name = models.CharField(verbose_name="File Name",max_length=100, null=True, blank=True)  # Set null=True here
    output_Table_Name = models.CharField(verbose_name="Table Name",max_length=100, null=True, blank=True)  # Set null=True here



    def __str__(self):
        return self.drctry_Name
