from django.db import models
from django.utils import timezone
# from pytz import timezone as pytz_timezone

from projects.models import Company
from accounts.models import User

# Create your models here.



# create Estimating 

class Location(models.Model):
    name=models.CharField(verbose_name="Location",max_length=50,blank=False,null=True)

    def __str__(self):
        return self.name

class Estimating(models.Model):
    Prjct_Name=models.CharField(verbose_name="Estimate Project Name", max_length=50)
    due_date=models.DateField(verbose_name="Due Date(YYYY-MM-DD)")
    # Areas = 
    status=models.CharField(
        choices=[
            (' ',' '),
            ('On Hold','On Hold'),
            ('Working','Working'),
            ('Complete','Complete')],default='Null',max_length=50)
    start_date = models.DateField(verbose_name="start Date(YYYY-MM-DD)",null=True,blank=True)

    company = models.ForeignKey(Company, verbose_name="Company", on_delete=models.CASCADE,blank=False)
    bid_amount=models.IntegerField(verbose_name="Bid Amount",blank=False)
    location=models.ForeignKey(Location,on_delete=models.CASCADE,blank=False,null=True)
    estimator = models.ForeignKey(User,verbose_name="Estimator", related_name='estimations_as_estimator', limit_choices_to=models.Q(roles__name='Estimator'), on_delete=models.SET_NULL, null=True)
    bidder = models.ForeignKey(User, related_name='estimations_as_bidder',verbose_name="Bidder", limit_choices_to=models.Q(roles__name='Bidder'), on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return self.Prjct_Name
    

##Create perposel

#Service of Exclusion and Inclusion

class Service(models.Model):
    services=models.CharField(verbose_name="add Serves(INCLUSIONS or EXCLUSIONS)", max_length=250)

    def __str__(self):
        return self.services



#Proposal Table
class Proposals(models.Model):

    company=models.ForeignKey(
        Company,
        verbose_name="Company",
        on_delete=models.CASCADE,
        blank=False,)

    estimator = models.ForeignKey(
        User,
        verbose_name="Estimator",
        related_name='estimations_in_Propsals',
        limit_choices_to=models.Q(roles__name='Estimator'),
        on_delete=models.SET_NULL, null=True)

    
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
        return f"{self.estimating}, {self.company}"


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

