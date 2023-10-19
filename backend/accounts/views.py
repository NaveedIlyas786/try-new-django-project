from django.shortcuts import render
#123456
# from rest_framework

from django.core.mail import send_mail
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

from django.contrib.auth import authenticate    
# For Token 
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import Http404

from .serializers import UserRegisterationSerializers,UserLoginserializers,UserProfileSerializer,UserChangePasswordSerializer,SendEmailResetPasswordViewsSerializer,UserPasswordResetSerializer,UserPasswordResetSerializer  
from .models import User 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser

from django.utils.encoding import force_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator

import traceback

# Create your views here.

#Create a Token Function
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }







#veiw for Registor or Create User 
class UserRegistrationView(APIView):


    def post(self, request, format=None):
        serializer = UserRegisterationSerializers(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            
            # Fetching admin user - adjust the query as needed
            admin_user = User.objects.get(is_admin=True)
            admin_token = get_tokens_for_user(admin_user)['access']

            approval_link = request.build_absolute_uri(f'http://localhost:5173/adminDecisionPage/{user.id}/')
            # disapproval_link = request.build_absolute_uri(f'/api/user/disapprove_user/{user.id}/')

            message = (
                            f'A new account for {user.full_Name} and Email {user.email} needs your approval to access the DMS Contant Management System. '
                            f'Click the link to approve: {approval_link}\n'
                            # f'Click this link to disapprove: {disapproval_link}\n'
                            # f'Use this token for authorization: Bearer {admin_token}'
                        )

            send_mail(
                            'User Request',
                            message,
                            settings.EMAIL_HOST_USER,
                            ['naveedilyas321@gmail.com'],
                            fail_silently=False,
                    )
            
            return Response({'msg': 'Registration Success, waiting for admin approval'}, status=status.HTTP_201_CREATED)
        
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    

    def get(self, request, id=None, format=None):  # Add 'id' parameter to get the user by ID
        if id is not None:
            try:
                user = User.objects.get(pk=id)
                serializer = UserRegisterationSerializers(user)
                return Response(serializer.data)
            except User.DoesNotExist:
                raise Http404("User not found")
        else:
            users = User.objects.all()
            serializer = UserRegisterationSerializers(users, many=True)
            return Response(serializer.data)
    
    def put(self, request, id, format=None):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = UserRegisterationSerializers(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)












class UserLoginViews(APIView):
    def post(self, request, format=None):
        serializer = UserLoginserializers(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token': token, 'msg': 'Login Successfully '}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Email or password is not valid'}, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)













#For views for Get A Uniq Registration User With the Authentication
class UserProfileViews(APIView):
#    renderer_classes=[UserRenderer]
     permission_classes=[IsAuthenticated]
     def get(self,request,format=None):
          serializer=UserProfileSerializer(request.user)
          return Response(serializer.data,status=status.HTTP_200_OK)











#Change Password For a Uniq User
class UserChangePasswordViews(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,format=None):
        serializer=UserChangePasswordSerializer(data=request.data,context={'user':request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password Change Successfully'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    









# this class for Send email For the Reset or Forget Password for the User
class SendEmailResetPasswordViews(APIView):
    def post(self, request, format=None):
        serializer = SendEmailResetPasswordViewsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Password reset link sent. Please check your email.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)








class UserPasswordResetViews(APIView):
    def post(self, request, uidb64, token, format=None):
        try:
            print("UIDB64:", uidb64)
            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            print("User:", user)

            # Include 'request' in the context
            serializer = UserPasswordResetSerializer(data=request.data, context={'request': request})  
            if serializer.is_valid():
                password = serializer.validated_data.get('password')
                print("Validated Password:", password)
                user.set_password(password)
                user.save()
                return Response({'msg': 'Password reset successful'}, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(e)
            return Response({'error': 'An error occurred'}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
# @permission_classes([IsAdminUser])
def approve_user(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    user.is_active = True
    user.save()

    message=(
        f'You are a part of the DMS Cantact Management System.'
        f'"Click on this link and login http://localhost:5173/'
    )



    # Send confirmation email to the user
    send_mail(
        'Congratulations',
        message,
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False,
    )

    return Response({'msg': 'User approved and activated successfully'}, status=status.HTTP_200_OK)


@api_view(['POST'])
# @permission_classes([IsAdminUser])
def disapprove_user(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

 

    # Send disapproval email to the user
    send_mail(
        'Account Not Approved',
        'Sorry, your account registration has not been approved.',
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False,
    )
    user.delete()

    
    return Response({'msg': 'User disapproved and deleted successfully'}, status=status.HTTP_200_OK)



