# serializers.py in the "Estimating" app

from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status

from Estimating.models import Estimating, Estimating_detail, Proposal, Addendum, Qualification, Spec_detail, Specification, ProposalService, Service, Location


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
        model = Estimating_detail
        fields = ['id', 'Estimating', 'prnt_id',
                  'drctry_name', 'file_type', 'output_Table_Name']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['Estimating'] = instance.Estimating.Prjct_Name if instance.Estimating else None
        return representation


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name']




class QualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Qualification
        fields = ['id', 'detail']









class SpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specification
        fields = ['id', 'proposal', 'budget', 'specific_name']


class SpecificationDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spec_detail
        fields = ['id', 'sefic', 'number', 'name']

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Updating representation to include names instead of IDs for foreign keys
        representation['sefic'] = instance.sefic.specific_name if instance.sefic else None

        return representation










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
    
    class Meta:
        model = Proposal
        fields = ['id','estimating', 'date', 'architect_name', 'architect_firm','Addendums', 'services'] 







# class ProposalServiceSerializer(serializers.ModelSerializer):
#     service = ServiceSerializer()

#     class Meta:
#         model = ProposalService
#         fields = '__all__'


# class ProposalSerializer(serializers.ModelSerializer):
#     services = ProposalServiceSerializer(many=True, required=False)

#     class Meta:
#         model = Proposal
#         fields = '__all__'


#     def create_proposal(request):
#         if request.method == 'POST':
#             data = request.data

#         # Fetching the estimating instance or handling the error if it does not exist
#             try:
#                 estimating_instance = Estimating.objects.get(
#                     id=data['estimating_id'])
#             except Estimating.DoesNotExist:
#                 return Response({"error": "Estimating instance not found"}, status=status.HTTP_400_BAD_REQUEST)

#         # Creating a new proposal
#             proposal = Proposal.objects.create(
#                 estimating=estimating_instance,
#                 date=data['date'],
#                 architect_name=data['architect_name'],
#                 architect_firm=data['architect_firm']
#             )

#         # Creating the ProposalService instances
#             for service_data in data['services']:
#                 try:
#                     service = Service.objects.get(id=service_data['service_id'])
#                     ProposalService.objects.create(
#                         proposal=proposal, service=service, type=service_data['type'])
#                 except Service.DoesNotExist:
#                     return Response({"error": f"Service with id {service_data['service_id']} not found"}, status=status.HTTP_400_BAD_REQUEST)

#             return Response({"message": "Proposal created successfully"}, status=status.HTTP_201_CREATED)


# class ServiceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Service
#         fields = ['id','name', 'type']


# class ProposalServiceSerializer(serializers.ModelSerializer):
#     service = ServiceSerializer(read_only=True)
#     edited_type = serializers.CharField()

#     class Meta:
#         model = ProposalService
#         fields = ['service', 'type', 'edited_type', 'proposal']


# class ProposalSerializer(serializers.ModelSerializer):

#     # services = ProposalServiceSerializer(many=True)

#     # class Meta:
#     #     model = Proposals
#     #     fields = ['id','estimating', 'date', 'architect_name', 'architect_firm', 'services']

#     #     extra_kwargs = {
#     #         'architect_name': {'required': True},
#     #         'architect_firm': {'required': True},
#     #         'date': {'required': True},
#     #         'estimating': {'required': True}
#     #     }

#     service = ServiceSerializer()

#     class Meta:
#         model = ProposalService
#         fields = ['service', 'id','estimating', 'date', 'architect_name', 'architect_firm']

#     def create(self, validated_data):
#         service_data = validated_data.pop('service')
#         service, created = Service.objects.get_or_create(**service_data)
#         proposal_service = ProposalService.objects.create(service=service, **validated_data)
#         return proposal_service


#     # ... (rest of the serializer)


#     def to_representation(self, instance):
#         representation = super().to_representation(instance)
#         representation['estimating'] = instance.estimating.Prjct_Name if instance.estimating else None

#         return representation
