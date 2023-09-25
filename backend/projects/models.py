from django.db import models
from .validation import validate_file_extension

import os

from accounts.models import User
from Estimating.models import Estimating







class Project(models.Model):
    estimating=models.ForeignKey(Estimating, verbose_name="Estimating", on_delete=models.CASCADE)
    job_num=models.PositiveIntegerField(verbose_name="Add Job Number")
    prjct_engnr = models.ForeignKey(User,verbose_name="Project Engineer", related_name='Project_Engineer', limit_choices_to=models.Q(roles__name='Project Engineer'), on_delete=models.SET_NULL, null=True)
    bim_oprtr = models.ForeignKey(User,verbose_name="Bim Operator", related_name='Bim_Operator', limit_choices_to=models.Q(roles__name='Bim Operator'), on_delete=models.SET_NULL, null=True)
    Forman	 = models.ForeignKey(User,verbose_name="Forman	", related_name='Forman_as_Forman', limit_choices_to=models.Q(roles__name='Forman'), on_delete=models.SET_NULL, null=True)
    prjct_mngr = models.ForeignKey(User,verbose_name="Project Manager", related_name='Project_Manager', limit_choices_to=models.Q(roles__name='Project Manager'), on_delete=models.SET_NULL, null=True)
    start_date = models.DateField(verbose_name="start Date(YYYY-MM-DD)",null=True,blank=True)

    
    def __str__(self):
        return str(self.estimating)





class Project_detail(models.Model):
    drctry_Name = models.CharField(verbose_name="Folder Name",max_length=255)

    prjct_ID = models.ForeignKey(Project,verbose_name="Project", on_delete=models.CASCADE)
    prnt_ID = models.PositiveIntegerField(verbose_name="Folder Parent ID",null=False, blank=False)  
    file_type = models.CharField(verbose_name="Type Name",max_length=100, null=False, blank=False)  
    file_name = models.CharField(verbose_name="file Name",max_length=100, null=False, blank=False) 
    file_binary_data = models.BinaryField(null=True, blank=True)

    def __str__(self):
        return self.drctry_Name