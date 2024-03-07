from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import WageRateDetail
from .serializers import WageRateSerializer
from rest_framework.decorators import api_view

class WageRateView(APIView):
    
    def get(self, request, id=None):
        if id:
            try:
                wagerate = WageRateDetail.objects.get(id=id)
                serializer = WageRateSerializer(wagerate)
            except WageRateDetail.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            wagerate = WageRateDetail.objects.all()
            serializer = WageRateSerializer(wagerate, many=True)

        return Response(serializer.data)
    def post(self, request):
        if isinstance(request.data, list):  # Check if the request data is a list
            serializer = WageRateSerializer(data=request.data, many=True)  # Set 'many=True' to allow multiple objects
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = WageRateSerializer(data=request.data)  # Original line for single object
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    def put(self, request, id=None, format=None):
        if isinstance(request.data, list):  # Handling bulk updates
            responses = []
            for item in request.data:
                item_id = item.get('id')
                if item_id:
                    try:
                        wagerate = WageRateDetail.objects.get(id=item_id)
                    except WageRateDetail.DoesNotExist:
                        responses.append({'id': item_id, 'error': 'Not found'})
                        continue

                    serializer = WageRateSerializer(wagerate, data=item, partial=True)  # Allow partial updates
                    if serializer.is_valid():
                        serializer.save()
                        responses.append(serializer.data)
                    else:
                        responses.append({'id': item_id, 'error': serializer.errors})
                else:
                    responses.append({'error': 'Missing id in item'})

            return Response(responses, status=status.HTTP_200_OK)
        else:
            try:
                wagerate = WageRateDetail.objects.get(id=id)
            except WageRateDetail.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            serializer = WageRateSerializer(wagerate, data=request.data, partial=True)  # Allow partial updates
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
    def delete(self, request, id, format=None):
        try:
            wagerate = WageRateDetail.objects.get(id=id)  # Change the variable name
        except WageRateDetail.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        wagerate.delete()  # Use the new variable name
        return Response(status=status.HTTP_204_NO_CONTENT)
