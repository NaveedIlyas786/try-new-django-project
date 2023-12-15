# views.py
from rest_framework import generics
from rest_framework import viewsets
from yaml import serialize


from .models import Project, Project_detail
from .serializers import ProjectSerializer, ProjectDetailSerializer
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView


from rest_framework.decorators import api_view
from .models import Project, Contract, Insurance, Bond,  Submittals, ShopDrawing, Safity, Schedule, Sub_Contractors, LaborRate,  HDS_system, Buget,Delay_Notice,RFI,PCO
from .serializers import (ProjectSerializer, ContractSerializer,  InsuranceSerializer, BondSerializer,
                           SubmittalsSerializer, ShopDrawingSerializer, SafitySerializer, ScheduleSerializer,
                          SubContractorsSerializer, LaborRateSerializer,HDSSystemSerializer,
                          BugetSerializer,Delay_NoticeSerializer,RFISerializer,PCOSerializer)


class ProjectDetailListCreateView(APIView):
    def get(self, request, prjct_id):
        # Filter details based on the prjct_id
        project_details = Project_detail.objects.filter(prjct_id=prjct_id ,prnt_id__isnull=True)

        # Serialize the data
        serializer = ProjectDetailSerializer(project_details, many=True)

        # Return the serialized data
        return Response(serializer.data)

    # def get(self,request,id=None,format=None):
    #     if id:
    #         try:
    #             if(project)
    #         except:
    #             pass
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
        project_serializer = ProjectSerializer(data=data)
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
            # ('on_build', OnBuild, OnBuildSerializer),
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

class RFIViews(APIView):
    def get(self, request, id=None):
        if id:
            try:
                rfi=RFI.objects.get(id=id)
            except RFI.DoesNotExist:
                return Response (status=status.HTTP_404_NOT_FOUND)
            serializer=RFISerializer(rfi)
        else:
            rfi=RFI.objects.all()
            serializer=RFISerializer(rfi,many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = RFISerializer(data=request.data)
        if serializer.is_valid():
            # Provide a valid project_id here
            project_id = request.data.get('project_id')
            if project_id:
                project = Project.objects.get(id=project_id)
                serializer.save(project=project)  # Fix the typo here
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "project_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PCOViews(APIView):
    def get(self, request, id=None, format=None):
        if id:
            try:
                pco=PCO.objects.get(id=id)
                # serializer=PCOSerializer(pco)
                # return Response(serializer.data)
            except PCO.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            serializer=PCOSerializer(pco)
            
        else:
            pco=PCO.objects.all() 
            serializer=PCOSerializer(pco,many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer=PCOSerializer(data=request.data)
        if serializer.is_valid():
            project_id = request.data.get('project_id')
            if project_id:
                project = Project.objects.get(id=project_id)
                serializer.save(project=project)  # Fix the typo here
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "project_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        



class Delay_NoticeViews(APIView):
    def get(self, request,id=None):
        if id:
            try:
                delay_notice=Delay_Notice.objects.get(id=id)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
            serialize=Delay_NoticeSerializer(delay_notice)
        else:
            delay_notice=Delay_Notice.objects.all()
            serialize=Delay_NoticeSerializer(delay_notice,many=True)
            
        return Response(serialize.data)
    
    def post(self,request):
        serialize=Delay_NoticeSerializer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data,status=status.HTTP_201_CREATED)
        return Response(serialize.data,status=status.HTTP_400_BAD_REQUEST)
    
