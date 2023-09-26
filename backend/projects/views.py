# views.py
from rest_framework import generics
from rest_framework import viewsets

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

    def post(self, request, format=None):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectDetailListCreateView(APIView):
    def get(self,request):
        top_level_details = Project_detail.objects.filter(prnt_id__isnull=True)
        serializer = ProjectDetailSerializer(top_level_details, many=True)
        return Response(serializer.data)
    
# class ProjectDetailListCreateView(viewsets.ReadOnlyModelViewSet):
#     queryset = Project_detail.objects.filter(prnt_id__isnull=True)  # This fetches top-level directories
#     serializer_class = ProjectDetailSerializer
