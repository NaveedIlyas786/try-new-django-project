# views.py
from rest_framework import generics
from rest_framework import viewsets

from .models import Project, Project_detail
from .serializers import ProjectSerializer, ProjectDetailSerializer
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView


from rest_framework.decorators import api_view
from .models import Project, Contract, Schedule_of_Value, Insurance, Bond, Zlien, Submittals, ShopDrawing, Safity, Schedule, Sub_Contractors, LaborRate, Billing, Sov, HDS_system, OnBuild, Buget
from .serializers import (ProjectSerializer, ContractSerializer, ScheduleOfValueSerializer, InsuranceSerializer, BondSerializer, 
ZlienSerializer, SubmittalsSerializer, ShopDrawingSerializer, SafitySerializer, ScheduleSerializer, 
SubContractorsSerializer, LaborRateSerializer, BillingSerializer, SovSerializer, HDSSystemSerializer, 
OnBuildSerializer, BugetSerializer) 


class ProjectDetailListCreateView(APIView):
    def get(self,request):
        top_level_details = Project_detail.objects.filter(prnt_id__isnull=True)
        serializer = ProjectDetailSerializer(top_level_details, many=True)
        return Response(serializer.data)
    
# class ProjectDetailListCreateView(viewsets.ReadOnlyModelViewSet):
#     queryset = Project_detail.objects.filter(prnt_id__isnull=True)  # This fetches top-level directories
#     serializer_class = ProjectDetailSerializer




@api_view(['GET','POST'])
def create_project(request):
    if request.method == 'GET':
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


    
    if request.method == 'POST':
        data = request.data[0] 
        project_serializer = ProjectSerializer(data=data)  # And this line has been changed
        if not project_serializer.is_valid():
            return Response(project_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        related_data_models = [
            ('contract', Contract, ContractSerializer),
            ('schedule_of_value', Schedule_of_Value, ScheduleOfValueSerializer),
            ('insurance', Insurance, InsuranceSerializer),
            ('bond', Bond, BondSerializer),
            ('zlien', Zlien, ZlienSerializer),
            ('submittals', Submittals, SubmittalsSerializer),
            ('shop_drawing', ShopDrawing, ShopDrawingSerializer),
            ('safity', Safity, SafitySerializer),
            ('schedule', Schedule, ScheduleSerializer),
            ('sub_contractors', Sub_Contractors, SubContractorsSerializer),
            ('labor_rate', LaborRate, LaborRateSerializer),
            ('billing', Billing, BillingSerializer),
            ('sov', Sov, SovSerializer),
            ('hds_system', HDS_system, HDSSystemSerializer),
            ('on_build', OnBuild, OnBuildSerializer),
            ('buget', Buget, BugetSerializer),
        ]
        related_serializers = []        
        for key, model, serializer_class in related_data_models:
            related_data_list = data.get(key)
            if related_data_list:
                for related_data in related_data_list:
                    serializer = serializer_class(data=related_data)
                    if not serializer.is_valid():
                        return Response({key: serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                    related_serializers.append(serializer)
            else:
                return Response({key: "This field is required"}, status=status.HTTP_400_BAD_REQUEST)


        project = project_serializer.save()

        # Now save all related data with the project id
        for serializer in related_serializers:
            serializer.validated_data['project'] = project
            serializer.save()
        return Response({"message": "Project and related data created successfully"}, status=status.HTTP_201_CREATED)