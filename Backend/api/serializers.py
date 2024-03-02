from rest_framework import serializers
from .models import Medicine, Contact, TestBook, Profile 
from .models import User
# from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
# from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
# from django.contrib.auth.tokens import PasswordResetTokenGenerator
# from account.utils import Util

class UserRegistrationSerializer(serializers.ModelSerializer):
  # We are writing this becoz we need confirm password field in our Registratin Request
  password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
  class Meta:
    model = User
    fields=['email', 'name', 'password', 'password2', 'phone_number']
    extra_kwargs={
      'password':{'write_only':True}
    }

  # Validating Password and Confirm Password while Registration
  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    return attrs

  def create(self, validate_data):
    return User.objects.create_user(**validate_data)

class UserLoginSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    model = User
    fields = ['email', 'password']

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'email', 'name']

# class UserChangePasswordSerializer(serializers.Serializer):
#   password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
#   password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
#   class Meta:
#     fields = ['password', 'password2']

#   def validate(self, attrs):
#     password = attrs.get('password')
#     password2 = attrs.get('password2')
#     user = self.context.get('user')
#     if password != password2:
#       raise serializers.ValidationError("Password and Confirm Password doesn't match")
#     user.set_password(password)
#     user.save()
#     return attrs



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['registered_email', 'blood_group', 'image', 'location','url']

# class RegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Register
#         fields = ['name', 'email', 'phone_number', 'password','url']

class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = ['id', 'name', 'price', 'image', 'qty', 'type', 'description','url']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'phone_number', 'email', 'query','url']

class TestBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestBook
        fields = ['id', 'name', 'type', 'price', 'time','url']