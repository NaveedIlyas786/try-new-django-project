# views.py in the "Estimating" app

from django.shortcuts import render
from rest_framework.decorators import api_view

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Estimating,Estimating_detail, Proposal, Addendum, Qualification, Spec_detail, ProposalService,Specification,Service,Location
from .serializers import EstimatingSerializer, ProposalSerializer, AddendumSerializer, QualificationSerializer, SpecificationDetailSerializer,SpecificationSerializer,ServiceSerializer,LocationSerializer,EstimatingDetailSerializer,ProposalServiceSerializer







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

    def delete(self, request, id, format=None):
        try:
            estimating = Estimating.objects.get(id=id)
        except Estimating.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        estimating.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, id, format=None):
        try:
            estimating = Estimating.objects.get(id=id)
        except Estimating.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = EstimatingSerializer(estimating, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






class Estimating_detailView(APIView):
    def get(self,request):
        estimating_detail=Estimating_detail.objects.all()
        serializer=EstimatingDetailSerializer(estimating_detail,many=True)
        return Response(serializer.data)







# class ProposalView(APIView):

#     def get(self, request, format=None):
#         Proposal = Proposals.objects.all()
#         serializer = ProposalSerializer(Proposal, many=True)
#         return Response(serializer.data)

#     def post(self, request, format=None):
#         serializer = ProposalSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()

#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, id, format=None):
#         try:
#             proposal = Proposals.objects.get(id=id)
#         except Proposals.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         serializer = ProposalSerializer(proposal, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, id, format=None):
#         try:
#             proposal = Proposals.objects.get(id=id)
#         except Proposals.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         proposal.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)








class QualificationView(APIView):


    def get(self, request, format=None):
        qualification = Qualification.objects.all()
        serializer = QualificationSerializer(qualification, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = QualificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(sef, request, id, format=None):
        try:
            qualification = Qualification.objects.get(id=id)
        except Qualification.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = QualificationSerializer(qualification, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        try:
            qualification = Qualification.objects.get(id=id)
        except Qualification.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        qualification.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)









class AddendumView(APIView):
    def get(self, request, format=None):
        Addendums = Addendum.objects.all()
        serializer = AddendumSerializer(Addendums, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AddendumSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, format=None):
        try:
            Addendums = Addendum.objects.get(id=id)
        except Addendum.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = AddendumSerializer(Addendums, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        try:
            Addendums = Addendum.objects.get(id=id)
        except Addendum.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        Addendums.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    








class LocationViews(APIView):
    def get(self,request):
        location=Location.objects.all()
        serializer=LocationSerializer(location,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer=LocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def put(self,request):
        try:
            location=Location.objects.get(id=id)
        except Location.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer=LocationSerializer(location,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def delete(self,request):
        try:
            location = Location.objects.get(id=id)
        except Location.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        location.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)










class SpecificationViews(APIView):

    def get(self, request, format=None):
        specification = Specification.objects.all()
        serializer = SpecificationSerializer(specification, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = SpecificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, format=None):
        try:
            specification = Specification.objects.get(id=id)
        except Specification.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = SpecificationSerializer(
            specification, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        try:
            specification = Specification.objects.get(id=id)
        except Specification.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        specification.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)










class SpecificationDetailViews(APIView):

    def get(self, request, format=None):
        specification = Spec_detail.objects.all()
        serializer = SpecificationDetailSerializer(specification, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = SpecificationDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, format=None):
        try:
            specification = Spec_detail.objects.get(id=id)
        except Spec_detail.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = SpecificationDetailSerializer(
            specification, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        try:
            specification = Spec_detail.objects.get(id=id)
        except Spec_detail.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        specification.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    




@api_view(['POST'])
def create_proposal(request):
    if request.method == 'POST':
        data = request.data

        # Fetching the estimating instance or handling the error if it does not exist
        try:
            estimating_instance = Estimating.objects.get(id=data['estimating'])
        except Estimating.DoesNotExist:
            return Response({"error": "Estimating instance not found"}, status=status.HTTP_400_BAD_REQUEST)

        # Creating a new proposal
        proposal_data = {
            "estimating": estimating_instance.id,
            "date": data['date'],
            "architect_name": data['architect_name'],
            "architect_firm": data['architect_firm'],
        }
        
        proposal_serializer = ProposalSerializer(data=proposal_data)
        if proposal_serializer.is_valid():
            proposal = proposal_serializer.save()
        else:
            return Response(proposal_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Creating the ProposalService instances
        for service_data in data['services']:
            try:
                service = Service.objects.get(id=service_data['service'])
                proposal_service_data = {
                    "proposal": proposal.id,
                    "service": service.id,
                    "service_type": service_data['type']
                }
                proposal_service_serializer = ProposalServiceSerializer(data=proposal_service_data)
                if proposal_service_serializer.is_valid():
                    proposal_service_serializer.save()
                else:
                    return Response(proposal_service_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Service.DoesNotExist:
                return Response({"error": f"Service with id {service_data['service']} not found"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"message": "Proposal created successfully"}, status=status.HTTP_201_CREATED)
    

class ProposalView(APIView):
    def get(self, request):
        proposals = Proposal.objects.all()
        serializer = ProposalSerializer(proposals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProposalServiceView(APIView):
    def get(self, request, format=None):
        proposalservice = ProposalService.objects.all()
        serializer = ProposalServiceSerializer(proposalservice, many=True)
        return Response(serializer.data)
# class ServiceViews(APIView):
#     def get(self, request, format=None):
#         service = Service.objects.all()
#         serializer = ServiceSerializer(service, many=True)
#         return Response(serializer.data)


#     def post(self, request, format=None):
#         serializer = ServiceSerializer(data=request.data)
#         if serializer.is_valid():

#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
    
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, id, format=None):
#         try:
#             service = Service.objects.get(id=id)
#         except Service.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         serializer = ServiceSerializer(service, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, id, format=None):
#         try:
#             service = Service.objects.get(id=id)
#         except Service.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         service.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)











# class ProposalServiceViews(APIView):

#     def get(self, request, format=None):
#         service = PropsalsServices.objects.all()
#         serializer = ProposalServiceSerializer(service, many=True)
#         return Response(serializer.data)


#     def post(self, request, format=None):
#         serializer = ProposalServiceSerializer(data=request.data)
#         if serializer.is_valid():
#         # Check if 'propsals' field is present in the validated data
#             if 'propsals' not in serializer.validated_data:
#                 return Response({"error": "The 'propsals' field is required"}, status=status.HTTP_400_BAD_REQUEST)
        
#         # Save the instance if it's valid
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
    
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, id, format=None):
#         try:
#             service = PropsalsServices.objects.get(id=id)
#         except PropsalsServices.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         serializer = ProposalServiceSerializer(service, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, id, format=None):
#         try:
#             service = PropsalsServices.objects.get(id=id)
#         except PropsalsServices.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         service.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)




# class ServiceViews(APIView):
#     def get(self, request):
#         services = Service.objects.all()
#         serializer = ServiceSerializer(services, many=True)
#         return Response(serializer.data)





# class ProposalViews(APIView):
#     def post(self, request, format=None):
#         serializer = ProposalSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)