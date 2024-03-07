from typing import Any
from django.db import models
from projects.models import Project
# Create your models here.



class WageRateDetail(models.Model):
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)
    titleName=models.CharField(verbose_name="Title name", max_length=500,null=True,blank=True)
    st_amount=models.FloatField(verbose_name="ST Amount",blank=True,null=True)
    ot_amount=models.FloatField(verbose_name="OT Amount",blank=True,null=True)
    dt_amount=models.FloatField(verbose_name="DT Amount",blank=True,null=True)
    
    def __str__(self):
        return self.titleName