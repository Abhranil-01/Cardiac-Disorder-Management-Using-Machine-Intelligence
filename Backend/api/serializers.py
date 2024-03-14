from rest_framework import serializers
from .models import Medicine, Contact, TestBook, Profile, AddtoCart, OrderList, User
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
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

class ProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = Profile
		fields = ['registered_email', 'blood_group', 'image', 'location']

class UserProfileSerializer(serializers.ModelSerializer):
	profile = ProfileSerializer()
	class Meta:
		model = User
		fields = ['id', 'email', 'name','profile']

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




# class RegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Register
#         fields = ['name', 'email', 'phone_number', 'password','url']

class MedicineSerializer(serializers.ModelSerializer):
	class Meta:
		model = Medicine
		fields = ['id', 'name', 'price', 'image', 'qty', 'type', 'description','featured','url']

class ContactSerializer(serializers.ModelSerializer):
	class Meta:
		model = Contact
		fields = ['id', 'name', 'email', 'query','url']

class TestBookSerializer(serializers.ModelSerializer):
	class Meta:
		model = TestBook
		fields = ['id', 'name', 'type', 'price', 'time','url']

class AddtoCartSerializer(serializers.ModelSerializer):
	class Meta:
		model = AddtoCart
		fields = '__all__'  # Adjust fields as needed

from rest_framework import serializers
from .models import OrderList, Medicine

class OrderSerializer(serializers.ModelSerializer):
	class Meta:
		model = OrderList
		fields = '__all__'

	def create(self, validated_data):
		# Calculate total price
		medicine_id = validated_data['medicine_id']
		qty = validated_data['qty']
		try:
			medicine = Medicine.objects.get(pk=medicine_id.id)
		except Medicine.DoesNotExist:
			raise serializers.ValidationError('Invalid medicine ID')

		total_price = medicine.price * qty

		# Update medicine quantity
		if medicine.qty < qty:
			raise serializers.ValidationError('Insufficient medicine stock')
		medicine.qty -= qty
		medicine.save()

		# Save order with calculated price
		order = OrderList.objects.create(
			user=validated_data['user'],
			medicine_id=medicine_id,
			qty=qty, 
			price=total_price
		)
		return order
