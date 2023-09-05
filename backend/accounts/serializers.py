from rest_framework import serializers
from .models import User


class UserRegisterationSerializers(serializers.ModelSerializer):
    password2=serializers.CharField(style={'input_type':'password'},write_only=True)   #this line for password hid (password ****** like this format)
    class Meta:
        model=User
        fields=['email','full_Name','password','password2']
        extra_kwargs={
            'password':{'write_only':True}
        }

# Validating Password and Config Password while registration

    def validate(self,data):
        password=data.get('password')
        password2=data.get('password2')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password Dosn't Match")
        return data
    
    def create (self,validate_data):
        return User.objects.create_user(**validate_data)
    

class UserLoginserializers(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=255)
    class Meta:
        model=User 
        fields= ['email','password']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','email','full_Name','is_admin','create_at']


class UserChangePasswordSerializer(serializers.Serializer):
    password=serializers.CharField(max_length=255, style={'input_type':'password'},write_only=True)  
    password2=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)  
    class Meta:
        fields=['password','password2']
    def validate(self, attrs):
        password=attrs.get('password')
        password2=attrs.get('password2')
        user=self.context.get('user')
        if password!=password2:
            raise serializers.ValidationError("Password and Confirm Password Dosn't Match")
        user.set_password(password)
        user.save()
        return attrs   