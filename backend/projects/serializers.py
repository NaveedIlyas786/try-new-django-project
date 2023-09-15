# serializers.py
from rest_framework import serializers
from .models import Company, Project, Project_detail






class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id','Cmpny_Name','adress','office_phone_number','fax_number','license_number','logo','email']





class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id',' company','prjct_Name']




        

class ProjectDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project_detail
        fields = ['id','drctry_Name','prjct_ID','prnt_ID','file_Name','output_Table_Name']
  