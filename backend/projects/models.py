from django.db import models
from .validation import validate_file_extension

import os

from accounts.models import User
from Estimating.models import Estimating, Estimating_detail, Proposal,Specification


class Project(models.Model):
    status = models.CharField(choices=[('Construction Phase', 'Construction Phase'), ('Pre-Construction', 'Pre-Construction'), ('Close out phase', 'Close out phase'), (
        'Upcoming/Estimating pahse', 'Upcoming/Estimating pahse'), ('Complete', 'Complete'),], default='Pre-Construction', max_length=50, null=True, blank=True)
    job_num = models.PositiveIntegerField(
        verbose_name="Add Job #", unique=True, null=True, blank=True)
    proposal=models.ForeignKey(Proposal, verbose_name="Add Proposal", on_delete=models.CASCADE, null=True, blank=True)

    prjct_engnr = models.ForeignKey(User, verbose_name="Project Engineer", related_name='Project_Engineer', limit_choices_to=models.Q(
        roles__name='Project Engineer'), on_delete=models.SET_NULL, null=True, blank=True)
    bim_oprtr = models.ForeignKey(User, verbose_name="BIM Modeler", related_name='Bim_Operator', limit_choices_to=models.Q(roles__name='BIM') | models.Q(
        roles__name='BIM Modeler/Trimble Operator') | models.Q(roles__name='BIM/Manager PR'), on_delete=models.SET_NULL, null=True, blank=True)
    Forman = models.ForeignKey(User, verbose_name="FOREMAN/Superintendent", related_name='Forman_as_Forman', limit_choices_to=models.Q(roles__name='Foreman') | models.Q(
        roles__name='General Superintendent') | models.Q(roles__name='So. Cal. General Manager') | models.Q(roles__name='No. Cal. General Manager'), on_delete=models.SET_NULL, null=True, blank=True)
    
    
    
    prjct_mngr = models.ForeignKey(User, verbose_name="Project Manager", related_name='Project_Manager', limit_choices_to=models.Q(
        roles__name='Project Manager') | 
        models.Q(roles__name='Proconstruction Manager') |
        models.Q(roles__name='Vice President') |
        models.Q(roles__name='No. Cal. General Manager'),
          on_delete=models.SET_NULL, null=True, blank=True)

    start_date = models.DateField(
        verbose_name="start Date(YYYY-MM-DD)", null=True, blank=True)
    general_superintendent = models.ForeignKey(User, verbose_name="Genral_superintendent",
                                               limit_choices_to=models.Q(roles__name='General Superintendent') |
                                               models.Q(roles__name='So. Cal. General Manager') |
                                               models.Q(roles__name='No. Cal. General Manager') |
                                               models.Q(roles__name='President'), on_delete=models.SET_NULL, null=True, blank=True)






    project_address=models.CharField(verbose_name="Add project address", max_length=5000, null=True, blank=True)

    addendums=models.CharField(verbose_name="Addendum", max_length=50,choices=[
        ('Available','Available'),('Not Available','Not Available'),
        ],default='Not Available', null=True, blank=True)


    bid=models.CharField(verbose_name="bid", max_length=50,choices=[
        ('Available','Available'),('Not Available','Not Available'),
        ],default='Not Available', null=True, blank=True)

    Spec=models.CharField(verbose_name="Spec's per our Scope", max_length=50,choices=[
        ('Available','Available'),('Not Available','Not Available'),
        ],default='Not Available', null=True, blank=True)

    contacts=models.CharField(verbose_name="Contacts", max_length=50,choices=[
        ('On build','On build'),('Pending','Pending'),
        ],default='Pending', null=True, blank=True)

    drywell=models.CharField(verbose_name="Drywell Conttrol Joins", max_length=50,choices=[
        ('Submited','Submited'),('Working','Working'),('Pending','Pending'),
        ],default='Pending', null=True, blank=True)

    finish=models.CharField(verbose_name="FINISH LEVEL MARKUPS", max_length=50,choices=[
        ('Completed','Completed'),('Working','Working'),('Pending','Pending'),
        ],default='Pending', null=True, blank=True)
    wall_type=models.CharField(verbose_name="WALL TYPE MAPPING", max_length=50,choices=[
        ('Completed','Completed'),('Working','Working'),('Pending','Pending'),
        ],default='Pending', null=True, blank=True)
    progress=models.CharField(verbose_name="PROGRESS TRACKING", max_length=50,choices=[
        ('Completed','Completed'),('Working','Working'),('Pending','Pending'),
        ],default='Pending', null=True, blank=True)

    ro_door=models.CharField(verbose_name="RO-Door", max_length=50,choices=[
        ('Working','Working'),('Submited','Submited'),('Pending','Pending'),('Done','Done')
        ],default='Pending', null=True, blank=True)
    
    ro_window=models.CharField(verbose_name="RO-Window", max_length=50,choices=[
        ('Working','Working'),('Submited','Submited'),('Pending','Pending'),('Done','Done')
        ],default='Pending', null=True, blank=True)

    substitution=models.CharField(verbose_name="Substitution", max_length=5000, null=True, blank=True)










    # def save(self, *args, **kwargs):
    #     # Check if this is a new instance (i.e., being created and not updated)
    #     is_new = not self.pk

    #     super(Project, self).save(*args, **kwargs)

    #     if is_new:

    #         estimating_to_project = {}
    #         created_directories = {}

    #         # Function to simplify directory creation and tracking
    #         def create_directory(name,estimating_parent=None, parent_name=None):
    #             parent = created_directories.get(parent_name) if parent_name else None
    #             directory = Project_detail.objects.create(
    #                 prjct_id=self,
    #                 drctry_Name=name,
    #                 prnt_id=parent
    #             )
    #             created_directories[name] = directory
    #             if estimating_parent:
    #                 estimating_to_project[estimating_parent] = directory

    #         # Top Level Entries

    #         for estimating_detail in Estimating_detail.objects.all():
    #             estimating_parent = estimating_detail.prnt
    #             parent_directory = estimating_to_project.get(estimating_parent) if estimating_parent else None
    #             directory = Project_detail.objects.create(
    #                 prjct_id=self,
    #                 drctry_Name=estimating_detail.drctry_name,
    #                 prnt_id=parent_directory,
    #                 file_type=estimating_detail.file_type,
    #                 file_name=estimating_detail.file_name,
    #                 file_binary_data=estimating_detail.file_binary_data
    #             )
    #             estimating_to_project[estimating_detail] = directory

    #         for name in ['Accounting', 'Certified Payroll', 'Change Orders','Insurance', 'Contract', 'Estimating', 'PM', 'Safety', 'Subcontractors']:
    #             create_directory(name)

    #         # Second Level Entries
    #         for item  in [
    #             {'name': 'Billing', 'parent': 'Accounting'},
    #             {'name': 'DIR', 'parent': 'Certified Payroll'},
    #             {'name': '001', 'parent': 'Change Orders'},
    #             {'name': '002', 'parent': 'Change Orders'},
    #             {'name': '003', 'parent': 'Change Orders'},
    #             {'name': '004', 'parent': 'Change Orders'},
    #             {'name': '005', 'parent': 'Change Orders'},
    #             {'name': '006', 'parent': 'Change Orders'},
    #             {'name': '007', 'parent': 'Change Orders'},
    #             {'name': '008', 'parent': 'Change Orders'},
    #             {'name': '009', 'parent': 'Change Orders'},
    #             {'name': '010', 'parent': 'Change Orders'},
    #             {'name': 'Contract', 'parent': 'Contract'},
    #             {'name': 'Contract Documents', 'parent': 'Contract'},
    #             {'name': 'Letter of Intent', 'parent': 'Contract'},
    #             {'name': 'COI', 'parent': 'Insurance'},
    #             {'name': 'Insurance Requirements', 'parent': 'Insurance'},
    #             {'name': 'Rancho Mesa Insurance - Template', 'parent': 'Insurance'},

    #             {'name': 'Badging', 'parent': 'PM'},

    #             {'name': 'BIM', 'parent': 'PM'},
    #             {'name': 'Budget Report', 'parent': 'PM'},
    #             {'name': 'Contacts', 'parent': 'PM'},
    #             {'name': 'Coordination', 'parent': 'PM'},
    #             {'name': 'Coordination Meetings', 'parent': 'PM'},
    #             {'name': 'Delay Notices', 'parent': 'PM'},
    #             {'name': 'Emails', 'parent': 'PM'},
    #             {'name': 'Extra Work', 'parent': 'PM'},
    #             {'name': 'Inspections', 'parent': 'PM'},
    #             {'name': 'Material', 'parent': 'PM'},
    #             {'name': 'Photos', 'parent': 'PM'},
    #             {'name': 'Plans', 'parent': 'PM'},
    #             {'name': 'Prelim', 'parent': 'PM'},
    #             {'name': 'RFIs,ASIs,etc', 'parent': 'PM'},
    #             {'name': 'Schedule', 'parent': 'PM'},
    #             {'name': 'Specs', 'parent': 'PM'},
    #             {'name': 'Submittals', 'parent': 'PM'},
    #             {'name': 'Approved AHAs', 'parent': 'Safety'},
    #             {'name': 'Charlies - AHA & Site Specific Safety Plan', 'parent': 'Safety'},
    #             {'name': 'Hill AFB Safety - Jame Prepaired', 'parent': 'Safety'},

    #             {'name': 'Subcontractor Name', 'parent': 'Subcontractors'},
    #         ]:
    #             create_directory(item['name'], item['parent'])

    #         # Third Level Entries
    #         for item  in [
    #             {'name': '2022', 'parent': 'Billing'},
    #             {'name': '2023', 'parent': 'Billing'},
    #             {'name': 'Billing Form', 'parent': 'Billing'},
    #             {'name': 'Releases', 'parent': 'Billing'},
    #             {'name': 'OLD', 'parent': 'Contract'},
    #             {'name': 'Prelim', 'parent': 'Contract Documents'},
    #             {'name': 'Abadael Perez', 'parent': 'Badging'},
    #             {'name': 'Carmelo Ayala', 'parent': 'Badging'},
    #             {'name': 'David Schmitt', 'parent': 'Badging'},
    #             {'name': 'Ernesto Rincon', 'parent': 'Badging'},
    #             {'name': 'Gonzalo Currasco', 'parent': 'Badging'},
    #             {'name': 'Jon Taylor', 'parent': 'Badging'},
    #             {'name': 'Juan Currasco', 'parent': 'Badging'},
    #             {'name': 'Tylor Tudor', 'parent': 'Badging'},
    #             {'name': 'Extra Work Rates', 'parent': 'Extra Work'},
    #             {'name': 'PCOs', 'parent': 'Extra Work'},
    #             {'name': '00. POs w OAs', 'parent': 'Material'},
    #             {'name': '06. Equipment Quotes', 'parent': 'Material'},
    #             {'name': 'OAs - Still need a PO', 'parent': 'Material'},
    #             {'name': 'Issued For Construction', 'parent': 'Plans'},
    #             {'name': 'old', 'parent': 'Plans'},
    #             {'name': 'ROUGH OPENINGS', 'parent': 'Plans'},
    #             {'name': '100% Plans', 'parent': 'Plans'},
    #             {'name': 'DMS RFIs', 'parent': 'RFIs,ASIs,etc'},
    #             {'name': 'Talha Schedules', 'parent': 'Schedule'},
    #             {'name': 'Approved', 'parent': 'Submittals'},
    #             {'name': 'Badging', 'parent': 'Submittals'},
    #             {'name': 'Close Out Docs', 'parent': 'Submittals'},
    #             {'name': 'Returned Submittals', 'parent': 'Submittals'},
    #             {'name': 'Shop Drawings', 'parent': 'Submittals'},
    #             {'name': 'Submittal Catalog', 'parent': 'Submittals'},
    #             {'name': 'Title Page & TOC for Submittals', 'parent': 'Submittals'},
    #             {'name': 'Working File', 'parent': 'Submittals'},
    #             {'name': 'Working File', 'parent': 'Submittals'},
    #             {'name': 'Accounting', 'parent': 'Subcontractor Name'},
    #             {'name': 'Change Order', 'parent': 'Subcontractor Name'},
    #             {'name': 'Contract', 'parent': 'Subcontractor Name'},
    #             {'name': 'PM', 'parent': 'Subcontractor Name'},

    #         ]:
    #             create_directory(item['name'], item['parent'])

    #         # Fourth Level Entries
    #         for item  in [
    #             {'name': '2023 Wage Rates for Dist', 'parent': 'Extra Work Rates'},
    #             {'name': 'PCO 000 - DESCRIPTION', 'parent': 'PCOs'},
    #             {'name': 'PCO 001 - Exterior Mock Up - Need to Send', 'parent': 'PCOs'},
    #             {'name': 'PCO 002 - IFC Drawing Updates', 'parent': 'PCOs'},
    #             {'name': 'PCO 003 - T&M for Mock Up', 'parent': 'PCOs'},
    #             {'name': 'Misc pages', 'parent': '100% Plans'},
    #             {'name': 'Sent to James .26.23', 'parent': 'Talha Schedules'},
    #             {'name': 'Approved', 'parent': 'Returned Submittals'},
    #             {'name': 'Exterior', 'parent': 'Shop Drawings'},
    #             {'name': 'Interior', 'parent': 'Shop Drawings'},
    #             {'name': 'Quotes', 'parent': 'Shop Drawings'},
    #             {'name': '01. Product Data', 'parent': 'Submittal Catalog'},
    #             {'name': '02. LEED', 'parent': 'Submittal Catalog'},
    #             {'name': '03. Product Test Reports', 'parent': 'Submittal Catalog'},
    #             {'name': '04. Certificates', 'parent': 'Submittal Catalog'},
    #             {'name': '05. Typ Shop Drawings', 'parent': 'Submittal Catalog'},
    #             {'name': '06. Trimble Concrete Guide', 'parent': 'Submittal Catalog'},
    #             {'name': '05 40 00 - Cold Formed Metal Framing', 'parent': 'Working File'},
    #             {'name': '07 21 16 - Mineral Fiber Blanket Insulation', 'parent': 'Working File'},
    #             {'name': '07 84 00 - Firestopping', 'parent': 'Working File'},
    #             {'name': '07 92 00 - Joint Sealants', 'parent': 'Working File'},

    #             {'name': '09 22 00 - Supports for Gyp', 'parent': 'Working File'},
    #             {'name': '09 29 00 - Gypsum Board', 'parent': 'Working File'},
    #             {'name': 'SEND', 'parent': 'Working File'},
    #             {'name': 'Welding Procedures', 'parent': 'Working File'},

    #         ]:
    #             create_directory(item['name'], item['parent'])

    #         for item  in [
    #             {'name': 'old', 'parent': 'Exterior'},
    #             {'name': '1. Dewalt', 'parent': '01. Product Data'},
    #             {'name': '3. Ramset', 'parent': '01. Product Data'},
    #             {'name': '4. Simpson', 'parent': '01. Product Data'},
    #             {'name': '05 40 00 - Cold Form Metal Framing', 'parent': '01. Product Data'},
    #             {'name': '07 92 00 - Joint Sealants', 'parent': '01. Product Data'},
    #             {'name': '0924 Lath & Plaster', 'parent': '01. Product Data'},
    #             {'name': '0929 Gypsum Board', 'parent': '01. Product Data'},
    #             {'name': '078440 - Firestopping', 'parent': '01. Product Data'},
    #             {'name': 'Interior', 'parent': '01. Product Data'},
    #             {'name': '092216 - Non-Structural Metal Framing', 'parent': '01. Product Data'},
    #             {'name': 'Backer Rod', 'parent': '01. Product Data'},
    #             {'name': 'Insulation', 'parent': '01. Product Data'},
    #             {'name': 'Insulation', 'parent': '01. Product Data'},
    #             {'name': 'Neoprene Gasket Tape - -Base of wall', 'parent': '01. Product Data'},
    #             {'name': 'RF Shielding - rFoil - with accessories', 'parent': '01. Product Data'},
    #             {'name': 'VOC Certs', 'parent': '02. LEED'},

    #             {'name': '08 Sound Board', 'parent': '09 29 00 - Gypsum Board'},
    #             {'name': 'Mock Up', 'parent': 'SEND'},
    #             {'name': 'Welding Procedures', 'parent': 'SEND'},

    #         ]:
    #             create_directory(item['name'], item['parent'])

    #         for item  in [

    #             {'name': 'BlazeFrame Product Data', 'parent': '05 40 00 - Cold Form Metal Framing'},
    #             {'name': 'Grabber screws', 'parent': '05 40 00 - Cold Form Metal Framing'},
    #             {'name': 'Header Cripple Stud Clips', 'parent': '05 40 00 - Cold Form Metal Framing'},
    #             {'name': 'Lath', 'parent': '0924 Lath & Plaster'},
    #             {'name': 'Abuse Resistant', 'parent': '0929 Gypsum Board'},
    #             {'name': 'Asbestos Free Certifications', 'parent': '0929 Gypsum Board'},
    #             {'name': 'Cementious Board', 'parent': '0929 Gypsum Board'},
    #             {'name': 'Ext. Gyp Sheathing', 'parent': '0929 Gypsum Board'},
    #             {'name': 'Grabber Screws', 'parent': '0929 Gypsum Board'},
    #             {'name': 'Hilti Screws', 'parent': '0929 Gypsum Board'},
    #             {'name': 'Impact Resistant', 'parent': '0929 Gypsum Board'},
    #             {'name': 'Pre-Rock Drywall', 'parent': '0929 Gypsum Board'},
    #             {'name': 'Shaftwall Liner', 'parent': '0929 Gypsum Board'},
    #             {'name': 'Type X Board', 'parent': '0929 Gypsum Board'},
    #             {'name': 'Water Resistant', 'parent': '0929 Gypsum Board'},
    #             {'name': 'Estimating Tables for Materials', 'parent': '078440 - Firestopping'},
    #             {'name': 'Grabber Firestopping', 'parent': '078440 - Firestopping'},
    #             {'name': 'STI Firestopping', 'parent': '078440 - Firestopping'},
    #             {'name': 'Grabber Screws', 'parent': '092216 - Non-Structural Metal Framing'},
    #             {'name': 'Header Cripple Stud Clips', 'parent': '092216 - Non-Structural Metal Framing'},
    #             {'name': 'Submittal to be updated', 'parent': 'Welding Procedures'},

    #         ]:
    #             create_directory(item['name'], item['parent'])

    #         for name in [

    #             {'name': 'Amico', 'parent': 'Lath'},
    #             {'name': 'Structa Wire', 'parent': 'Lath'},

    #         ]:
    #             create_directory(item['name'], item['parent'])

    def __str__(self):
        return str(self.proposal)










class Contract(models.Model):
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)
    contract=models.CharField(verbose_name="Contract", max_length=50,choices=[
        ('Fully Executed','Fully Executed'),('Pending','Pending')
        ],default='Pending', null=True, blank=True)
    contract_date=models.DateField(verbose_name="add date of the Contract if Fully Executed (YYYY-MM-DD)", null=True, blank=True)


class Schedule_of_Value(models.Model):
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)
    schedule=models.CharField(verbose_name="Schedule of Value", max_length=50,choices=[
        ('Approved','Approved'),('Pending','Pending')
        ],default='Pending', null=True, blank=True)
    schedule_date=models.DateField(verbose_name="add date of the schedule if Approved (YYYY-MM-DD)", null=True, blank=True)



class Insurance(models.Model):
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)
    insurance=models.CharField(verbose_name="Insurance", max_length=50,choices=[
        ('CCIP','CCIP'),('Sent','Sent'),('Received','Received'),('Complete','Complete'),
        ],default='null', null=True, blank=True)
    date=models.DateField(verbose_name="add date(YYYY-MM-DD)", null=True, blank=True)
class Bond(models.Model):
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)
    bond=models.CharField(verbose_name="Bond", max_length=50,choices=[
        ('Sent','Sent'),('Received','Received'),('Complete','Complete'),
        ],default='null', null=True, blank=True)
    date=models.DateField(verbose_name="add date(YYYY-MM-DD)", null=True, blank=True)
class  Zlien(models.Model):
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)
    zlien=models.CharField(verbose_name="Zlien", max_length=50,choices=[
        ('Submitted','Submitted'),('Pending','Pending'),
        ],default='Pending', null=True, blank=True)
    date=models.DateField(verbose_name="add date(YYYY-MM-DD)", null=True, blank=True)


class Submittals(models.Model):
    proposal=models.ForeignKey(Proposal, verbose_name="Add Proposal", on_delete=models.CASCADE, null=True, blank=True)
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)
    scop_work_number=models.ForeignKey(Specification, verbose_name="Add scope of Work", on_delete=models.CASCADE, null=True, blank=True)
    status=models.CharField(verbose_name="Submittals", max_length=50,choices=[
        ('Approved','Approved'),('Pending','Pending'),
        ],default='Pending', null=True, blank=True)
    date=models.DateField(verbose_name="add date(YYYY-MM-DD)", null=True, blank=True)

class ShopDrawing(models.Model):
    proposal=models.ForeignKey(Proposal, verbose_name="Add Proposal", on_delete=models.CASCADE, null=True, blank=True)
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)
    scop_work_number=models.ForeignKey(Specification, verbose_name="Add scope of Work", on_delete=models.CASCADE, null=True, blank=True)
    status=models.CharField(verbose_name="Shop Drawing", max_length=50,choices=[
        ('Approved','Approved'),('Pending','Pending'),
        ],default='Pending', null=True, blank=True)
    date=models.DateField(verbose_name="add date(YYYY-MM-DD)", null=True, blank=True)

class Safity(models.Model):
    proposal=models.ForeignKey(Proposal, verbose_name="Add Proposal", on_delete=models.CASCADE, null=True, blank=True)
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)
    scop_work_number=models.ForeignKey(Specification, verbose_name="Add scope of Work", on_delete=models.CASCADE, null=True, blank=True)
    status=models.CharField(verbose_name="Safity", max_length=50,choices=[
        ('Approved','Approved'),('Pending','Pending'),
        ],default='Pending', null=True, blank=True)
    date=models.DateField(verbose_name="add date(YYYY-MM-DD)", null=True, blank=True)
    comment_box=models.CharField(verbose_name="comment", max_length=5000)

class Schedule(models.Model):
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)
    status=models.CharField(verbose_name="Schedule", max_length=50,choices=[
        ('Available','Available'),('Not Available','Not Available'),
        ],default='Not Available', null=True, blank=True)
    date=models.DateField(verbose_name="add date(YYYY-MM-DD)", null=True, blank=True)

class Sub_Contractors(models.Model):
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)
    status=models.CharField(verbose_name="Sub Contractors", max_length=50,choices=[
        ('Capable','Capable'),('Not Capable','Not Capable'),('Custom','Custom'),
        ],default='Not Capable', null=True, blank=True)
    date=models.DateField(verbose_name="add date(YYYY-MM-DD)", null=True, blank=True)
    comment_box=models.CharField(verbose_name="comment", max_length=5000, null=True, blank=True)

class LaborRate(models.Model):
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)
    status=models.CharField(verbose_name="Labor Rate", max_length=50,choices=[
        ('Aproved','Aproved'),('Pending','Pending'),('Custom','Custom'),
        ],default='Pending', null=True, blank=True)
    date=models.DateField(verbose_name="add date(YYYY-MM-DD)", null=True, blank=True)
    comment_box=models.CharField(verbose_name="comment", max_length=5000, null=True, blank=True)

class Billing(models.Model):
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)
    due_date=models.DateField(verbose_name="add due date(YYYY-MM-DD)", null=True, blank=True)
    reduction=models.CharField(verbose_name="Add Reduction", max_length=500,null=True, blank=True)

class Sov(models.Model):
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)
    status=models.CharField(verbose_name="Labor Rate", max_length=50,choices=[
        ('Aproved','Aproved'),('Pending','Pending'),
        ],default='Pending', null=True, blank=True)
    date=models.DateField(verbose_name="add date if Status Approved (YYYY-MM-DD)", null=True, blank=True)


class HDS_system(models.Model):
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)
    status=models.CharField(verbose_name="HDS System", max_length=50,choices=[
        ('Not Required','Not Required'),('Aproved','Aproved'),('Pending','Pending'),('Custom','Custom'),
        ],default='Pending', null=True, blank=True)
    date=models.DateField(verbose_name="add date(YYYY-MM-DD)", null=True, blank=True)
    comment_box=models.CharField(verbose_name="comment", max_length=5000, null=True, blank=True)



class OnBuild(models.Model):
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)
    field=models.CharField(verbose_name="select field for the On Build", max_length=50,choices=[
        ('Addendum','Addendum'),('Bide Proposal','Bide Proposal'),('Specs','Specs'),('Contract','Contract'),
        ('Submitile','Submitile'),('Safety','Safety'),('Shop Drawing','Shop Drawing'),('Budget','Budget'),
        ], null=True, blank=True)
    status=models.CharField(verbose_name="HDS System", max_length=50,choices=[
        ('Uploade','Uploade'),('Pending','Pending'),
        ],default='Pending', null=True, blank=True)


class Buget(models.Model):
    project=models.ForeignKey(Project, verbose_name="add project", on_delete=models.CASCADE,null=True,blank=True)
    status=models.CharField(verbose_name="Labor Rate", max_length=50,choices=[
        ('Done','Done'),('Pending','Pending'),('Custom','Custom'),
        ],default='Pending', null=True, blank=True)
    comment_box=models.CharField(verbose_name="comment", max_length=5000, null=True, blank=True)






class Project_detail(models.Model):
    drctry_Name = models.CharField(verbose_name="Folder Name", max_length=255)

    prjct_id = models.ForeignKey(
        Project, verbose_name="Project", on_delete=models.CASCADE)
    prnt_id = models.ForeignKey('self', verbose_name="Folder Parent ID",
                                null=True, blank=True, on_delete=models.CASCADE, related_name="children")
    file_type = models.CharField(
        verbose_name="Type Name", max_length=100, null=True, blank=False)
    file_name = models.CharField(
        verbose_name="file Name", max_length=100, null=True, blank=False)
    file_binary_data = models.BinaryField(null=True, blank=True)

    def __str__(self):
        return self.drctry_Name
