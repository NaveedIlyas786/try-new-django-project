# serializers.py in the "Estimating" app

from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status

from Estimating.models import Company,Estimating, Estimating_detail, Proposal, Addendum, Qualification, Spec_detail, Specification, ProposalService, Service, Location


from datetime import datetime





class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id','Cmpny_Name','adress','office_phone_number','fax_number','license_number','logo','email']






class RecursiveEstimatingDetailSerializer(serializers.Serializer):
    """Serializer for recursive Estimating_detail children."""
    def to_representation(self, value):
        serializer = EstimatingDetailSerializer(value, context=self.context)
        return serializer.data





class EstimatingDetailSerializer(serializers.ModelSerializer):
    children = RecursiveEstimatingDetailSerializer(many=True,read_only=True)

    class Meta:
        model = Estimating_detail
        fields = ['id', 'Estimating', 'prnt', 'drctry_name', 'file_type', 'file_name', 'children']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['Estimating'] = instance.Estimating.Prjct_Name if instance.Estimating else None
        return representation



    
class EstimatingSerializer(serializers.ModelSerializer):
    due_date = serializers.DateField(
        format='%Y-%m-%d', input_formats=['%Y-%m-%d', 'iso-8601'])

    class Meta:
        model = Estimating
        fields = [
            'id',
            'Prjct_Name',
            'due_date',
            'status',
            'start_date',
            'bid_amount',
            'company',
            'location',
            'estimator',
            'bidder',
        ]
        extra_kwargs = {
            'Prjct_Name': {'required': True},
            'company': {'required': True},
            'bid_amount': {'required': True},
            'location': {'required': True},
            'estimator': {'required': True},
            'bidder': {'required': True},
            'due_date': {'required': True},
        }



    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Updating representation to include names instead of IDs for foreign keys
        representation['company'] = instance.company.Cmpny_Name if instance.company else None
        representation['location'] = instance.location.name if instance.location else None
        representation['estimator'] = instance.estimator.full_Name if instance.estimator else None

        # Formatting date fields
        representation['due_date'] = self.format_date(instance.due_date)
        representation['start_date'] = self.format_date(instance.start_date)

        return representation



    def format_date(self, value):
        if isinstance(value, datetime):
            return value.date()
        return value





# Estimating Folder Derectory





class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name']




class QualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Qualification
        fields = ['id', 'detail']












class SpecificationDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spec_detail
        fields = ['id', 'sefic', 'number', 'name']

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Updating representation to include names instead of IDs for foreign keys
        representation['sefic'] = instance.sefic.specific_name if instance.sefic else None

        return representation
    




class SpecificationSerializer(serializers.ModelSerializer):
    sefic=SpecificationDetailSerializer(many=True,read_only=True)
    class Meta:
        model = Specification
        fields = ['id', 'proposal', 'budget', 'specific_name','sefic']






class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'





class AddendumSerializer(serializers.ModelSerializer):

    class Meta:
        model = Addendum
        fields = ['id', 'proposal', 'date', 'addendum_Number']





class ProposalServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProposalService
        fields = ['proposal', 'service', 'service_type']





class ProposalSerializer(serializers.ModelSerializer):
    services = ProposalServiceSerializer(many=True, read_only=True)
    Addendums=AddendumSerializer(many=True,read_only=True)
    spcifc=SpecificationSerializer(many=True,read_only=True)

    
    class Meta:
        model = Proposal
        fields = ['id','estimating', 'date', 'architect_name', 'architect_firm','Addendums', 'services','spcifc'] 