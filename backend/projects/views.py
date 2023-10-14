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


class ProjectListCreateView(APIView):
    def get(self,request):
        project = Project.objects.all()
        serializer = ProjectSerializer(project, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, id, format=None):
        try:
            project = Project.objects.get(id=id)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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
        data = request.data

        project_serializer = ProjectSerializer(data=data['project'])
        if project_serializer.is_valid():
            project = project_serializer.save()
        else:
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

        for key, model, serializer_class in related_data_models:
            related_data = data.get(key)
            if related_data:
                related_data['project'] = project.id
                serializer = serializer_class(data=related_data)
                if serializer.is_valid():
                    serializer.save()
                else:
                    return Response({key: serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({key: "This field is required"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Project and related data created successfully"}, status=status.HTTP_201_CREATED)