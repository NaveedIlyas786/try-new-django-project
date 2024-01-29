# serializers.py
from os import write
from rest_framework import serializers
from .models import( Project, Contract,  Insurance, Bond, 
                    Submittals, ShopDrawing,Schedule_of_Value, 
                    Safity, Schedule, Sub_Contractors, LaborRate, HDS_system,
                    Buget,Project_detail,Delay_Notice,RFI,PCO,RFI_Log,Delay_Log,Qualification,Debited_Material,Credited_Material,Miscellaneous,Labor
                    , PCO_Log)

from Estimating.models import Proposal,Spec_detail,GC_detail
from Estimating.serializers import ProposalSerializer,SpecificationDetailSerializer,GC_infoSerializers,DMS_Dertory
from django.core.files.uploadedfile import InMemoryUploadedFile

import datetime
import base64




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
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True) # type: ignore # type: ignore

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

# class BillingSerializer(serializers.ModelSerializer):
#     due_date = serializers.DateField(
#         format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)

#     class Meta:
#         model = Billing
#         fields = '__all__'
#     def to_representation(self, instance):
#         representation = super().to_representation(instance)
        
        
#         representation['project'] = instance.project.job_num if instance.project else None


#         return representation

# class SovSerializer(serializers.ModelSerializer):
#     date = serializers.DateField(
#         format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)

#     class Meta:
#         model = Sov
#         fields = '__all__'
#     def to_representation(self, instance):
#         representation = super().to_representation(instance)
        
        
#         representation['project'] = instance.project.job_num if instance.project else None


#         return representation

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

# class OnBuildSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = OnBuild
#         fields = '__all__'
#     def to_representation(self, instance):
#         representation = super().to_representation(instance)
        
        
#         representation['project'] = instance.project.job_num if instance.project else None


#         return representation

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
    # billing = BillingSerializer(source='billing_set', many=True, read_only=True, required=False)
    # sov = SovSerializer(source='sov_set', many=True, read_only=True, required=False)
    hds_system= HDSSystemSerializer(source='hds_system_set', many=True, required=False, read_only=True)
    # onbuild = OnBuildSerializer(source='onbuild_set', many=True, required=False, read_only=True)
    buget = BugetSerializer(source='buget_set', many=True, required=False, read_only=True)
    start_date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True) # type: ignore

    proposal_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=Proposal.objects.all(), source='proposal', required=False)
    

    proposal=ProposalSerializer(read_only=True)
    
    gc_id=serializers.PrimaryKeyRelatedField(write_only=True,queryset=GC_detail.objects.all(),source='gc',required=False)
    gc=GC_infoSerializers(read_only=True)
    class Meta:
        model = Project
        fields = ['id','status', 'job_num', 'start_date', 'proposal_id','prjct_engnr','bim_oprtr','Forman','prjct_mngr','start_date','general_superintendent',
                    'project_address','addendums','contacts','gc_id','gc','gc_address','drywell','finish','wall_type','ro_door','ro_window','substitution',
                    'contracts','schedule_of_values','insurancs','bond','submittals','shopdrawing','safity','schedule','sub_contractors','laborrate',
                    'hds_system','buget','gc_attn','attn_email','attn_phone','proposal']
        


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for field_name, field in self.fields.items():
            field.required = False
            
    def to_representation(self, instance):


        representation = super().to_representation(instance)
        
        # Handle job_title ManyToMany field
        


        representation['prjct_engnr'] = instance.prjct_engnr.first_name if instance.prjct_engnr else None
        representation['bim_oprtr'] = instance.bim_oprtr.first_name if instance.bim_oprtr else None
        representation['Forman'] = instance.Forman.first_name if instance.Forman else None
        representation['prjct_mngr'] = instance.prjct_mngr.first_name if instance.prjct_mngr else None
        representation['general_superintendent'] = instance.general_superintendent.first_name if instance.general_superintendent else None

        # representation['estimating'] = instance.estimating.prjct_name if instance.estimating else None
        # representation['estimating'] = instance.estimating.prjct_name if instance.estimating else None

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
        # Convert binary data to base64 for serialization
    def to_internal_value(self, data):
        internal_data = super().to_internal_value(data)

        atchd_pdf = data.get('atchd_pdf')
        if atchd_pdf and isinstance(atchd_pdf, InMemoryUploadedFile):
            # Read file content and encode it in base64
            file_content = atchd_pdf.read()
            # Keep it as bytes
            internal_data['atchd_pdf'] = base64.b64encode(file_content)
        elif atchd_pdf and isinstance(atchd_pdf, str):
            # If it's a string, assume it's base64-encoded data
            internal_data['atchd_pdf'] = base64.b64decode(atchd_pdf)
        return internal_data

    class Meta:
        model = RFI
        fields = ['id', 'project', 'project_id', 'rfi_num', 'date', 'drwng_rfrnc', 'detl_num', 'spc_rfrnc','dscrptn', 'rspns_rqrd', 'qustn', 'bool1', 'bool2', 'bool3', 'rply_by', 'rspns', 'name_log', 'title', 'date2', 'atchd_pdf']






class RFI_LogSerializer(serializers.ModelSerializer):
    date_close = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)# type: ignore
    received_date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)# type: ignore
    
    
    rfi_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=RFI.objects.all(), source='rfi', required=False,allow_null=True)
    rfi=RFISerializer(read_only=True)

    class Meta:
        model=RFI_Log
        fields=['id','rfi_id','rfi','gc_rfi_num','date_close','status','cost_schdl','received_date']


class QualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Qualification
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation


class DebitedMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debited_Material
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation
class CreditedMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credited_Material
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation
        
class MiscellaneousSerializer(serializers.ModelSerializer):
    class Meta:
        model = Miscellaneous
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation
class LaborSerializer(serializers.ModelSerializer):
    class Meta:
        model = Labor
        fields = '__all__'
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation



class PCOSerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)# type: ignore
    rfi_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=RFI_Log.objects.all(), source='rfi',required=False)
    rfi=RFI_LogSerializer(read_only=True)

    
    project_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=Project.objects.all(), source='project', required=False)
    project=ProjectSerializer(read_only=True)
    
    qualifications = QualificationSerializer(source='qualification_set', many=True, required=False)
    debited_materials = DebitedMaterialSerializer(source='debited_material_set',many=True, required=False)
    credited_materials = CreditedMaterialSerializer(source='credited_material_set',many=True, required=False)
    miscellaneous = MiscellaneousSerializer(source='miscellaneous_set',many=True, required=False)
    labor = LaborSerializer(source='labor_set',many=True,required=False)
    
    
    
    def to_internal_value(self, data):
        internal_data = super().to_internal_value(data)

        atchd_pdf = data.get('atchd_pdf')
        if atchd_pdf and isinstance(atchd_pdf, InMemoryUploadedFile):
            # Read file content and encode it in base64
            file_content = atchd_pdf.read()
            # Keep it as bytes
            internal_data['atchd_pdf'] = base64.b64encode(file_content)
        elif atchd_pdf and isinstance(atchd_pdf, str):
            # If it's a string, assume it's base64-encoded data
            internal_data['atchd_pdf'] = base64.b64decode(atchd_pdf)
        return internal_data
    
    class Meta:
        model = PCO
        fields = [
            'id', 'date', 'pco_num', 'project_id', 'asi_num', 'pci_num', 'project', 'rfi_id', 'rfi',
            'dcrsbsn', 'chnge_dtals', 'typ', 'work_day', 'mtrl_sub_totl', 'get_tax', 'value_tax',
            'mtrl_totl', 'mscllns_totl', 'lbr_totl', 'subtotl_cost', 'get_ohp_tax', 'value_ohp_tax',
            'cost_ohp_mtrl_tax', 'get_bond', 'value_bond', 'totl_rqest','prpd_by', 'atchd_pdf',
            'qualifications', 'debited_materials', 'credited_materials', 'miscellaneous', 'labor'
        ]
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for field_name, field in self.fields.items():
            field.required = False
    def save(self, **kwargs):
        # Extract nested data before saving the main object
        qualifications_data = self.validated_data.pop('qualification_set', [])# type: ignore
        debited_materials_data = self.validated_data.pop('debited_material_set', [])# type: ignore
        credited_materials_data = self.validated_data.pop('credited_material_set', [])# type: ignore
        miscellaneous_data = self.validated_data.pop('miscellaneous_set', [])# type: ignore
        labor_data = self.validated_data.pop('labor_set', [])# type: ignore

        # Save the PCO instance
        pco_instance = super().save(**kwargs)
        PCO_Log.objects.create(
            pco=pco_instance,
            uthr_name=pco_instance.prpd_by
        )
        # Create or update nested instances
        self._save_nested_data(qualifications_data, Qualification, pco_instance)
        self._save_nested_data(debited_materials_data, Debited_Material, pco_instance)
        self._save_nested_data(credited_materials_data, Credited_Material, pco_instance)
        self._save_nested_data(miscellaneous_data, Miscellaneous, pco_instance)
        self._save_nested_data(labor_data, Labor, pco_instance)

        return pco_instance

    def _save_nested_data(self, data_list, ModelClass, parent_instance):
        for data in data_list:
            ModelClass.objects.create(pco=parent_instance, **data)


class PCO_LogSerializer(serializers.ModelSerializer):
    pco_id=serializers.PrimaryKeyRelatedField(write_only=True,queryset=PCO.objects.all(),source='pco',required=False)
    pco=PCOSerializer(read_only=True)
    class Meta:
        model=PCO_Log
        fields=['id','pco_id','pco','t_m','cor_amont','co_amont','co_num','uthr_name','note']


class Delay_NoticeSerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)# type: ignore

    project_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=Project.objects.all(), source='project', required=False)
    project=ProjectSerializer(read_only=True)
    rfi_log_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=RFI_Log.objects.all(), source='rfi_log',required=False)
    rfi_log=RFI_LogSerializer(read_only=True)
    pco_log_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=PCO_Log.objects.all(), source='pco_log',required=False)
    pco_log=PCO_LogSerializer(read_only=True)
    def to_internal_value(self, data):
        internal_data = super().to_internal_value(data)

        atchd_pdf = data.get('atchd_pdf')
        if atchd_pdf and isinstance(atchd_pdf, InMemoryUploadedFile):
            # Read file content and encode it in base64
            file_content = atchd_pdf.read()
            # Keep it as bytes
            internal_data['atchd_pdf'] = base64.b64encode(file_content)
        elif atchd_pdf and isinstance(atchd_pdf, str):
            # If it's a string, assume it's base64-encoded data
            internal_data['atchd_pdf'] = base64.b64decode(atchd_pdf)
        return internal_data

    
    class Meta:
        model=Delay_Notice
        fields=['id','project_id','delay_num','pco_log_id','pco_log','floor','area','schdul_num','date','rfi_log_id','rfi_log','dscrptn_impct','dscrptn_task','comnt','preprd_by','project','atchd_pdf']
        
        
        
class Delay_LogSerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)# type: ignore
    
    dly_ntc_id=serializers.PrimaryKeyRelatedField(write_only=True,queryset=Delay_Notice.objects.all(),source='dly_ntc',required=False)
    dly_ntc=Delay_NoticeSerializer(read_only=True)
    class Meta:
        model=Delay_Log
        fields=['id','dly_ntc_id','dly_ntc','date','typ','status','dly_rslov','fnl_impct']
        