from django.db import models
from .validation import validate_file_extension

from django.core.exceptions import ValidationError
import os
from django.utils import timezone
# from pytz import timezone as pytz_timezone

from accounts.models import User

# Create your models here.


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
    bidder = models.CharField(verbose_name="Bidder Name",max_length=1500, null=True)
    bidder_deatil=models.CharField(verbose_name="Bidder Detail",max_length=50,null=True)
    

 


    def save(self, *args, **kwargs):
        # Check if this is a new instance (i.e., being created and not updated)
        is_new = not self.pk
    
        # First, save the Estimating instance (either create or update)
        super(Estimating, self).save(*args, **kwargs)
    
        if is_new:
            # Top Level Entries
            top_level_names = ['Addendums', 'Bid', 'Plans', 'Pre Bid RFIs', 'Quotes', 'Specs']
            top_objects = {}
            for name in top_level_names:
                detail = Estimating_detail.objects.create(Estimating=self, drctry_name=name)
                top_objects[name] = detail

            # Second Level Entries
            second_level_data = [
                {'name': 'Add. 3', 'parent': 'Addendums'},
                {'name': 'Bid', 'parent': 'Bid'},
                {'name': 'Bidders', 'parent': 'Bid'},
                {'name': 'Scope', 'parent': 'Bid'},
                {'name': 'Plans', 'parent': 'Plans'},
                {'name': 'Takeoff', 'parent': 'Plans'},
                {'name': '00 Quote Request Plans-Specs', 'parent': 'Quotes'},
                {'name': '00A - MC Request Form', 'parent': 'Quotes'},
                {'name': '00B - Price Comparison', 'parent': 'Quotes'},
                {'name': 'Material Quotes', 'parent': 'Quotes'},
                {'name': 'Plaster', 'parent': 'Quotes'},
                {'name': 'Scaffold', 'parent': 'Quotes'},
                {'name': 'Biding Specs', 'parent': 'Specs'},
                {'name': 'Specs', 'parent': 'Specs'}
            ]
            second_level_objects = {}
            for item in second_level_data:
                parent_obj = top_objects[item['parent']]
                detail = Estimating_detail.objects.create(Estimating=self, drctry_name=item['name'], prnt_id=parent_obj.id)
                second_level_objects[item['name']] = detail
        
            # Third Level Entries
            third_level_data = [
                {'name': 'Emails Pertaining to Job', 'parent': 'Bid'},
                {'name': 'FINAL Proposal', 'parent': 'Bid'},
                {'name': 'Reference Docs', 'parent': 'Bid'},
                {'name': 'Harris', 'parent': 'Bidders'},
                {'name': 'OLD', 'parent': '00B - Price Comparison'},
                {'name': 'AGS - LOCKED 04-08-2022', 'parent': 'Material Quotes'},
                {'name': 'CWalla', 'parent': 'Material Quotes'},
                {'name': 'FBM', 'parent': 'Material Quotes'},
                {'name': 'Steeler', 'parent': 'Material Quotes'}
            ]
            third_level_objects = {}
            for item in third_level_data:
                parent_obj = second_level_objects[item['parent']]
                detail = Estimating_detail.objects.create(Estimating=self, drctry_name=item['name'], prnt_id=parent_obj.id)
                third_level_objects[item['name']] = detail

            # Fourth Level Entries
            fourth_level_data = [
                {'name': 'Bid Results', 'parent': 'FINAL Proposal'},              
                {'name': 'OLD', 'parent': 'AGS - LOCKED 04-08-2022'},
                {'name': 'OLD', 'parent': 'CWalla'},
                {'name': 'OLD', 'parent': 'FBM'},
                {'name': 'OLD', 'parent': 'Steeler'}
            ]
            for item in fourth_level_data:
                parent_obj = third_level_objects[item['parent']]
                Estimating_detail.objects.create(Estimating=self, drctry_name=item['name'], prnt_id=parent_obj.id)


        def __str__(self):
            return self.Prjct_Name







class Estimating_detail(models.Model):
    Estimating=models.ForeignKey(Estimating,related_name='estimating_details', verbose_name="Add Estimating", on_delete=models.CASCADE)
    prnt = models.ForeignKey('self', verbose_name="Folder Parent ID", on_delete=models.CASCADE, null=True, blank=True, related_name="children")
    drctry_name = models.CharField(verbose_name="Folder Name",max_length=255, null=True, blank=True)
    file_type = models.CharField(verbose_name="Type Name",max_length=100, null=True, blank=True) 
    file_name = models.CharField(verbose_name="file Name",max_length=100, null=True, blank=True) 
    file_binary_data = models.BinaryField(null=True, blank=True)


    def __str__(self):
        return self.drctry_name or "No directory name"






##Create perposel

#Service of Exclusion and Inclusion
class Service(models.Model):
    name = models.CharField(max_length=255)


    def __str__(self):
        return self.name

 








#Proposal Table
class Proposal(models.Model):

    


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

    def __str__(self):
        return f"Proposal {self.id} by {self.architect_name}"










class ProposalService(models.Model):
    proposal = models.ForeignKey(Proposal, on_delete=models.CASCADE,related_name='services')
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    service_type = models.CharField(max_length=2, choices=[('IN', 'Inclusion'), ('EX', 'Exclusion')], default='EX') # NEW_INCLUSION, NEW_EXCLUSION etc

    def __str__(self):
        return f"Service {self.service.name} in Proposal {self.proposal.id}"
    









class Addendum(models.Model):
    proposal=models.ForeignKey(Proposal, on_delete=models.CASCADE,related_name='Addendums')
    date = models.DateField(verbose_name="Addendum Date(YYYY-MM-DD)",blank=False,null=True)
    addendum_Number=models.IntegerField(verbose_name="Addendum Number")

    def __str__(self):
        return str(self.addendum_Number)









class Specification(models.Model):
    proposal=models.ForeignKey(Proposal, on_delete=models.CASCADE,related_name='spcifc')
    specific_name=models.CharField(verbose_name="Specification Name", max_length=250)
    budget=models.IntegerField(verbose_name="Budget")

    def __str__(self) -> str:
        return self.specific_name





class Spec_detail(models.Model):
    sefic=models.ForeignKey(Specification, verbose_name="Specification", on_delete=models.CASCADE,related_name='sefic')
    number=models.CharField(verbose_name="Add Number",max_length=8)
    name=models.CharField(verbose_name="Name", max_length=250)
    def __str__(self) :
        return self.name
    







    
class Qualification(models.Model):
    detail=models.CharField(verbose_name="Add Qualification", max_length=255)

    def __str__(self):
        return self.detail

