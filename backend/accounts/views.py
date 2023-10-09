from django.shortcuts import render
#123456
# from rest_framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

from django.contrib.auth import authenticate    
# For Token 
from rest_framework_simplejwt.tokens import RefreshToken


from .serializers import UserRegisterationSerializers,UserLoginserializers,UserProfileSerializer,UserChangePasswordSerializer,SendEmailResetPasswordViewsSerializer,UserPasswordResetSerializer
from .models import User 
from .renderers import UserRenderer

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
            token = get_tokens_for_user(user)
            return Response({'token': token, 'msg': 'Registration Success'}, status=status.HTTP_201_CREATED)
        
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    def get(self,request,format=None):
        user=User.objects.filter(Q(is_active=True) & ~Q(is_admin=True))
        serializer=UserRegisterationSerializers(user,many=True)
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
    def post(self,request,format=None):
        serializer=SendEmailResetPasswordViewsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password Resend Link send. Please check your Email'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    









class UserPasswordResetViews(APIView):
    def post(self,request,token,user_ID,format=None):
        serializer=UserPasswordResetSerializer(data=request.data,context={'user_ID':user_ID,'token':token})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password Change Successfully'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        