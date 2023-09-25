# views.py
from rest_framework import generics
from .models import Project, Project_detail
from .serializers import ProjectSerializer, ProjectDetailSerializer
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView



class ProjectListCreateView(APIView):
    def get(self,request):
        project = Project.objects.all()
        serializer = ProjectSerializer(project, many=True)
        return Response(serializer.data)

class ProjectDetailListCreateView(generics.ListCreateAPIView):
    queryset = Project_detail.objects.all()
    serializer_class = ProjectDetailSerializer
