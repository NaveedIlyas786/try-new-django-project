
from rest_framework.decorators import api_view
from django.http import JsonResponse
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,views
from .models import Company, Estimating,Estimating_detail, Proposal, Qualification,Service,Location,UrlsTable,Addendum,DMS_Dertory,Specification,Spec_detail,Role,Dprtmnt
from .serializers import EstimatingSerializer, ProposalSerializer, AddendumSerializer, QualificationSerializer, SpecificationDetailSerializer,SpecificationSerializer,ServiceSerializer,LocationSerializer,EstimatingDetailSerializer,ProposalServiceSerializer,CompanySerializer,UrlsSerializers,DMS_DertorySezializers,Job_titleSerializers,DprtmentSerializers
from accounts.models import User

from .forms import EstimatingDetailAdminForm

from datetime import datetime
from rest_framework.permissions import IsAuthenticated
from django.core.mail import EmailMessage
from django.core.files.base import ContentFile
import base64
import logging
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from django.db.models import Sum

class DepartmentViews(APIView):
    def get(self,request):
        department=Dprtmnt.objects.all()
        serializer=DprtmentSerializers(department, many=True)
        return Response(serializer.data)


    def post(self,request):
        serializer=DprtmentSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



class Job_titleViews(APIView):
    def get(self,request):
        jobtile=Role.objects.all()
        serializer=Job_titleSerializers(jobtile, many=True)
        return Response(serializer.data)


    def post(self,request):
        serializer=Job_titleSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)






class DMS_DertoryView(APIView):
    def get(self,request):
        dms_dertory=DMS_Dertory.objects.all()
        serializer=DMS_DertorySezializers(dms_dertory, many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer=DMS_DertorySezializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
    def put(self, request, id, format=None):
        try:
            dms_dertory = DMS_Dertory.objects.get(id=id)
        except DMS_Dertory.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = CompanySerializer(dms_dertory, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        try:
            DMS_Dertory = DMS_Dertory.objects.get(id=id)
        except DMS_Dertory.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        DMS_Dertory.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class SendEmailView(APIView):

    def post(self, request, estimating_id, format=None):
        # Initialize logging
        logger = logging.getLogger(__name__)

        try:
            estimating = Estimating.objects.get(id=estimating_id)
            if estimating.company is None:
                return Response({'error': 'Company not found'}, status=status.HTTP_400_BAD_REQUEST)

            email_from = 'mubeenjutt9757@gmail.com'  # Default sender email


            pdf_base64 = request.data.get('pdf')
            if not pdf_base64:
                logger.error('PDF not provided')
                logger.error(f'Request Data: {request.data}')  # Log the entire request data
                return Response({'error': 'PDF is required'}, status=status.HTTP_400_BAD_REQUEST)

            pdf_data = base64.b64decode(pdf_base64)
            pdf_file = ContentFile(pdf_data, 'proposal.pdf')


            subject = 'Proposal'
            message = f"""
            Hello,

            Thank you for allowing <strong>{estimating.company.Cmpny_Name}</strong> the opportunity to bid on the <strong>{estimating.prjct_name}</strong>.

            The plans used to formulate the bid proposal are dated <strong> {estimating.plane_date.strftime('%m-%d-%Y')}</strong>, drafted by HPA, inc, and approved by Yong Nam.

            Thank you,
            """

            email = EmailMessage(
                subject,
                message,
                email_from,
                [estimating.bidder_mail],
            )
            email.content_subtype = 'html'

            email.attach(pdf_file.name, pdf_file.read(), 'application/pdf')
            email.send()

            return Response({'message': 'Email sent successfully!'})

        except Estimating.DoesNotExist:
            logger.error(f'Estimating ID {estimating_id} not found')
            return Response({'error': 'Estimating not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            logger.error(str(e))
            logger.error(f'Request Data: {request.data}')  # Log the entire request data
            return Response({'error': 'Failed to send email', 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
        


class CompanyWonEstimates(APIView):

    def get(self, request):
        # Getting the year from the query parameters or using the current year if not provided
        year = int(request.query_params.get('year', datetime.now().year))

        # Getting all active companies
        companies = Company.objects.filter(is_active=True)

        data = []

        # Variables to store total counts and sums
        grand_total_won_estimates = 0
        grand_total_bid_amount = 0

        for company in companies:
            # Counting 'Won' estimating records for each active company for the selected year
            won_estimates = Estimating.objects.filter(
                company=company, 
                status='Won',
                start_date__year=year  # Filtering by the selected year
            )

            total_won_estimates = won_estimates.count()

            if total_won_estimates > 0:  # Only including companies with won estimates in the selected year
                # Summing bid amounts of 'Won' estimating records for each active company
                total_bid_amount = won_estimates.aggregate(sum=Sum('bid_amount'))['sum'] or 0

                # Adding the individual company's counts and sums to the grand totals
                grand_total_won_estimates += total_won_estimates
                grand_total_bid_amount += total_bid_amount

                # Adding data to the response list
                data.append({
                    "company_name": company.Cmpny_Name,
                    "total_won": total_won_estimates,
                    "total_won_bid_amount": total_bid_amount
                })

        if grand_total_won_estimates > 0:  # Only adding the grand total if there are won estimates
            # Adding the grand totals to the response data
            data.append({
                "company_name": "Grand Total",
                "total_won": grand_total_won_estimates,
                "total_won_bid_amount": grand_total_bid_amount
            })

        return Response(data)




class EstimatorSummaryView(views.APIView):

    def get(self, request, format=None):
        response_data = []
        total_data = {
            'Working': {'total': 0, 'bid_amount': 0},
            'Pending': {'total': 0, 'bid_amount': 0},
            'Won': {'total': 0, 'bid_amount': 0},
            'Lost': {'total': 0, 'bid_amount': 0},
            'Grand Total': {'total': 0, 'bid_amount': 0}
        }

        year = int(request.query_params.get('year', datetime.now().year))

        # Handling the estimators
        estimators = User.objects.filter(roles__name='Estimator')
        for estimator in estimators:
            estimates = Estimating.objects.filter(
                estimator=estimator,
                start_date__year=year  
            )

            if estimates.count() == 0:
                continue
            
            estimator_data = calculate_summary(estimates)
            estimator_data['estimator'] = estimator.full_Name  
            
            response_data.append(estimator_data)

            for status in ['Working', 'Pending', 'Won', 'Lost']:
                total_data[status]['total'] += estimator_data['summary'][status]['total']
                total_data[status]['bid_amount'] += estimator_data['summary'][status]['bid_amount']
                total_data['Grand Total']['total'] += estimator_data['summary'][status]['total']
                total_data['Grand Total']['bid_amount'] += estimator_data['summary'][status]['bid_amount']

        unassigned_estimations = Estimating.objects.filter(
            estimator__isnull=True,
            status='Working',
            start_date__year=year  
        )

        unassigned_data = calculate_summary(unassigned_estimations, only_working=True)
        unassigned_data['estimator'] = 'Unassigned'

        total_data['Working']['total'] += unassigned_data['summary']['Working']['total']
        total_data['Working']['bid_amount'] += unassigned_data['summary']['Working']['bid_amount']
        total_data['Grand Total']['total'] += unassigned_data['summary']['Working']['total']
        total_data['Grand Total']['bid_amount'] += unassigned_data['summary']['Working']['bid_amount']

        response_data.append(unassigned_data)

        # total_data['estimator'] = 'Grand Totals'
        # response_data.append(total_data)
        grand_totals = {
            'summary': total_data,  # Modified this line to add all status including Grand Total
            'ytd_total': total_data['Grand Total']['total'],  # Extracted grand total count
            'ytd_total_bid_amount': total_data['Grand Total']['bid_amount'], # Extracted grand total bid amount
            'estimator': 'Grand Totals'
        }
        response_data.append(grand_totals)


        return Response(response_data, status=200)

def calculate_summary(estimates, only_working=False):
    grand_total = estimates.count()
    grand_total_bid_amount = estimates.aggregate(Sum('bid_amount'))['bid_amount__sum'] or 0
    statuses = ['Working'] if only_working else ['Working', 'Pending', 'Won', 'Lost']

    summary = {}
    for status in statuses:
        total = estimates.filter(status=status).count()
        bid_amount = estimates.filter(status=status).aggregate(bid_amount=Sum('bid_amount'))['bid_amount'] or 0
        percentage = (total / grand_total * 100) if grand_total > 0 else 0

        summary[status] = {
            'total': total,
            'percentage': percentage,
            'bid_amount': bid_amount
        }

    return {
        'summary': summary,
        'ytd_total': grand_total,
        'ytd_total_bid_amount': grand_total_bid_amount
    }





# class Grand_totleSummaryView(views.APIView):

#     def get(self, request, format=None):
#         response_data = []
#         total_data = {
#             'Working': {'total': 0, 'bid_amount': 0},
#             'Pending': {'total': 0, 'bid_amount': 0},
#             'Won': {'total': 0, 'bid_amount': 0},
#             'Lost': {'total': 0, 'bid_amount': 0},
#             'Grand Total': {'total': 0, 'bid_amount': 0}
#         }

#         year = int(request.query_params.get('year', datetime.now().year))

#         # Handling the estimators
#         estimators = User.objects.filter(roles__name='Estimator')
#         for estimator in estimators:
#             estimates = Estimating.objects.filter(
#                 estimator=estimator,
#                 start_date__year=year  
#             )

#             if estimates.count() == 0:
#                 continue
            
#             estimator_data = calculate_summary(estimates)
#             estimator_data['estimator'] = estimator.full_Name  
            
#             response_data.append(estimator_data)

#         #     for status in ['Working', 'Pending', 'Won', 'Lost']:
#         #         total_data[status]['total'] += estimator_data['summary'][status]['total']
#         #         total_data[status]['bid_amount'] += estimator_data['summary'][status]['bid_amount']
#         #         total_data['Grand Total']['total'] += estimator_data['summary'][status]['total']
#         #         total_data['Grand Total']['bid_amount'] += estimator_data['summary'][status]['bid_amount']

#         # unassigned_estimations = Estimating.objects.filter(
#         #     estimator__isnull=True,
#         #     status='Working',
#         #     start_date__year=year  
#         # )

#         # unassigned_data = calculate_summary(unassigned_estimations, only_working=True)
#         # unassigned_data['estimator'] = 'Unassigned'

#         # total_data['Working']['total'] += unassigned_data['summary']['Working']['total']
#         # total_data['Working']['bid_amount'] += unassigned_data['summary']['Working']['bid_amount']
#         # total_data['Grand Total']['total'] += unassigned_data['summary']['Working']['total']
#         # total_data['Grand Total']['bid_amount'] += unassigned_data['summary']['Working']['bid_amount']

#         # response_data.append(unassigned_data)

#         total_data['estimator'] = 'Grand Totals'
#         response_data.append(total_data)
#         grand_totals = {
#             'summary': total_data,  # Modified this line to add all status including Grand Total
#             'ytd_total': total_data['Grand Total']['total'],  # Extracted grand total count
#             'ytd_total_bid_amount': total_data['Grand Total']['bid_amount'], # Extracted grand total bid amount
#             'estimator': 'Grand Totals'
#         }
#         response_data.append(grand_totals)


#         return Response(response_data, status=200)

# def calculate_summary(estimates, only_working=False):
#     grand_total = estimates.count()
#     grand_total_bid_amount = estimates.aggregate(Sum('bid_amount'))['bid_amount__sum'] or 0
#     statuses = ['Working'] if only_working else ['Working', 'Pending', 'Won', 'Lost']

#     summary = {}
#     for status in statuses:
#         total = estimates.filter(status=status).count()
#         bid_amount = estimates.filter(status=status).aggregate(bid_amount=Sum('bid_amount'))['bid_amount'] or 0
#         percentage = (total / grand_total * 100) if grand_total > 0 else 0

#         summary[status] = {
#             'total': total,
#             'percentage': percentage,
#             'bid_amount': bid_amount
#         }

#     return {
#         'summary': summary,
#         'ytd_total': grand_total,
#         'ytd_total_bid_amount': grand_total_bid_amount
#     }



#dfhdjhfjdhf
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
    
    def delete(self,request,id):
        try:
            estimating=Estimating_detail.objects.get(id=id)
        except Estimating_detail.DoesNotExist:
            return Response( status=status.HTTP_404_NOT_FOUND)
        estimating.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



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
        if 'estimating_id' not in data:
            return Response({"error": "estimating_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            estimating_instance = Estimating.objects.get(id=data['estimating_id'])

        except Estimating.DoesNotExist:
            return Response({"error": "Estimating instance not found"}, status=status.HTTP_400_BAD_REQUEST)

        proposal_data = {
            "estimating_id": estimating_instance.id,
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
                    "service_type": service_data['service_type']
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
                    "addendum_Number": addendum_data['addendum_number']
                }
                proposal_addendum_serializer = AddendumSerializer(data=proposal_addendum_data)
                if proposal_addendum_serializer.is_valid():
                    proposal_addendum_serializer.save()
                else:
                    return Response(proposal_addendum_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "No Addendums data provided"}, status=status.HTTP_400_BAD_REQUEST)
        

        total_budget = 0
        

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
                    total_budget += float(specification_data['budget'])
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
        
        if estimating_instance.bid_amount is None:
            estimating_instance.bid_amount = 0

            estimating_instance.bid_amount = total_budget
        else:
            estimating_instance.bid_amount = 0
            estimating_instance.bid_amount += total_budget
        estimating_instance.save()



        return Response({"message": "Proposal created successfully"}, status=status.HTTP_201_CREATED)
    




    elif request.method == 'GET':
        if proposal_id is not None:
            try:
                proposal = Proposal.objects.get(id=proposal_id)
                serializer = ProposalSerializer(proposal)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Proposal.DoesNotExist:
                return Response({"error": "Proposal not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
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
    








# THIS IS Specification VIEW WITH ALL CRUD OPRATION
class SpecificationViews(APIView):

    def get(self, request, format=None):
        specification = Specification.objects.all()
        serializer = SpecificationSerializer(specification, many=True)
        return Response(serializer.data)

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
class SpecificationDetailViews(APIView):

    def get(self, request, format=None):
        specification = Spec_detail.objects.all()
        serializer = SpecificationDetailSerializer(specification, many=True)
        return Response(serializer.data)

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
    