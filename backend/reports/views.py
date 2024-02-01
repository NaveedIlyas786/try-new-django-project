from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import WageRateTitle,WageRate
from .serializers import WageRateTitleSerializer,WageRateDetailSerializer


class WageRateTitleView(APIView):
    def get(self, request):
        wageRateTitles = WageRateTitle.objects.all()
        serializer = WageRateTitleSerializer(wageRateTitles, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = WageRateTitleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        wageRateTitle = WageRateTitle.objects.get(pk=pk)
        serializer = WageRateTitleSerializer(wageRateTitle, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        wageRateTitle = WageRateTitle.objects.get(pk=pk)
        wageRateTitle.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    


class WageRateView(APIView):
    def get(self, request):
        wageRates = WageRate.objects.all()
        serializer = WageRateDetailSerializer(wageRates, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = WageRateDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        wageRate = WageRate.objects.get(pk=pk)
        serializer = WageRateDetailSerializer(wageRate, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        wageRate = WageRate.objects.get(pk=pk)
        wageRate.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)