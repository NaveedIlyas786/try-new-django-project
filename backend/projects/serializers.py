# serializers.py
from os import write
from rest_framework import serializers
from .models import( Project, Contract,  Insurance, Bond, 
                    Submittals, ShopDrawing,Schedule_of_Value, 
                    Safity, Schedule, Sub_Contractors, LaborRate, HDS_system,
                    Buget,Project_detail,Delay_Notice,RFI,PCO,RFI_Log,Delay_Log,Qualification,Debited_Material,Credited_Material,Miscellaneous,Labor,Attached_Pdf_Delay,Attached_Pdf_Pco,Attached_Pdf_Rfi,Attached_Pdf_Rfi_log
                    , PCO_Log)

from Estimating.models import Proposal,Spec_detail,GC_detail,DMS_Dertory
from Estimating.serializers import ProposalSerializer,SpecificationDetailSerializer,GC_infoSerializers,DMS_DertorySezializers
from django.core.files.uploadedfile import InMemoryUploadedFile

import datetime
import base64
from django.db import transaction
import logging
import json
import re

class ContractSerializer(serializers.ModelSerializer):
    
    contract_date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True) # type: ignore

    class Meta:
        model = Contract
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        
        representation['project'] = instance.project.job_num if instance.project else None


        return representation
    def to_internal_value(self, data):
        # Convert the date format before deserializing
        if 'contract_date' in data and data['contract_date']:
            data['contract_date'] = datetime.datetime.strptime(data['contract_date'], '%m-%d-%Y').date()
        return super().to_internal_value(data)

class ScheduleOfValueSerializer(serializers.ModelSerializer):
    schedule_date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True) # type: ignore # type: ignore

    class Meta:
        model = Schedule_of_Value
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        
        representation['project'] = instance.project.job_num if instance.project else None


        return representation
    
    def to_internal_value(self, data):
        # Convert the date format before deserializing
        if 'schedule_date' in data and data['schedule_date']:
            data['schedule_date'] = datetime.datetime.strptime(data['schedule_date'], '%m-%d-%Y').date()
        return super().to_internal_value(data)

class InsuranceSerializer(serializers.ModelSerializer):

    date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True) # type: ignore

    class Meta:
        model = Insurance
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        
        representation['project'] = instance.project.job_num if instance.project else None


        return representation
    def to_internal_value(self, data):
        # Convert the date format before deserializing
        if 'date' in data and data['date']:
            data['date'] = datetime.datetime.strptime(data['date'], '%m-%d-%Y').date()
        return super().to_internal_value(data)

class BondSerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True) # type: ignore # type: ignore

    class Meta:
        model = Bond
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        
        representation['project'] = instance.project.job_num if instance.project else None


        return representation
    def to_internal_value(self, data):
        # Convert the date format before deserializing
        if 'date' in data and data['date']:
            data['date'] = datetime.datetime.strptime(data['date'], '%m-%d-%Y').date()
        return super().to_internal_value(data)

# class ZlienSerializer(serializers.ModelSerializer):

#     date = serializers.DateField(
#         format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)

#     class Meta:
#         model = Zlien
#         fields = '__all__'
#     def to_representation(self, instance):
#         representation = super().to_representation(instance)
        
        
#         representation['project'] = instance.project.job_num if instance.project else None


#         return representation

class SubmittalsSerializer(serializers.ModelSerializer):
    due_date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True) # type: ignore
    actn_date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True) # type: ignore 

    class Meta:
        model = Submittals
        fields = '__all__'

    def validate(self, data):
        """
        Check that scop_work_number belongs to the same proposal as project.
        """
        scop_work_number = data.get('scop_work_number')
        project = data.get('project')

        if scop_work_number and project:
            if scop_work_number.sefic.proposal != project.proposal:
                raise serializers.ValidationError({
                    'scop_work_number': 'Invalid scop_work_number. It does not belong to the same proposal as project.'
                })

        return data
    def to_internal_value(self, data):
        # Convert the date format before deserializing
        for date_field in ['due_date', 'actn_date']:
            if date_field in data and data[date_field]:
                try:
                    data[date_field] = datetime.datetime.strptime(data[date_field], '%m-%d-%Y').date()
                except ValueError:
                    raise serializers.ValidationError({date_field: 'Invalid date format. Use MM-DD-YYYY.'})   
        return super().to_internal_value(data)



    def to_representation(self, instance):
        representation = super().to_representation(instance)
        

        try:
            representation['scop_work_number'] = instance.scop_work_number.number if instance.scop_work_number else None
        except (Spec_detail.DoesNotExist, AttributeError) as e:
            representation['scop_work_number'] = None   
            # print(e)     

        representation['project'] = instance.project.job_num if instance.project else None


        return representation

class ShopDrawingSerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True) # type: ignore

    class Meta:
        model = ShopDrawing
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        

        try:
            representation['scop_work_number'] = instance.scop_work_number.number if instance.scop_work_number else None
        except (Spec_detail.DoesNotExist, AttributeError) as e:
            representation['scop_work_number'] = None   
            # print(e)  
        representation['project'] = instance.project.job_num if instance.project else None


        return representation
    def to_internal_value(self, data):
        # Convert the date format before deserializing
        if 'date' in data and data['date']:
            data['date'] = datetime.datetime.strptime(data['date'], '%m-%d-%Y').date()
        return super().to_internal_value(data)

class SafitySerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True) # type: ignore # type: ignore

    class Meta:
        model = Safity
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        

        try:
            representation['scop_work_number'] = instance.scop_work_number.number if instance.scop_work_number else None
        except (Spec_detail.DoesNotExist, AttributeError) as e:
            representation['scop_work_number'] = None   
            # print(e)  
        representation['project'] = instance.project.job_num if instance.project else None


        return representation
    def to_internal_value(self, data):
        # Convert the date format before deserializing
        if 'date' in data and data['date']:
            data['date'] = datetime.datetime.strptime(data['date'], '%m-%d-%Y').date()
        return super().to_internal_value(data)
class ScheduleSerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True) # type: ignore # type: ignore

    class Meta:
        model = Schedule
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        
        representation['project'] = instance.project.job_num if instance.project else None


        return representation
    def to_internal_value(self, data):
        # Convert the date format before deserializing
        if 'date' in data and data['date']:
            data['date'] = datetime.datetime.strptime(data['date'], '%m-%d-%Y').date()
        return super().to_internal_value(data)

class SubContractorsSerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True) # type: ignore # type: ignore

    class Meta:
        model = Sub_Contractors
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        
        representation['project'] = instance.project.job_num if instance.project else None


        
        return representation
    def to_internal_value(self, data):
        # Convert the date format before deserializing
        if 'date' in data and data['date']:
            data['date'] = datetime.datetime.strptime(data['date'], '%m-%d-%Y').date()
        return super().to_internal_value(data)
class LaborRateSerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True) # type: ignore
    class Meta:
        model = LaborRate
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        representation['project'] = instance.project.job_num if instance.project else None


        return representation
    def to_internal_value(self, data):
        # Convert the date format before deserializing
        if 'date' in data and data['date']:
            data['date'] = datetime.datetime.strptime(data['date'], '%m-%d-%Y').date()
        return super().to_internal_value(data)

class HDSSystemSerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True) # type: ignore

    class Meta:
        model = HDS_system
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        
        representation['project'] = instance.project.job_num if instance.project else None


        return representation
    def to_internal_value(self, data):
        # Convert the date format before deserializing
        if 'date' in data and data['date']:
            data['date'] = datetime.datetime.strptime(data['date'], '%m-%d-%Y').date()
        return super().to_internal_value(data)



class BugetSerializer(serializers.ModelSerializer):
    contract_date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True) # type: ignore # type: ignore

    class Meta:
        model = Buget
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        
        representation['project'] = instance.project.job_num if instance.project else None


        return representation
    def to_internal_value(self, data):
        # Convert the date format before deserializing
        if 'contract_date' in data and data['contract_date']:
            data['contract_date'] = datetime.datetime.strptime(data['contract_date'], '%m-%d-%Y').date()
        return super().to_internal_value(data)
    


class ProjectSerializer(serializers.ModelSerializer):
    
    contracts = ContractSerializer(source='contract_set', many=True, read_only=True, required=False)
    schedule_of_values = ScheduleOfValueSerializer(source='schedule_of_value_set', many=True, read_only=True)
    insurancs = InsuranceSerializer(source='insurance_set', many=True, read_only=True, required=False)
    bond = BondSerializer(source='bond_set', many=True, read_only=True, required=False)
    # zliens = ZlienSerializer(source='zlien_set', many=True, read_only=True, required=False)
    submittals = SubmittalsSerializer(source='submittals_set', many=True, read_only=True, required=False)
    shopdrawing = ShopDrawingSerializer(source='shopdrawing_set', many=True, read_only=True, required=False)
    safity = SafitySerializer(source='safity_set', many=True, read_only=True, required=False)
    schedule = ScheduleSerializer(source='schedule_set', many=True, read_only=True, required=False)
    sub_contractors = SubContractorsSerializer(source='sub_contractors_set', many=True, read_only=True, required=False)
    laborrate = LaborRateSerializer(source='laborrate_set', many=True, read_only=True, required=False)

    hds_system= HDSSystemSerializer(source='hds_system_set', many=True, required=False, read_only=True)
    buget = BugetSerializer(source='buget_set', many=True, required=False, read_only=True)
    start_date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True) # type: ignore

    proposal_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=Proposal.objects.all(), source='proposal', required=False)
    prjct_engnr=DMS_DertorySezializers(read_only=True)
    prjct_engnr_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=DMS_Dertory.objects.all(),source='prjct_engnr',required=False)

    bim_oprtr_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=DMS_Dertory.objects.all(),source='bim_oprtr',required=False)
    bim_oprtr=DMS_DertorySezializers(read_only=True)
    
    Forman_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=DMS_Dertory.objects.all(),source='Forman',required=False)
    Forman=DMS_DertorySezializers(read_only=True)
    
    
    prjct_mngr_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=DMS_Dertory.objects.all(),source='prjct_mngr',required=False)
    prjct_mngr=DMS_DertorySezializers(read_only=True)
    
    general_superintendent_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=DMS_Dertory.objects.all(),source='general_superintendent',required=False)
    general_superintendent=DMS_DertorySezializers(read_only=True)
    
    proposal=ProposalSerializer(read_only=True)
    
    gc_id=serializers.PrimaryKeyRelatedField(write_only=True,queryset=GC_detail.objects.all(),source='gc',required=False)
    gc=GC_infoSerializers(read_only=True)
    class Meta:
        model = Project
        fields = ['id','status', 'job_num', 'start_date', 'proposal_id','prjct_engnr_id','prjct_engnr','bim_oprtr_id','bim_oprtr','Forman_id','Forman','prjct_mngr_id','prjct_mngr','start_date','general_superintendent_id','general_superintendent',
                    'project_address','addendums','contacts','gc_id','gc','gc_address','drywell','finish','wall_type','ro_door','ro_window','substitution',
                    'contracts','schedule_of_values','insurancs','bond','submittals','shopdrawing','safity','schedule','sub_contractors','laborrate',
                    'hds_system','buget','gc_attn','attn_email','attn_phone','proposal']
        


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for field_name, field in self.fields.items():
            field.required = False
            
    def to_representation(self, instance):


        representation = super().to_representation(instance)
        
        if 'hds_system' in representation:
            representation['HDS System'] = representation.pop('hds_system')


        if 'proposal' in representation:
            representation['Proposal'] = representation.pop('proposal')

        if 'schedule_of_values' in representation:
            representation['Schedule Of Values'] = representation.pop('schedule_of_values')

        if 'wall_type' in representation:
            representation['Wall Type Mapping'] = representation.pop('wall_type')

        if 'ro_door' in representation:
            representation['RO-Door'] = representation.pop('ro_door')

        if 'ro_window' in representation:
            representation['RO-Window'] = representation.pop('ro_window')






        if 'contracts' in representation:
            representation['Contracts'] = representation.pop('contracts')

        if 'contacts' in representation:
            representation['Contacts'] = representation.pop('contacts')
        
        if 'drywell' in representation:
            representation['Drywall Control Joints'] = representation.pop('drywell')

        if 'finish' in representation:
            representation['Finish Level Markups'] = representation.pop('finish')

        if 'submittals' in representation:
            representation['Submittals'] = representation.pop('submittals')

        if 'shopdrawing' in representation:
            representation['Shop Drawings'] = representation.pop('shopdrawing')


        if 'safity' in representation:
            representation['Safety Documents'] = representation.pop('safity')

        if 'laborrate' in representation:
            representation['Wage Rates'] = representation.pop('laborrate')

        if 'buget' in representation:
            representation['Budget'] = representation.pop('buget')

        if 'sub_contractors' in representation:
            representation['Sub Contractors'] = representation.pop('sub_contractors')

        if 'insurancs' in representation:
            representation['Insurances'] = representation.pop('insurancs')

        if 'substitution' in representation:
            representation['Substitutions'] = representation.pop('substitution')

        if 'addendums' in representation:
            representation['Addendum'] = representation.pop('addendums')


        if 'bond' in representation:
            representation['Bonds'] = representation.pop('bond')

        if 'schedule' in representation:
            representation['Schedule'] = representation.pop('schedule')

        # if 'addendums' in representation:
        #     representation['addendums'] = representation.pop('addendums')


        return representation
class RecursiveProjectDetailSerializer(serializers.Serializer):
    """Serializer for recursive Estimating_detail children."""
    def to_representation(self, value):
        serializer = ProjectDetailSerializer(value, context=self.context)
        return serializer.data

class ProjectDetailSerializer(serializers.ModelSerializer):
    children = RecursiveProjectDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Project_detail
        fields = ['id', 'drctry_Name', 'prjct_id', 'prnt_id', 'file_type', 'file_name', 'children']


class Attache_PDF_RFISerializer(serializers.ModelSerializer):
        # Convert binary data to base64 for serialization
    class Meta:
        model=Attached_Pdf_Rfi
        fields='__all__'



class RFISerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)# type: ignore
    rspns_rqrd = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)# type: ignore
    rply_by = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)# type: ignore
    date2 = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)# type: ignore
    
    project_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=Project.objects.all(), source='project', required=False)
    project=ProjectSerializer(read_only=True)
    attached_pdfs = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = RFI
        fields = ['id', 'project', 'project_id', 'rfi_num', 'date', 'drwng_rfrnc', 'detl_num', 'spc_rfrnc', 'dscrptn', 'rspns_rqrd', 'qustn', 'bool1', 'bool2', 'bool3', 'rply_by', 'rspns', 'name_log', 'title', 'date2', 'attached_pdfs']
        # Note: 'attached_pdf' removed from fields since it's handled by get_attached_pdfs and not a direct model field

    def get_attached_pdfs(self, obj):
        attached_pdfs = Attached_Pdf_Rfi.objects.filter(rfi=obj)
        return Attache_PDF_RFISerializer(attached_pdfs, many=True).data

    def create(self, validated_data):
        attached_pdf_data = validated_data.pop('attached_pdfs', None)
        rfi = RFI.objects.create(**validated_data)
        if attached_pdf_data and isinstance(attached_pdf_data, InMemoryUploadedFile):
            for file in attached_pdf_data:
                file_content = file.read() #type: ignore
                Attached_Pdf_Rfi.objects.create(
                    file_name=file.name ,#type: ignore
                    rfi=rfi,
                    typ=file.content_type, #type: ignore
                    binary=base64.b64encode(file_content),
                )
        return rfi

#comment changing


class Attache_PDF_RFI_LogSerializer(serializers.ModelSerializer):
    # binary = serializers.SerializerMethodField()

    # def get_binary(self, obj):
    #     if obj.binary:
    #         return base64.b64encode(obj.binary).decode('utf-8')
    #     return None
    class Meta:
        model=Attached_Pdf_Rfi_log
        fields='__all__'

class RFI_LogSerializer(serializers.ModelSerializer):
    date_close = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)# type: ignore
    received_date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)# type: ignore
    
    
    rfi_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=RFI.objects.all(), source='rfi', required=False,allow_null=True)
    rfi=RFISerializer(read_only=True)
    
    project_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=Project.objects.all(), source='project', required=False)
    project=ProjectSerializer(read_only=True)
    attached_pdfs = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model=RFI_Log
        fields=['id','project_id','rfi_id','rfi','gc_rfi_num','date_close','status','cost_schdl','received_date','project','attached_pdfs']
        
        
    def get_attached_pdfs(self, obj):
        attached_pdfs = Attached_Pdf_Rfi_log.objects.filter(rfi_log=obj)
        return Attache_PDF_RFI_LogSerializer(attached_pdfs, many=True).data
    def create(self, validated_data):
        attached_pdf_data = validated_data.pop('attached_pdfs', None)
        rfi_log = RFI_Log.objects.create(**validated_data)
        if attached_pdf_data and isinstance(attached_pdf_data, InMemoryUploadedFile):
            for file in attached_pdf_data:
                file_content = file.read() #type: ignore
                Attached_Pdf_Rfi_log.objects.create(
                    file_name=file.name, #type: ignore
                    rfi_log=rfi_log,
                    typ=file.content_type, #type: ignore
                    binary=base64.b64encode(file_content),
                )
        return rfi_log
    # def create(self, validated_data):
    #     attached_pdfs = self.context['request'].FILES.getlist('attached_pdfs')
    #     rfi_log = RFI_Log.objects.create(**validated_data)
    #     for uploaded_file in attached_pdfs:
    #         Attached_Pdf_Rfi_log.objects.create(
    #             rfi_log=rfi_log,
    #             typ=uploaded_file.content_type,
    #             binary=base64.b64encode(uploaded_file.read()),
    #         )
    #     return rfi_log


class QualificationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Qualification
        fields = '__all__'

class DebitedMaterialSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Debited_Material
        fields = '__all__'

class CreditedMaterialSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Credited_Material
        fields = '__all__'
        
class MiscellaneousSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Miscellaneous
        fields = '__all__'

class LaborSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Labor
        fields = '__all__'


class Attache_PDF_PCOSerializer(serializers.ModelSerializer):
        # Convert binary data to base64 for serialization
    class Meta:
        model=Attached_Pdf_Pco
        fields='__all__'
        
        
logger = logging.getLogger(__name__)
class PCOSerializer(serializers.ModelSerializer):
    
    date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)#type: ignore
    rfi_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=RFI_Log.objects.all(), source='rfi',required=False)
    rfi=RFI_LogSerializer(read_only=True)

    
    project_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=Project.objects.all(), source='project', required=False)
    project=ProjectSerializer(read_only=True)
    
    qualifications = QualificationSerializer(many=True, required=False)
    debited_materials = DebitedMaterialSerializer(many=True, required=False)
    credited_materials = CreditedMaterialSerializer(many=True, required=False)
    miscellaneous = MiscellaneousSerializer(many=True, required=False)
    labor = LaborSerializer(many=True, required=False)
    attached_pdfs = serializers.SerializerMethodField(read_only=True,required=False)

    class Meta:
        model = PCO
        fields = [
            'id', 'date', 'pco_num', 'project_id', 'asi_num', 'pci_num', 'project', 'rfi_id', 'rfi',
            'dcrsbsn', 'chnge_dtals', 'typ', 'work_day', 'mtrl_sub_totl', 'get_tax', 'value_tax',
            'mtrl_totl', 'mscllns_totl', 'lbr_totl', 'subtotl_cost', 'get_ohp_tax', 'value_ohp_tax',
            'cost_ohp_mtrl_tax', 'get_bond', 'value_bond', 'totl_rqest', 'prpd_by',
            'qualifications', 'debited_materials', 'credited_materials', 'miscellaneous', 'labor','attached_pdfs',
        ]
    def get_attached_pdfs(self, obj):
        attached_pdfs = Attached_Pdf_Pco.objects.filter(pco=obj)
        return Attache_PDF_PCOSerializer(attached_pdfs, many=True).data
    
    


    @transaction.atomic
    def create(self, validated_data):
        nested_objects_data = {
            'qualifications': (validated_data.pop('qualifications', []), Qualification),
            'debited_materials': (validated_data.pop('debited_materials', []), Debited_Material),
            'credited_materials': (validated_data.pop('credited_materials', []), Credited_Material),
            'miscellaneous': (validated_data.pop('miscellaneous', []), Miscellaneous),
            'labor': (validated_data.pop('labor', []), Labor),
        }
        
        
        
        # print("Validated Data:", validated_data)
        # logger.debug("Validated Data: %s", validated_data)

        # request = self.context.get('request')
        # if request:
        #     print("Raw Data:", request.data)
        #     logger.debug("Raw Data: %s", request.data)
            
            
            
       
        pco = super().create(validated_data)
        # Save the PCO instance
        PCO_Log.objects.create(
            pco=pco,
            auther_name=pco.prpd_by,
        )

            
        attached_pdf_data = self.context['request'].FILES.getlist('attached_pdfs')
        for file in attached_pdf_data:
            Attached_Pdf_Pco.objects.create(
                file_name=file.name,
                pco=pco,
                binary=file.read(),  # Adjust for base64 encoding if necessary
                typ=file.content_type,
            )

        # Process each type of nested object
        # for _, (nested_data, ModelClass) in nested_objects_data.items():
        #     for item_data in nested_data:
        #         ModelClass.objects.create(pco=pco, **item_data)
                
                # Process nested 'miscellaneous' objects
        request = self.context.get('request')
        if request:
            miscellaneous_items = []
            for key, value in request.data.items():
                if 'miscellaneous' in key:
                    match = re.match(r'miscellaneous\[(\d+)\]\.(.+)', key)
                    if match:
                        index, field = match.groups()
                        index = int(index)
                        while len(miscellaneous_items) <= index:
                            miscellaneous_items.append({})
                        miscellaneous_items[index][field] = value
            
            for item_data in miscellaneous_items:
                Miscellaneous.objects.create(pco=pco, **item_data)
                
        request = self.context.get('request')
        if request:
            qualifications_items = []
            for key, value in request.data.items():
                if 'qualifications' in key:
                    match = re.match(r'qualifications\[(\d+)\]\.(.+)', key)
                    if match:
                        index, field = match.groups()
                        index = int(index)
                        while len(qualifications_items) <= index:
                            qualifications_items.append({})
                        qualifications_items[index][field] = value
            
            for item_data in qualifications_items:
                Qualification.objects.create(pco=pco, **item_data)
                
        request = self.context.get('request')
        if request:
            debited_materials_items = []
            for key, value in request.data.items():
                if 'debited_materials' in key:
                    match = re.match(r'debited_materials\[(\d+)\]\.(.+)', key)
                    if match:
                        index, field = match.groups()
                        index = int(index)
                        while len(debited_materials_items) <= index:
                            debited_materials_items.append({})
                        debited_materials_items[index][field] = value
            
            for item_data in debited_materials_items:
                Debited_Material.objects.create(pco=pco, **item_data)
                
                
        request = self.context.get('request')
        if request:
            credited_materials_items = []
            for key, value in request.data.items():
                if 'credited_materials' in key:
                    match = re.match(r'credited_materials\[(\d+)\]\.(.+)', key)
                    if match:
                        index, field = match.groups()
                        index = int(index)
                        while len(credited_materials_items) <= index:
                            credited_materials_items.append({})
                        credited_materials_items[index][field] = value
            
            for item_data in credited_materials_items:
                Credited_Material.objects.create(pco=pco, **item_data)
                
            
                
                
        request = self.context.get('request')
        if request:
            labor_items = []
            for key, value in request.data.items():
                if 'labor' in key:
                    match = re.match(r'labor\[(\d+)\]\.(.+)', key)
                    if match:
                        index, field = match.groups()
                        index = int(index)
                        while len(labor_items) <= index:
                            labor_items.append({})
                        labor_items[index][field] = value
            
            for item_data in labor_items:
                Labor.objects.create(pco=pco, **item_data)                
        return pco   
    

    @transaction.atomic
    def update(self, instance, validated_data):
        
        nested_fields = ['qualifications', 'debited_materials', 'credited_materials', 'miscellaneous', 'labor']
        for field in nested_fields:
            validated_data.pop(field, None)

    # Update the PCO instance's own fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        
    # Create a dictionary that maps the field names to their serializer classes
        nested_serializers_map = {
        'qualifications': QualificationSerializer,
        'debited_materials': DebitedMaterialSerializer,
        'credited_materials': CreditedMaterialSerializer,
        'miscellaneous': MiscellaneousSerializer,
        'labor': LaborSerializer,
        }

    # Handle updating nested objects
        request = self.context.get('request')
        if request:
            for field_name, serializer_class in nested_serializers_map.items():
                # Manually handle the parsing of indexed fields from form-data
                related_manager = getattr(instance, field_name)
                nested_data_list = []
            
                for key in request.data.keys():
                    if key.startswith(field_name + '['):
                        # Extract the index and the field name
                        match = re.match(rf'{field_name}\[(\d+)\]\.(.+)', key)
                        if match:
                            index, nested_field = match.groups()
                            index = int(index)

                        # Ensure we have enough entries in our list
                            while len(nested_data_list) <= index:
                                nested_data_list.append({})
                        
                        # Convert field data to the correct type if necessary, e.g., convert 'id' to int
                            if nested_field == 'id':
                                value = int(request.data[key])
                            else:
                                value = request.data[key]

                            nested_data_list[index][nested_field] = value

            # Now update or create nested objects
                for nested_data in nested_data_list:
                    item_id = nested_data.get('id')
                    if item_id:  # Update existing nested instance
                        nested_instance = related_manager.get(id=item_id)
                        nested_serializer = serializer_class(nested_instance, data=nested_data, partial=True)
                    else:  # Create new nested instance
                        nested_serializer = serializer_class(data=nested_data)
                
                    if nested_serializer.is_valid(raise_exception=True):
                        nested_serializer.save(pco=instance)

    # Handle file uploads
        if 'attached_pdfs' in request.FILES: #type:ignore
            Attached_Pdf_Pco.objects.filter(pco=instance).delete()  # Clear existing files
            attached_pdf_data = request.FILES.getlist('attached_pdfs') #type:ignore
            for file in attached_pdf_data:
                Attached_Pdf_Pco.objects.create(file_name=file.name ,pco=instance, binary=file.read(), typ=file.content_type, )
    
        return instance



        

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['qualifications'] = QualificationSerializer(instance.qualifications.all(), many=True).data
        representation['debited_materials'] = DebitedMaterialSerializer(instance.debited_materials.all(), many=True).data
        representation['credited_materials'] = CreditedMaterialSerializer(instance.credited_materials.all(), many=True).data
        representation['miscellaneous'] = MiscellaneousSerializer(instance.miscellaneous.all(), many=True).data
        representation['labor'] = LaborSerializer(instance.labor.all(), many=True).data
        return representation

    
    
    
class PCO_LogSerializer(serializers.ModelSerializer):
    pco_id=serializers.PrimaryKeyRelatedField(write_only=True,queryset=PCO.objects.all(),source='pco',required=False)
    pco=PCOSerializer(read_only=True)
    class Meta:
        model=PCO_Log
        fields=['id','pco_id','pco','t_m','cor_amont','co_amont','co_num','auther_name','note']
class Attache_PDF_DelaySerializer(serializers.ModelSerializer):
        # Convert binary data to base64 for serialization
    class Meta:
        model=Attached_Pdf_Delay
        fields='__all__'


class Delay_NoticeSerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)# type: ignore

    project_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=Project.objects.all(), source='project', required=False)
    project=ProjectSerializer(read_only=True)
    rfi_log_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=RFI_Log.objects.all(), source='rfi_log',required=False)
    rfi_log=RFI_LogSerializer(read_only=True)
    pco_log_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=PCO_Log.objects.all(), source='pco_log',required=False)
    pco_log=PCO_LogSerializer(read_only=True)
    attached_pdfs = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model=Delay_Notice
        fields=['id','project_id','delay_num','pco_log_id','pco_log','floor','area','schdul_num','date','rfi_log_id','rfi_log','dscrptn_impct','dscrptn_task','comnt','preprd_by','project','attached_pdfs']
    def get_attached_pdfs(self, obj):
        attached_pdfs = Attached_Pdf_Delay.objects.filter(delay=obj)
        return Attache_PDF_DelaySerializer(attached_pdfs, many=True).data


    def create(self, validated_data):
        attached_pdf_data = validated_data.pop('attached_pdfs', None)
        delay = Delay_Notice.objects.create(**validated_data)
        if attached_pdf_data and isinstance(attached_pdf_data, InMemoryUploadedFile):
            for file in attached_pdf_data:
                file_content = file.read() #type: ignore
                Attached_Pdf_Delay.objects.create(
                    file_name=file.name , #type: ignore
                    delay=delay,
                    binary=base64.b64encode(file_content),
                    typ=file.content_type, #type: ignore
                    
                )
        return delay
        
class Delay_LogSerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)# type: ignore
    
    dly_ntc_id=serializers.PrimaryKeyRelatedField(write_only=True,queryset=Delay_Notice.objects.all(),source='dly_ntc',required=False)
    dly_ntc=Delay_NoticeSerializer(read_only=True)
    class Meta:
        model=Delay_Log
        fields=['id','dly_ntc_id','dly_ntc','date','typ','status','dly_rslov','fnl_impct']
        