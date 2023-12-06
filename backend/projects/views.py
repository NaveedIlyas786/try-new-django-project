# views.py
from rest_framework import generics
from rest_framework import viewsets

from .models import Project, Project_detail
from .serializers import ProjectSerializer, ProjectDetailSerializer
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView


from rest_framework.decorators import api_view
from .models import Project, Contract, Insurance, Bond,  Submittals, ShopDrawing, Safity, Schedule, Sub_Contractors, LaborRate,  HDS_system, Buget
from .serializers import (ProjectSerializer, ContractSerializer,  InsuranceSerializer, BondSerializer,
                           SubmittalsSerializer, ShopDrawingSerializer, SafitySerializer, ScheduleSerializer,
                          SubContractorsSerializer, LaborRateSerializer,HDSSystemSerializer,
                          BugetSerializer)


class ProjectDetailListCreateView(APIView):
    def get(self, request):
        top_level_details = Project_detail.objects.filter(prnt_id__isnull=True)
        serializer = ProjectDetailSerializer(top_level_details, many=True)
        return Response(serializer.data)

# class ProjectDetailListCreateView(viewsets.ReadOnlyModelViewSet):
#     queryset = Project_detail.objects.filter(prnt_id__isnull=True)  # This fetches top-level directories
#     serializer_class = ProjectDetailSerializer


@api_view(['GET', 'POST','PUT'])
def create_project(request, id=None):

    related_data_models = [
            ('contract', Contract, ContractSerializer),
            # ('schedule_of_value', Schedule_of_Value, ScheduleOfValueSerializer),
            ('insurance', Insurance, InsuranceSerializer),
            ('bond', Bond, BondSerializer),
            # ('zlien', Zlien, ZlienSerializer),
            ('submittals', Submittals, SubmittalsSerializer),
            ('shop_drawing', ShopDrawing, ShopDrawingSerializer),
            ('safity', Safity, SafitySerializer),
            ('schedule', Schedule, ScheduleSerializer),
            ('sub_contractors', Sub_Contractors, SubContractorsSerializer),
            ('labor_rate', LaborRate, LaborRateSerializer),
            # ('billing', Billing, BillingSerializer),
            # ('sov', Sov, SovSerializer),
            ('hds_system', HDS_system, HDSSystemSerializer),
            # ('on_build', OnBuild, OnBuildSerializer),
            ('buget', Buget, BugetSerializer),
        ]



    if request.method == 'GET':
        if id:
            try:
                project = Project.objects.get(id=id)
                serializer = ProjectSerializer(project)
            except Project.DoesNotExist:
                return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            projects = Project.objects.all()
            serializer = ProjectSerializer(projects, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':

        data = request.data
        if isinstance(data, list):
            data = data[0]
        project_serializer = ProjectSerializer(
            data=data)  # And this line has been changed
        if not project_serializer.is_valid():
            return Response(project_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        related_data_models = [
            ('contract', Contract, ContractSerializer),
            # ('schedule_of_value', Schedule_of_Value, ScheduleOfValueSerializer),
            ('insurance', Insurance, InsuranceSerializer),
            ('bond', Bond, BondSerializer),
            # ('zlien', Zlien, ZlienSerializer),
            ('submittals', Submittals, SubmittalsSerializer),
            ('shop_drawing', ShopDrawing, ShopDrawingSerializer),
            ('safity', Safity, SafitySerializer),
            ('schedule', Schedule, ScheduleSerializer),
            ('sub_contractors', Sub_Contractors, SubContractorsSerializer),
            ('labor_rate', LaborRate, LaborRateSerializer),
            # ('billing', Billing, BillingSerializer),
            # ('sov', Sov, SovSerializer),
            ('hds_system', HDS_system, HDSSystemSerializer),
            #  
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




    if request.method == 'PUT':
    # Retrieve the project instance
        data = request.data
        if isinstance(data, list):
            data = data[0]
        project_id = id 

        if not project_id:
            return Response({"error": "Project id is required for update"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)

        project_serializer = ProjectSerializer(project, data=data)
        if not project_serializer.is_valid():
            return Response(project_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        related_serializers = []
        for key, model, serializer_class in related_data_models:
            related_data_list = data.get(key)
            if related_data_list:
            # Delete previous related records and create new ones (assuming a simple replacement strategy)
                model.objects.filter(project=project).delete()

                for related_data in related_data_list:
                    serializer = serializer_class(data=related_data)
                    if not serializer.is_valid():
                     return Response({key: serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                    related_serializers.append(serializer)
            else:
                return Response({key: "This field is required"}, status=status.HTTP_400_BAD_REQUEST)

        project_serializer.save()

    # Now save all related data with the project id
        for serializer in related_serializers:
            serializer.validated_data['project'] = project
            serializer.save()
        return Response({"message": "Project and related data updated successfully"}, status=status.HTTP_200_OK)

