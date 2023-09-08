# views.py in the "Estimating" app

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Estimating
from .serializers import EstimatingSerializer


class EstimatingListView(APIView):
    """
    List all estimating records, or create a new estimating record.
    """
    def get(self, request, format=None):
        estimatings = Estimating.objects.all()
        serializer = EstimatingSerializer(estimatings, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = EstimatingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
