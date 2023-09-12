# serializers.py in the "Estimating" app

from rest_framework import serializers
from .models import Estimating,Proposals


from datetime import datetime



class EstimatingSerializer(serializers.ModelSerializer):
    due_date = serializers.DateField(format='%Y-%m-%d', input_formats=['%Y-%m-%d', 'iso-8601'])

    class Meta:
        model = Estimating
        fields = ['id',
            'Prjct_Name', 
            'due_date', 
            'status', 
            'start_date', 
            'bid_amount', 
        ]
        extra_kwargs = {
            'Prjct_Name': {'required': True},
            'status': {'required': True},
            'start_date': {'required': True},
            'company': {'required': True},
            'bid_amount': {'required': True},
            'location': {'required': True},
            'estimator': {'required': True},
            'bidder': {'required': True},
            'due_date':{'required':True},
        }

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        # Updating representation to include names instead of IDs for foreign keys
        representation['company'] = instance.company.Cmpny_Name if instance.company else None
        representation['location'] = instance.location.name if instance.location else None
        representation['estimator'] = instance.estimator.full_Name if instance.estimator else None
        representation['bidder'] = instance.bidder.full_Name if instance.bidder else None

        # Formatting date fields
        representation['due_date'] = self.format_date(instance.due_date)
        representation['start_date'] = self.format_date(instance.start_date)

        return representation

    def format_date(self, value):
        if isinstance(value, datetime):
            return value.date()
        return value




class ProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model=Proposals
        fields = ['id',
            'date', 
            'architect_name', 
            'architect_firm',
            'company',
            'estimator',
            'estimating'
        ]
        extra_kwargs = {
            'architect_name': {'required': True},
            'architect_firm': {'required': True},
            'date': {'required': True},
            'company': {'required': True},
            'estimator': {'required': True},
            'estimating':{'required':True}
        }
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        # Updating representation to include names instead of IDs for foreign keys
        representation['company'] = instance.company.Cmpny_Name if instance.company else None
        representation['estimator'] = instance.estimator.full_Name if instance.estimator else None
        representation['estimating'] = instance.estimating.Prjct_Name if instance.estimating else None

        return representation       
