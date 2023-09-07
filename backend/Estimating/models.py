from django.db import models
from django.utils import timezone
from pytz import timezone as pytz_timezone

from projects.models import Company

# Create your models here.

class Estimating(models.Model):
    estmate_Prjct_Name=models.CharField(verbose_name="Estimate Project Name", max_length=50)
    start_date=models.DateField(verbose_name="Start Date", auto_now_add=True)
    due_date=models.DateField(verbose_name="Due Date(YYYY-MM-DD)",blank=False)
    Areas = models.CharField(
        choices=[
        ('option 1', 'SF'), 
        ('option 2', 'STL'),
        ('option 3', 'PHL'),
        ('option 4','FL'),
        ('option 5', 'CA'),
        ('option 6', 'NV'),
        ('option 7','VA')],default='option 1',max_length=50)
    pst = pytz_timezone('US/Pacific')
    PST = models.DateTimeField(verbose_name="PST",default=timezone.now().astimezone(pst))
    status=models.CharField(
        choices=[
            ('option 1','On Hold'),
            ('option 2','Working'),
            ('option 3','Complete')],default='option 1',max_length=50)
    remarks=models.TextField(verbose_name='Notes',help_text='Enter your notes here', max_length=2000)
    reviwed=models.CharField(
        choices=[
            ('option 1','Yes'),
            ('option 2','No')],default='option 1', max_length=50)
    Company=models.ForeignKey(Company, verbose_name="Company Name", on_delete=models.CASCADE) #perposel Form
    bid_amount=models.IntegerField(verbose_name="Bid Amount")
    link=models.URLField(verbose_name="Link", max_length=200)