# serializers.py in the "Estimating" app

from rest_framework import serializers


from .models import Estimating,Estimating_detail, Proposals,Addendum,Qualification,Spec_detail,Specification,PropsalsServices,Service,Location


from datetime import datetime






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
class EstimatingDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=Estimating_detail
        fields=['id','Estimating','prnt_id','drctry_name','file_type','output_Table_Name']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['Estimating']=instance.Estimating.Prjct_Name if instance.Estimating else None
        return representation







class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Location
        fields=['id','name']







class ProposalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Proposals
        fields = ['id',
                  'date',
                  'architect_name',
                  'architect_firm',
                  'estimating'
                  ]
        extra_kwargs = {
            'architect_name': {'required': True},
            'architect_firm': {'required': True},
            'date': {'required': True},
            'estimating': {'required': True}
        }

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['estimating'] = instance.estimating.Prjct_Name if instance.estimating else None

        return representation
    






class AddendumSerializer(serializers.ModelSerializer):

    class Meta:
        model=Addendum
        fields=['id','proposal','date','addendum_Number']








class QualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Qualification
        fields=['id','detail']







class SpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Specification
        fields=['id','proposal','budget','specific_name']








class SpecificationDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=Spec_detail
        fields=['id','sefic','number','name']
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Updating representation to include names instead of IDs for foreign keys
        representation['sefic'] = instance.sefic.specific_name if instance.sefic else None


        return representation
    







class ServicesSerializer(serializers.ModelSerializer):

    class Meta:
        model=Service
        fields=['id','services']








class ProposalServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model=PropsalsServices
        fields=['id','propsals','service','serviceTyp']


    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Updating representation to include names instead of IDs for foreign keys
        representation['service'] = instance.service.services if instance.service else None


        return representation