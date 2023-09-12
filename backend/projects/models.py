from django.db import models
from .validation import validate_file_extension



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

    def __str__(self):
        return self.prjct_Name

class Project_detail(models.Model):
    drctry_Name = models.CharField(verbose_name="Folder Name",max_length=255)
    prjct_ID = models.ForeignKey(Project,verbose_name="Project", on_delete=models.CASCADE)
    prnt_ID = models.PositiveIntegerField(verbose_name="Folder Parent ID",null=False, blank=False)  # Set null-Flase here
    file_Name = models.CharField(verbose_name="File Name",max_length=100, null=False, blank=False)  # Set null=Flase here
    output_Table_Name = models.CharField(verbose_name="Table Name",max_length=100, null=False, blank=False)  # Set null=False here



    def __str__(self):
        return self.drctry_Name
