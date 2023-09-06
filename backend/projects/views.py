# views.py
from rest_framework import generics
from .models import Company, Project, Project_detail
from .serializers import CompanySerializer, ProjectSerializer, ProjectDetailSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db import models


class CompanyListCreateView(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProjectDetailListCreateView(generics.ListCreateAPIView):
    queryset = Project_detail.objects.all()
    serializer_class = ProjectDetailSerializer

@api_view(['GET'])
def get_matching_id(request):
    """
    Fetch Project_detail instances where id matches the prnt_ID.
    """
    matching_details = [detail for detail in Project_detail.objects.all() if detail.id == detail.prnt_ID]
    print(matching_details)
    serializer = ProjectDetailSerializer(matching_details, many=True)
    return Response(serializer.data)

