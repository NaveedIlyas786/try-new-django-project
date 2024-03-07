from typing import Any
from django.db import models
from projects.models import Project
# Create your models here.


class WageRate(models.Model):
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)


class WageRateDetail(models.Model):
    title=models.ForeignKey(WageRate, verbose_name="Add Title", on_delete=models.CASCADE)
    title_name=models.CharField(verbose_name="Tile name", max_length=500,null=True,blank=True)
    st_amount=models.FloatField(verbose_name="ST Amount",blank=True,null=True)
    ot_amount=models.FloatField(verbose_name="OT Amount",blank=True,null=True)
    dt_amount=models.FloatField(verbose_name="DT Amount",blank=True,null=True)
    
