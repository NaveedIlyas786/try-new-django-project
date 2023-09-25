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