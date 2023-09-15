from django.db import models
from django.core.exceptions import ValidationError
import os
from django.utils import timezone
# from pytz import timezone as pytz_timezone

from projects.models import Company
from accounts.models import User

# Create your models here.



# create Estimating 

class Location(models.Model):
    name=models.CharField(verbose_name="Location Name",max_length=50,blank=False,null=False)

    def __str__(self):
        return self.name

class Estimating(models.Model):
    Prjct_Name=models.CharField(verbose_name="Estimate Project Name", max_length=50)
    due_date=models.DateField(verbose_name="Due Date(YYYY-MM-DD)")
    # Areas = 
    status=models.CharField(
        choices=[
            ('On Hold','On Hold'),
            ('Working','Working'),
            ('Complete','Complete')],default='Working',max_length=50)
    start_date = models.DateField(verbose_name="start Date(YYYY-MM-DD)",null=True,blank=True)

    company = models.ForeignKey(Company, verbose_name="Company", on_delete=models.CASCADE,blank=False)
    bid_amount=models.IntegerField(verbose_name="Bid Amount",blank=False)
    location=models.ForeignKey(Location,on_delete=models.CASCADE,blank=False,null=True)
    estimator = models.ForeignKey(User,verbose_name="Estimator", related_name='estimations_as_estimator', limit_choices_to=models.Q(roles__name='Estimator'), on_delete=models.SET_NULL, null=True)
    bidder = models.CharField(verbose_name="bidder ",max_length=1500, null=True)
    


    def save(self, *args, **kwargs):
        # Check if the object is new (doesn't have an ID yet)
        is_new = self.pk is None
        super().save(*args, **kwargs)

        if is_new:
            # Create the initial Estimating_detail instances
            initial_detail_data = [
                {'drctry_name': 'Addendums'},
                {'drctry_name': 'Bid'},
                {'drctry_name': 'Plans'},
                {'drctry_name': 'Pre Bid RFIs'},
                {'drctry_name': 'Quotes'},
                {'drctry_name': 'Specs'},
                {'drctry_name': 'Wages Rates For Distribution'},
            ]

            for data in initial_detail_data:
                Estimating_detail.objects.create(
                    Estimating=self, 
                    drctry_name=data['drctry_name'],
                    prnt_id=None,  
                    file_type=None, 
                    output_Table_Name=None,  
                )
    
    def __str__(self):
        return self.Prjct_Name


class Estimating_detail(models.Model):
    Estimating=models.ForeignKey(Estimating, verbose_name="Add Estimating", on_delete=models.CASCADE)
    prnt_id = models.PositiveIntegerField(verbose_name="Folder Parent ID",null=True, blank=True) 
    drctry_name = models.CharField(verbose_name="Folder Name",max_length=255)
    file_type = models.CharField(verbose_name="Type Name",max_length=100, null=True, blank=True) 
    output_Table_Name = models.CharField(verbose_name="file Name",max_length=100, null=True, blank=True) 
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
##Create perposel

#Service of Exclusion and Inclusion

class Service(models.Model):
    services=models.CharField(verbose_name="add Serves(INCLUSIONS or EXCLUSIONS)", max_length=250)

    def __str__(self):
        return self.services



#Proposal Table
class Proposals(models.Model):

    
    estimating=models.ForeignKey(
        Estimating,
        on_delete=models.CASCADE)
    
    date = models.DateField(
        verbose_name="Proposel Date(YYYY-MM-DD)",
        blank=False,
        null=True)
    
    architect_name=models.CharField(
        verbose_name="Architect Name",
        max_length=50)
    
    architect_firm=models.CharField(
        verbose_name="Architect Firm",
        max_length=50)


    def __str__(self) -> str:
        return f"{self.estimating}"


class PropsalsServices(models.Model):
    propsals=models.ForeignKey(Proposals, verbose_name="Proposals", on_delete=models.CASCADE,null=False)
    service=models.ForeignKey(Service,verbose_name="Add service", on_delete=models.CASCADE)
    serviceTyp=models.CharField( verbose_name="Service Type",
                choices=[
            ('Exclusions','Exclusions'),
            ('Inclusions','Inclusions')],default='Exclusions',max_length=50)




class Addendum(models.Model):
    proposal=models.ForeignKey(Proposals, on_delete=models.CASCADE)
    date = models.DateField(verbose_name="Addendum Date(YYYY-MM-DD)",blank=False,null=True)
    addendum_Number=models.IntegerField(verbose_name="Addendum Number")

    def __str__(self):
        return str(self.addendum_Number)

class Specification(models.Model):
    proposal=models.ForeignKey(Proposals, on_delete=models.CASCADE)
    specific_name=models.CharField(verbose_name="Specification Name", max_length=250)
    budget=models.IntegerField(verbose_name="Budget")

    def __str__(self) -> str:
        return self.specific_name

class Spec_detail(models.Model):
    sefic=models.ForeignKey(Specification, verbose_name="Specification", on_delete=models.CASCADE)
    number=models.IntegerField(verbose_name="Add Number")
    name=models.CharField(verbose_name="Name", max_length=250)
    def __str__(self) :
        return self.name
class Qualification(models.Model):
    detail=models.CharField(verbose_name="Add Qualification", max_length=255)

    def __str__(self):
        return self.detail

