from rest_framework import serializers
from .models import User
from .utils import Util

# import for the Send Email and reset Password
from xml.dom import ValidationErr
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator


class UserRegisterationSerializers(serializers.ModelSerializer):
    # this line for password hid (password ****** like this format)
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['id','email', 'full_Name', 'password', 'password2','phone_number','signtrPDF','roles']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def to_representation(self, instance):
        representation = super().to_representation(instance)
    
    # Get a list of role names
        representation['roles'] = [role.name for role in instance.roles.all()] if instance.roles.all() else 'No roles assigned'
    
        return representation
# Validating Password and Config Password while registration

    def validate(self, data):
        password = data.get('password')
        password2 = data.get('password2')
        if password != password2:
            raise serializers.ValidationError(
                "Password and Confirm Password Dosn't Match")
        return data

    def create(self, validate_data):
        return User.objects.create_user(**validate_data)


class UserLoginserializers(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = User
        fields = ['email', 'password']

# For Get A Uniq user With the Authentication


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_Name', 'is_admin', 'create_at','phone_number','signtrPDF']

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
            user_ID = urlsafe_base64_encode(force_bytes(user.id))
            print('User ID  in bytes', user_ID)
            token = PasswordResetTokenGenerator().make_token(user)
            print('Passsword Reset  Token', token)
            link = 'http://localhost:5173/api/user/reset/'+user_ID+'/'+token
            print('Password rest link', link)
            # Send Email code requered
            body='Click Following Link to Reset Your Password'+ link
            data={
                'subject':'Reset Your Password',
                'body':body,
                'to_email':user.email
            }
            Util.send_email(data)
            return attrs
        else:
            raise ValidationErr('You are Not a register User')


class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)

    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            user_ID = self.context.get('user_ID')
            token = self.context.get('token')
            if password != password2:
                raise serializers.ValidationError(
               "Password and Confirm Password Dosn't Match")
            id = smart_str(urlsafe_base64_decode(user_ID))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user,token):
                raise ValidationErr('Token is not Valid or maybe Expired')
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user,token)
            raise ValidationErr('Token is not Valid or maybe Expired')            