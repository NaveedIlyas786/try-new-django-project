from rest_framework import serializers
from .models import User
from .utils import send_reset_email

# import for the Send Email and reset Password
from xml.dom import ValidationErr
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError,force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator

import base64






class UserRegisterationSerializers(serializers.ModelSerializer):
    # this line for password hid (password ****** like this format)
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)
    
    def get_signtr(self, obj):
        if obj.signtr:
            # Convert the binary data to base64 encoded string
            return base64.b64encode(obj.signtr).decode('utf-8')
        return None


    class Meta:
        model = User
        fields = ['id','email', 'full_Name', 'password', 'password2','phone_number','roles','is_active','company','department','direct_number','locaton','signtr']
        extra_kwargs = {
            'password': {'write_only': True}
        }



    def to_representation(self, instance):
        if instance is None:
            return {}

        # Simplify the representation to avoid complex logic that might cause issues
        representation = {
            'id': instance.id,
            'email': instance.email,
            'full_Name': instance.full_Name,
            'phone_number': instance.phone_number,
            # 'is_active': instance.is_active,
            'company': instance.company.Cmpny_Name if instance.company else None,
            # 'department': instance.department.dprtmnt_name if instance.department else None,
            'direct_number': instance.direct_number,
            # 'locaton': instance.locaton
        }

        # Optionally handle roles, ensuring None values don't cause issues
        if instance.roles.exists():
            representation['roles'] = [role.name for role in instance.roles.all()]
        else:
            representation['roles'] = 'No roles assigned'

        return representation
        # representation['signtr_type'] = str(type(instance.signtr))



        # if instance.signtr:
        #     # Ensure the data is bytes before encoding
        #     if isinstance(instance.signtr, bytes):
        #         representation['signtr'] = base64.b64encode(instance.signtr).decode('utf-8')
        #     else:
        #         # Handle the case where signtr is not bytes
        #         # You may need to adjust this part based on what signtr actually contains
        #         representation['signtr'] = instance.signtr
        # else:
        #     representation['signtr'] = None
    




# Validating Password and Config Password while registration





    def validate(self, data):
        password = data.get('password')
        password2 = data.get('password2')
        if password != password2:
            raise serializers.ValidationError(
                "Password and Confirm Password Dosn't Match")
        return data
    


    
    def create(self, validated_data):
        signtr_data = validated_data.pop('signtr', None)
        if signtr_data:
            # Assuming signtr_data is in base64 string format
            signtr_data = base64.b64decode(signtr_data)

        user = User.objects.create_user(**validated_data)
        if signtr_data:
            user.signtr = signtr_data
            user.save()
        return user# type: ignore # type: ignore
    








class UserLoginserializers(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = User
        fields = ['email', 'password']







# For Get A Uniq user With the Authentication

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_Name', 'is_active','is_admin', 'create_at','phone_number','signtr']









# This Serializer for Change Password for Authorized User


class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)

    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError(
                "Password and Confirm Password Dosn't Match")
        user.set_password(password)
        user.save()
        return attrs








class SendEmailResetPasswordViewsSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            user_ID = urlsafe_base64_encode(force_bytes(user.id)) # type: ignore
            token = PasswordResetTokenGenerator().make_token(user)
            link = f'http://localhost:5173/resetpassword/{user_ID}/{token}/'  # Revised link formatting
 
            # Send Email code required
            body = f'Click the following link to reset your password: {link}'  # Revised body formatting
            data = {
                'subject': 'Reset Your Password',
                'body': body,
                'to_email': user.email
            }
            send_reset_email(data)  # This needs to be defined in your utils.py
            return attrs
        else:
            raise serializers.ValidationError('You are not a registered user')








class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)

    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        try:
            request = self.context.get("request")
            uidb64 = request.parser_context.get('kwargs').get('uidb64')
            token = request.parser_context.get('kwargs').get('token')
            id = force_str(urlsafe_base64_decode(uidb64))

            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError('Token is not valid')

            password = attrs.get('password')
            password2 = attrs.get('password2')
            if password != password2:
                raise serializers.ValidationError("Passwords don't match")

            return attrs
        except Exception as e:
            raise serializers.ValidationError(str(e))