from django.db import models
from django.utils import timezone
# from pytz import timezone as pytz_timezone

from projects.models import Company
from accounts.models import User

# Create your models here.

class Location(models.Model):
    name=models.CharField(verbose_name="Location",max_length=50,blank=False,null=True)

    def __str__(self):
        return self.name

class Estimating(models.Model):
    Prjct_Name=models.CharField(verbose_name="Estimate Project Name", max_length=50)
    due_date=models.DateTimeField(verbose_name="Due Date(YYYY-MM-DD)",blank=False,null=True)

    # Areas = 
    status=models.CharField(
        choices=[
            (' ',' '),
            ('On Hold','On Hold'),
            ('Working','Working'),
            ('Complete','Complete')],default=' ',max_length=50)
    start_date = models.DateTimeField(verbose_name="start Date(YYYY-MM-DD)",blank=False,null=True)

    Company=models.ForeignKey(Company, verbose_name="Company Name", on_delete=models.CASCADE) #perposel Form
    bid_amount=models.IntegerField(verbose_name="Bid Amount")
    location=models.ForeignKey(Location,on_delete=models.CASCADE,blank=False,null=True)
    estimator = models.ForeignKey(User,verbose_name="Estimator", related_name='estimations_as_estimator', limit_choices_to=models.Q(roles__name='Estimator'), on_delete=models.SET_NULL, null=True)
    bidder = models.ForeignKey(User, related_name='estimations_as_bidder',verbose_name="Bidder", limit_choices_to=models.Q(roles__name='Bidder'), on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return self.Prjct_Name