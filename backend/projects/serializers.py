# serializers.py
from os import write
from rest_framework import serializers
from .models import Project, Contract,  Insurance, Bond, Submittals, ShopDrawing,Schedule_of_Value, Safity, Schedule, Sub_Contractors, LaborRate, HDS_system, Buget,Project_detail,Delay_Notice,RFI,PCO

from Estimating.models import Proposal,Spec_detail,GC_detail
from Estimating.serializers import ProposalSerializer,SpecificationDetailSerializer,GC_infoSerializers




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



    def to_representation(self, instance):
        representation = super().to_representation(instance)
        

        try:
            representation['scop_work_number'] = instance.scop_work_number.number if instance.scop_work_number else None
        except (Spec_detail.DoesNotExist, AttributeError) as e:
            representation['scop_work_number'] = None   
            print(e)     

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
            print(e)  
        representation['project'] = instance.project.job_num if instance.project else None


        return representation

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
            print(e)  
        representation['project'] = instance.project.job_num if instance.project else None


        return representation
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
                    'project_address','addendums','contacts','gc_id','gc','gc_address','gc_phone','gc_pm','drywell','finish','wall_type','ro_door','ro_window','substitution',
                    'contracts','schedule_of_values','insurancs','bond','submittals','shopdrawing','safity','schedule','sub_contractors','laborrate',
                    'hds_system','buget','proposal']
        


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for field_name, field in self.fields.items():
            field.required = False
            
    def to_representation(self, instance):


        representation = super().to_representation(instance)
        
        # Handle job_title ManyToMany field
        


        representation['prjct_engnr'] = instance.prjct_engnr.full_Name if instance.prjct_engnr else None
        representation['bim_oprtr'] = instance.bim_oprtr.full_Name if instance.bim_oprtr else None
        representation['Forman'] = instance.Forman.full_Name if instance.Forman else None
        representation['prjct_mngr'] = instance.prjct_mngr.full_Name if instance.prjct_mngr else None
        representation['general_superintendent'] = instance.general_superintendent.full_Name if instance.general_superintendent else None

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

        if 'addendums' in representation:
            representation['addendums'] = representation.pop('addendums')

        if 'addendums' in representation:
            representation['addendums'] = representation.pop('addendums')


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
    
    project_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=Project.objects.all(), source='project', required=False)
    project=ProjectSerializer(read_only=True)
    class Meta:
        model=RFI
        fields=['id','project_id','project','rfi_num','date','attn','company','phne','email','drwng_rfrnc','detl_num','spc_rfrnc','rspns_rqrd','qustn','open_date','close_date','other_trd']



class PCOSerializer(serializers.ModelSerializer):
    project_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=Project.objects.all(), source='project', required=False)
    project=ProjectSerializer(read_only=True)
    class Meta:
        model = PCO
        fields=['id','date','attn','company','email','addrs','zip_city','pco_num','project_id','project','dcrsbsn']

class Delay_NoticeSerializer(serializers.ModelSerializer):
    
    project_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=Project.objects.all(), source='project', required=False)
    project=ProjectSerializer(read_only=True)
    # gnrl_cntrctr_id=serializers.PrimaryKeyRelatedField(write_only=True,queryset=GC_detail.objects.all(),source='gnrl_cntrctr',required=False)
    # gnrl_cntrctr=GC_infoSerializers(read_only=True)
    if_yes_rfi_id=serializers.PrimaryKeyRelatedField(write_only=True, queryset=RFI.objects.all(), source='rfi',required=False)
    if_yes_rfi=RFISerializer(read_only=True)
    
    pco_id=serializers.PrimaryKeyRelatedField(write_only=True,queryset=PCO.objects.all(),source='pco',required=False)
    pco=PCOSerializer(read_only=True)
    
    

    
    class Meta:
        model=Delay_Notice
        fields=['id','project_id','delay_num','floor','area','schdul_num','date','Asocatd_rfi','if_yes_rfi_id','if_yes_rfi','dscrptn_impct','dscrptn_task','comnt','preprd_by','project','pco_id','pco']