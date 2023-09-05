from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.contrib.auth import authenticate     

from .serializers import UserRegisterationSerializers,UserLoginserializers
from .models import User 
# Create your views here.

#veiw for Registor or Create User 
class UserRegistrationView(APIView):
    def post(self, request, format=None):
        serializer=UserRegisterationSerializers(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user=serializer.save()
            return Response({'msg':'Registration Success'},status=status.HTTP_201_CREATED)
        
        return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)
    

class UserApiListView(ListAPIView):
     queryset=User.objects.all()
     serializer_class=UserRegisterationSerializers

# 
class UserLoginViews(APIView):
        def post(self,request,format=None):
             serializer=UserLoginserializers(data=request.data)
             if serializer.is_valid(raise_exception=True):
                  email=serializer.data.get('email')
                  password=serializer.data.get('password')
                  user= authenticate(email=email,password=password)
                  if user is not None:
                       return Response({'msg':'Login Successfully '}, status=status.HTTP_200_OK)
                  else:
                       return Response({'error':{'non_field_error':['Email or password is not Valid']}},status=status.HTTP_404_NOT_FOUND)
             return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)