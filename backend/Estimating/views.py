# views.py in the "Estimating" app

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Estimating,Proposals
from .serializers import EstimatingSerializer,ProposalSerializer


class EstimatingListView(APIView):

    def get(self, request, id=None, format=None):
        if id:
            try:
                estimating = Estimating.objects.get(id=id)
                serializer = EstimatingSerializer(estimating)
                return Response(serializer.data)
            except Estimating.DoesNotExist:
                return Response({'error': 'Estimating not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            estimatings = Estimating.objects.all()
            serializer = EstimatingSerializer(estimatings, many=True)
            return Response(serializer.data)
    


    def post(self, request, format=None):
        serializer = EstimatingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self, request, pk, format=None):
        try:
            estimating = Estimating.objects.get(pk=pk)
        except Estimating.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        estimating.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    


    def put(self, request, pk, format=None):
        try:
            estimating = Estimating.objects.get(pk=pk)
        except Estimating.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = EstimatingSerializer(estimating, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class ProposalView(APIView):


    def get(self,request,format=None):
        Proposal = Proposals.objects.all()
        serializer = ProposalSerializer(Proposal, many=True)
        return Response(serializer.data)
    

    def post(self, request, format=None):
        serializer = ProposalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def put(self, request, pk, format=None):
        try:
            proposal = Proposals.objects.get(pk=pk)
        except Proposals.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProposalSerializer(proposal, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        try:
            proposal = Proposals.objects.get(pk=pk)
        except Proposals.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
            
        proposal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)