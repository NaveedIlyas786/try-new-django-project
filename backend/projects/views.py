# views.py
from rest_framework import generics
from .models import Company, Project, Project_detail
from .serializers import CompanySerializer, ProjectSerializer, ProjectDetailSerializer
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView


from django.db import models


class CompanyListView(APIView):


    def get(self, request, format=None):
        Cmpany = Company.objects.all()
        serializer = CompanySerializer(Cmpany, many=True)
        return Response(serializer.data)


    def post(self, request, format=None):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, format=None):
        try:
            Cmpany = Company.objects.get(id=id)
        except Company.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = CompanySerializer(Cmpany, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        try:
            Cmpany = Company.objects.get(id=id)
        except Company.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        Cmpany.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProjectDetailListCreateView(generics.ListCreateAPIView):
    queryset = Project_detail.objects.all()
    serializer_class = ProjectDetailSerializer

# @api_view(['GET'])
# def get_matching_id(request):
#     """
#     Fetch Project_detail instances where id matches the prnt_ID.
#     """
#     matching_details = [detail for detail in Project_detail.objects.all() if detail.id == detail.prnt_ID]
#     print(matching_details)
#     serializer = ProjectDetailSerializer(matching_details, many=True)
#     return Response(serializer.data)

