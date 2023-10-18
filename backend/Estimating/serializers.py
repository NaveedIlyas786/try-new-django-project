# serializers.py in the "Estimating" app

from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status

from Estimating.models import Company,Estimating, Estimating_detail, Proposal, Addendum, Qualification, Spec_detail, Specification, ProposalService, Service, Location,UrlsTable,DMS_Dertory,Dprtmnt,Role






class DMS_DertorySezializers(serializers.ModelSerializer):
    class Meta:
        model = DMS_Dertory
        fields = ['id', 'full_Name', 'email', 'job_title', 'company', 'department', 'direct_number', 'locaton', 'mobile_number']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        # Handle job_title ManyToMany field
        job_titles = instance.job_title.all()
        representation['job_title'] = [job.name for job in job_titles] if job_titles else None
        
        representation['company'] = instance.company.Cmpny_Name if instance.company else None
        representation['department'] = instance.department.dprtmnt_name if instance.department else None

        return representation


class UrlsSerializers(serializers.ModelSerializer):
    class Meta:
        model=UrlsTable
        fields=['id','url','territory','web_name','ps']




class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id','is_active','Cmpny_Name','adress','office_phone_number','fax_number','license_number','logo','email']






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
        representation['Estimating'] = instance.Estimating.prjct_name if instance.Estimating else None
        return representation

class Time12HourField(serializers.TimeField):
    format = "%I:%M %p"

    def to_representation(self, value):
        return value.strftime(self.format)

    
class EstimatingSerializer(serializers.ModelSerializer):

    time = Time12HourField(format='%I:%M %p', input_formats=['%I:%M %p'], required=False, allow_null=True)

    due_date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)
 
    start_date = serializers.DateField(
        format='%m-%d-%Y', input_formats=['%m-%d-%Y', 'iso-8601'], required=False, allow_null=True)
    company=CompanySerializer(read_only=True)

    class Meta:
        model = Estimating
        fields = [
            'id',
            'prjct_name',
            'due_date',
            'time',
            'timezone',
            'status',
            'start_date',
            'bid_amount',
            'company',
            'location',
            'estimator',
            'bidder',
            'bidder_mail',
            'bidder_address',
            'link',
        ]



    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Updating representation to include names instead of IDs for foreign keys
        # representation['company'] = instance.company.Cmpny_Name if instance.company else None
        representation['location'] = instance.location.name if instance.location else None
        representation['estimator'] = instance.estimator.full_Name if instance.estimator else None




        return representation





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
        fields = ['id','name']





class AddendumSerializer(serializers.ModelSerializer):

    class Meta:
        model = Addendum
        fields = ['id', 'proposal', 'date', 'addendum_Number']





class ProposalServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProposalService
        fields = ['proposal', 'service', 'service_type']
    
    
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)


        representation['service'] = instance.service.name if instance.service else None


        return representation




class ProposalSerializer(serializers.ModelSerializer):
    services = ProposalServiceSerializer(many=True, read_only=True)
    Addendums=AddendumSerializer(many=True,read_only=True)
    spcifc=SpecificationSerializer(many=True,read_only=True)
    estimating=EstimatingSerializer(read_only=True)
    
    class Meta:
        model = Proposal
        fields = ['id','estimating', 'date', 'architect_name', 'architect_firm','Addendums', 'services','spcifc'] 

    def to_representation(self, instance):
        representation = super().to_representation(instance)


        representation['estimating'] = instance.estimating.prjct_name if instance.estimating else None


        return representation
