# views.py in the "Estimating" app

from rest_framework.decorators import api_view
from django.http import JsonResponse
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Company, Estimating,Estimating_detail, Proposal, Qualification,Service,Location,UrlsTable
from .serializers import EstimatingSerializer, ProposalSerializer, AddendumSerializer, QualificationSerializer, SpecificationDetailSerializer,SpecificationSerializer,ServiceSerializer,LocationSerializer,EstimatingDetailSerializer,ProposalServiceSerializer,CompanySerializer,UrlsSerializers

from .forms import EstimatingDetailAdminForm



class UrlsListViews(APIView):
    def get(self,request):
        url=UrlsTable.objects.all()
        serializer=UrlsSerializers(url, many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer=UrlsSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        




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
        top_level_details = Estimating_detail.objects.filter(prnt_id__isnull=True)
        serializer = EstimatingDetailSerializer(top_level_details, many=True)
        return Response(serializer.data)


    def post(self, request, *args, **kwargs):
        form = EstimatingDetailAdminForm(request.POST, request.FILES)
        if form.is_valid():
            # Extract the file binary data and file details
            file_field = form.cleaned_data.pop('file_field')
            file_binary_data = file_field.read()
            uploaded_file_name, uploaded_file_extension = os.path.splitext(file_field.name)
            
            # Update cleaned_data with file details
            cleaned_data = form.cleaned_data
            cleaned_data['file_type'] = uploaded_file_extension.lstrip('.')
            cleaned_data['file_name'] = uploaded_file_name
            
            # Ensure ForeignKeys are set to IDs
            cleaned_data['Estimating'] = cleaned_data['Estimating'].id if cleaned_data.get('Estimating') else None
            cleaned_data['prnt'] = cleaned_data['prnt'].id if cleaned_data.get('prnt') else None

            # Initialize the serializer with cleaned_data
            serializer = EstimatingDetailSerializer(data=cleaned_data)
            if serializer.is_valid():
                instance = serializer.save()
                instance.file_binary_data = file_binary_data
                instance.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'errors': form.errors}, status=status.HTTP_400_BAD_REQUEST)



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






@api_view(['POST','GET','PUT','DELETE'])
def create_proposal(request, proposal_id=None):
    if request.method == 'POST':
        data = request.data

        try:
            estimating_instance = Estimating.objects.get(id=data['estimating'])
        except Estimating.DoesNotExist:
            return Response({"error": "Estimating instance not found"}, status=status.HTTP_400_BAD_REQUEST)

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
            






        
        if 'Addendums' in data:
            for addendum_data in data['Addendums']:
                proposal_addendum_data = {
                    "proposal": proposal.id,
                    "date": addendum_data['date'],
                    "addendum_Number": addendum_data['addendum_Number']
                }
                proposal_addendum_serializer = AddendumSerializer(data=proposal_addendum_data)
                if proposal_addendum_serializer.is_valid():
                    proposal_addendum_serializer.save()
                else:
                    return Response(proposal_addendum_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "No Addendums data provided"}, status=status.HTTP_400_BAD_REQUEST)
        


        

        if 'spcifc' in data:
            for spcifc_data in data['spcifc']:
                # creating a new Specification instance
                specification_data = {
                    "proposal": proposal.id,
                    "budget": spcifc_data['budget'],
                    "specific_name": spcifc_data['specific_name']
                }
                specification_serializer = SpecificationSerializer(data=specification_data)
                if specification_serializer.is_valid():
                    specification = specification_serializer.save()
                else:
                    return Response(specification_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                # Creating the nested Spec_detail instances
                for sefic_data in spcifc_data['sefic']:
                    spec_detail_data = {
                        "sefic": specification.id,
                        "number": sefic_data['number'],
                        "name": sefic_data['name']
                    }
                    spec_detail_serializer = SpecificationDetailSerializer(data=spec_detail_data)
                    if spec_detail_serializer.is_valid():
                        spec_detail_serializer.save()
                    else:
                        return Response(spec_detail_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "No Specification data provided"}, status=status.HTTP_400_BAD_REQUEST)       





        return Response({"message": "Proposal created successfully"}, status=status.HTTP_201_CREATED)
    




    elif request.method == 'GET':
        # Add GET request handling logic here (if needed)
        proposals = Proposal.objects.all()
        serializer = ProposalSerializer(proposals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



    
    elif request.method == 'PUT':
        # Add PUT request handling logic here (update)
        if proposal_id is None:
            return Response({"error": "Proposal ID is required for updating"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            proposal = Proposal.objects.get(id=proposal_id)
        except Proposal.DoesNotExist:
            return Response({"error": "Proposal not found"}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        proposal_serializer = ProposalSerializer(proposal, data=data)
        if proposal_serializer.is_valid():
            proposal_serializer.save()
            return Response({"message": "Proposal updated successfully"}, status=status.HTTP_200_OK)
        else:
            return Response(proposal_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



    
    elif request.method == 'DELETE':
        # Add DELETE request handling logic here
        if proposal_id is None:
            return Response({"error": "Proposal ID is required for deletion"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            proposal = Proposal.objects.get(id=proposal_id)
        except Proposal.DoesNotExist:
            return Response({"error": "Proposal not found"}, status=status.HTTP_404_NOT_FOUND)

        proposal.delete()
        return Response({"message": "Proposal deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    






class ServiceViews(APIView):
    def get(self, request, format=None):
        service = Service.objects.all()
        serializer = ServiceSerializer(service, many=True)
        return Response(serializer.data)


    def post(self, request, format=None):
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, format=None):
        try:
            service = Service.objects.get(id=id)
        except Service.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ServiceSerializer(service, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        try:
            service = Service.objects.get(id=id)
        except Service.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        service.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    


    



# This is the Views of Addendum

# class AddendumView(APIView):
#     def get(self, request, format=None):
#         Addendums = Addendum.objects.all()
#         serializer = AddendumSerializer(Addendums, many=True)
#         return Response(serializer.data)

#     def post(self, request, format=None):
#         serializer = AddendumSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, id, format=None):
#         try:
#             Addendums = Addendum.objects.get(id=id)
#         except Addendum.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         serializer = AddendumSerializer(Addendums, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, id, format=None):
#         try:
#             Addendums = Addendum.objects.get(id=id)
#         except Addendum.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         Addendums.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    








# THIS IS Specification VIEW WITH ALL CRUD OPRATION
# class SpecificationViews(APIView):

#     def get(self, request, format=None):
#         specification = Specification.objects.all()
#         serializer = SpecificationSerializer(specification, many=True)
#         return Response(serializer.data)

#     def post(self, request, format=None):
#         serializer = SpecificationSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, id, format=None):
#         try:
#             specification = Specification.objects.get(id=id)
#         except Specification.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         serializer = SpecificationSerializer(
#             specification, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, id, format=None):
#         try:
#             specification = Specification.objects.get(id=id)
#         except Specification.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         specification.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)









# THIS IS sPECIFICATION DETAIL VIEW ALL CRUD OPRATION 
# class SpecificationDetailViews(APIView):

#     def get(self, request, format=None):
#         specification = Spec_detail.objects.all()
#         serializer = SpecificationDetailSerializer(specification, many=True)
#         return Response(serializer.data)

#     def post(self, request, format=None):
#         serializer = SpecificationDetailSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, id, format=None):
#         try:
#             specification = Spec_detail.objects.get(id=id)
#         except Spec_detail.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         serializer = SpecificationDetailSerializer(
#             specification, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, id, format=None):
#         try:
#             specification = Spec_detail.objects.get(id=id)
#         except Spec_detail.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         specification.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    
