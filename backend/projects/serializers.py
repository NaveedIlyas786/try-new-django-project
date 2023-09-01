# serializers.py
from rest_framework import serializers
from .models import Company, Project, Project_detail

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ProjectDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project_detail
        fields = '__all__'
  