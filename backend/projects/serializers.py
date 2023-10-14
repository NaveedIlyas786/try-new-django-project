# serializers.py
from rest_framework import serializers
from .models import Project, Contract, Schedule_of_Value, Insurance, Bond, Zlien, Submittals, ShopDrawing, Safity, Schedule, Sub_Contractors, LaborRate, Billing, Sov, HDS_system, OnBuild, Buget,Project_detail



class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


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

