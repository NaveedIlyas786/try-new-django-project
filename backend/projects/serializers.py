# serializers.py
from rest_framework import serializers
from .models import Project, Contract, Schedule_of_Value, Insurance, Bond, Zlien, Submittals, ShopDrawing, Safity, Schedule, Sub_Contractors, LaborRate, Billing, Sov, HDS_system, OnBuild, Buget,Project_detail






class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = '__all__'


class ScheduleOfValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule_of_Value
        fields = '__all__'


class InsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insurance
        fields = '__all__'


class BondSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bond
        fields = '__all__'


class ZlienSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zlien
        fields = '__all__'


class SubmittalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submittals
        fields = '__all__'


class ShopDrawingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopDrawing
        fields = '__all__'


class SafitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Safity
        fields = '__all__'


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'


class SubContractorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sub_Contractors
        fields = '__all__'


class LaborRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = LaborRate
        fields = '__all__'


class BillingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Billing
        fields = '__all__'


class SovSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sov
        fields = '__all__'


class HDSSystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = HDS_system
        fields = '__all__'


class OnBuildSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnBuild
        fields = '__all__'


class BugetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buget
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    contracts = ContractSerializer(source='contract_set', many=True, read_only=True)
    schedule_of_values = ScheduleOfValueSerializer(source='schedule_of_value_set', many=True, read_only=True)
    insurancs = InsuranceSerializer(source='insurance_set', many=True, read_only=True)
    bond = BondSerializer(source='bond_set', many=True, read_only=True)
    zliens = ZlienSerializer(source='zlien_set', many=True, read_only=True)
    submittals = SubmittalsSerializer(source='submittals_set', many=True, read_only=True)
    shopdrawing = ShopDrawingSerializer(source='shopdrawing_set', many=True, read_only=True)
    safity = SafitySerializer(source='safity_set', many=True, read_only=True)
    schedule = ScheduleSerializer(source='schedule_set', many=True, read_only=True)
    sub_contractors = SubContractorsSerializer(source='sub_contractors_set', many=True, read_only=True)
    laborrate = LaborRateSerializer(source='laborrate_set', many=True, read_only=True)
    billing = BillingSerializer(source='billing_set', many=True, read_only=True)
    sov = SovSerializer(source='sov_set', many=True, read_only=True)
    hds_system= HDSSystemSerializer(source='hds_system_set', many=True, read_only=True)
    onbuild = OnBuildSerializer(source='onbuild_set', many=True, read_only=True)
    buget = BugetSerializer(source='buget_set', many=True, read_only=True)
    class Meta:
        model = Project
        fields = ['id','status', 'job_num', 'start_date', 'scope','prjct_engnr','bim_oprtr','Forman','prjct_mngr','estimating','start_date','general_superintendent',
                    'project_address','addendums','bid','Spec','contacts','drywell','finish','wall_type','progress','ro_door','ro_window','substitution',
                    'contracts','schedule_of_values','insurancs','bond','zliens','submittals','shopdrawing','safity','schedule','sub_contractors','laborrate',
                    'billing','sov','hds_system','onbuild','buget'] 

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

