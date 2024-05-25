from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, get_user_model
from rest_framework import generics
from .models import Medicine, Contact, TestBook, Profile, AddtoCart, OrderList, Payment, User
from .serializers import MedicineSerializer, ContactSerializer, TestBookSerializer, AddtoCartSerializer, OrderSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .serializers import UserLoginSerializer, UserProfileSerializer, UserRegistrationSerializer, ProfileSerializer
from django.contrib.auth import authenticate
from .renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
import joblib
from rest_framework import viewsets
from django.db import transaction
from rest_framework.decorators import api_view
# Generate Token Manually
import pickle
import joblib
import json
import numpy as np
from django.core.mail import EmailMessage
from django.contrib import messages
from django.template.loader import render_to_string
from sklearn import preprocessing
import pandas as pd
from django.http import JsonResponse
from .chatbot import chatbotres
import razorpay
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from decimal import Decimal
import razorpay
import random
client = razorpay.Client(
	auth=(settings.RAZOR_KEY_ID, settings.RAZOR_KEY_SECRET))


def contactEmail(request, name, to_email):
	try:
		mail_subject = 'Thank You for Contacting Us'
		message = render_to_string('contactus.html', {'name': name})
		email = EmailMessage(mail_subject, message, to=[to_email])
		email.content_subtype = 'html'  # Set the content type to HTML
		email.send()
		messages.success(request, f'Mail sent successfully to {to_email}.')
	except Exception as e:
		messages.error(request, f'Failed to send email: {e}.')


def get_tokens_for_user(user):
	refresh = RefreshToken.for_user(user)
	return {
		'refresh': str(refresh),
		'access': str(refresh.access_token),
	}


class UserRegistrationView(APIView):
	renderer_classes = [UserRenderer]

	def post(self, request, format=None):
		print(request.data)
		serializer = UserRegistrationSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()
		user_instance = User.objects.get(email=request.data.get('email'))
		print(user_instance)
		user_instance.is_active = False
		user_instance.save()
		profile = Profile(registered_email=user,
						  phone_number=request.data.get('phone_number'))
		profile.save()
		# token = get_tokens_for_user(user)
		return Response({'msg': 'account created successfully'}, status=status.HTTP_201_CREATED)


class UserLoginView(APIView):
	renderer_classes = [UserRenderer]

	def post(self, request, format=None):
		serializer = UserLoginSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		email = serializer.data.get('email')
		password = serializer.data.get('password')
		user = authenticate(email=email, password=password)
		try:
			admin_stat = user.is_admin
		except:
			admin_stat = False
		# print(user.is_admin)
		# print(admin_stat)
		if user is not None:
			token = get_tokens_for_user(user)
			return Response({'token': token, 'msg': 'Login Success', 'is_admin': admin_stat}, status=status.HTTP_200_OK)
		else:
			return Response({'errors': {'non_field_errors': ['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)



class UserProfileView(APIView):
	# renderer_classes = [UserRenderer]
	permission_classes = [IsAuthenticated]

	def get(self, request, format=None):
		user = request.user
		profile = Profile.objects.get(registered_email=request.user)
		# print(profile.name)
		serializer = {
			"email": profile.registered_email.email,
			"name": profile.name,
			"phone_number": profile.phone_number,
			"gender": profile.gender,
			"blood_group": profile.blood_group,
			"date_of_birth": profile.date_of_birth,
			"address": profile.address,
			# "image" : profile.image.url
		}
		return JsonResponse(serializer, status=status.HTTP_200_OK)

	# def post(self, request, format=None):
	# 	serializer = UserProfileSerializer(data=request.data)
	# 	if serializer.is_valid():
	# 		serializer.save(registered_email=request.user)
	# 		return Response(serializer.data, status=status.HTTP_201_CREATED)
	# 	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def put(self, request, format=None):
		profile = Profile.objects.get(registered_email=request.user)
		serializer = ProfileSerializer(profile, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class RegisterViewSet(viewsets.ModelViewSet):
#     queryset = Register.objects.all()
#     serializer_class = RegisterSerializer
#     permission_classes = [AllowAny]  # Allow creation without authentication

#     def create(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class ProfileViewSet(viewsets.ModelViewSet):
	queryset = Profile.objects.all()
	serializer_class = ProfileSerializer


# class MedicineViewSet(viewsets.ModelViewSet):
# 	queryset = Medicine.objects.all()
# 	serializer_class = MedicineSerializer


class MedicineListAPIView(APIView):
	def get(self, request):
		medicines = Medicine.objects.all()
		serializer = MedicineSerializer(medicines, many=True)
		return Response(serializer.data)


class MedicineViewSet(viewsets.ModelViewSet):
	queryset = Medicine.objects.all()
	serializer_class = MedicineSerializer


# class MedicineListAPIView(APIView):
# 	def get(self, request):
# 		medicines = Medicine.objects.all()
# 		serializer = MedicineSerializer(medicines, many=True)
# 		return Response(serializer.data)


class AddtoCartAPIView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request):
		user = request.user
		cart_items = AddtoCart.objects.filter(user=user)
		serializer = AddtoCartSerializer(cart_items, many=True)
		return Response(serializer.data)

	def post(self, request):
		serializer = AddtoCartSerializer(data=request.data)
		if serializer.is_valid():
			# Check if medicine exists and has enough quantity
			medicine_id = request.data.get('medicine_id')
			qty = request.data.get('qty')
			try:
				# Check if the product is already in the cart
				cart_item = AddtoCart.objects.get(
					user=request.user, medicine_id=medicine_id)
				# If the product is already in the cart, update the quantity
				# Ensure qty is converted to int
				new_qty = cart_item.qty + int(qty)
				print(new_qty > 10)
				if (cart_item.medicine_id.qty < new_qty) or (new_qty > 10):
					return Response({'error': 'Insufficient medicine stock'}, status=status.HTTP_400_BAD_REQUEST)
				cart_item.qty = new_qty
				cart_item.save()
			except AddtoCart.DoesNotExist:
				# If the product is not in the cart, add it as a new entry
				# Ensure qty is converted to int
				if Medicine.objects.get(pk=medicine_id).qty < int(qty):
					return Response({'error': 'Insufficient medicine stock'}, status=status.HTTP_400_BAD_REQUEST)
				serializer.save(user=request.user)
				cart_item = AddtoCart.objects.get(
					user=request.user, medicine_id=medicine_id)
				cart_item.price = cart_item.medicine_id.price
				cart_item.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def put(self, request):
		try:
			cart_id = request.data.get("cart_id")
			cart_item = AddtoCart.objects.get(id=cart_id, user=request.user)
		except AddtoCart.DoesNotExist:
			return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

		serializer = AddtoCartSerializer(
			cart_item, data=request.data, partial=True)
		if serializer.is_valid():
			# Check if medicine exists and has enough quantity
			qty = request.data.get('qty', cart_item.qty)
			medicine = cart_item.medicine_id
			if medicine.qty < qty:
				return Response({'error': 'Insufficient medicine stock'}, status=status.HTTP_400_BAD_REQUEST)
			serializer.save()
			return Response(serializer.data, status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request):
		try:
			cart_id = request.data.get("cart_id")
			cart_item = AddtoCart.objects.get(id=cart_id, user=request.user)

		except AddtoCart.DoesNotExist:
			return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

		cart_item.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)


class OrderListAPIView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request):
		orders = OrderList.objects.filter(user=request.user)
		serializer = OrderSerializer(orders, many=True)
		return Response(serializer.data)

	def post(self, request):

		cart_id = request.data.get('cart_id')
		print(request)
		cart = AddtoCart.objects.get(id=cart_id, user=request.user)
		pay = Payment.objects.filter(cartid=cart)
		print(pay)
		for p in pay:
			checkorder = client.order.fetch(p.rozorpay_order_id)
			print(checkorder)
		if checkorder['status'] == 'paid':
			serializer = OrderSerializer(data=request.data)
			pay.delete()
			if serializer.is_valid():
				serializer.save(user=request.user)
				if cart_id:
					AddtoCart.objects.filter(
						id=cart_id, user=request.user).delete()

				return Response(serializer.data, status=status.HTTP_201_CREATED)
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def put(self, request):
		try:
			order_id = request.data.get('order_id')
			order = OrderList.objects.get(id=order_id, user=request.user)
		except OrderList.DoesNotExist:
			return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

		with transaction.atomic():
			# Update order status to canceled
			order.status = 'Cancelled'
			order.save()

			# Update medicine quantity
			medicine = order.medicine_id
			medicine.qty += order.qty
			medicine.save()

		return Response({'msg': 'Order canceled'}, status=status.HTTP_200_OK)


class ContactViewSet(viewsets.ModelViewSet):
	queryset = Contact.objects.all()
	serializer_class = ContactSerializer

	def create(self, request, *args, **kwargs):
		name = request.data.get('name')
		email = request.data.get('email')
		contactEmail(request, name, email)
		# Do something with name and email, such as saving them to the database
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_create(serializer)
		headers = self.get_success_headers(serializer.data)
		return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

	def perform_create(self, serializer):
		serializer.save()


class TestBookViewSet(viewsets.ModelViewSet):
	queryset = TestBook.objects.all()
	serializer_class = TestBookSerializer


@api_view(["POST"])
def predict(request):
	try:
		mydata = request.data
		print(mydata)
		ml = joblib.load('api/rf_model.pkl')
		df1 = pd.read_csv('api/data.csv')
		df1 = df1.drop(['target'], axis=1)
		new_row_df = pd.DataFrame([mydata])
		# Append the new row to the existing DataFrame
		df = pd.concat([df1, new_row_df])
		df = pd.get_dummies(df, drop_first=True)
		# df = df.append(new_row_df, ignore_index=True)
		# df = pd.DataFrame(mydata,index=[0])
		cols_to_scale = ['age', 'resting_blood_pressure',
						 'cholesterol', 'max_heart_rate_achieved', 'st_depression']
		df = df.iloc[[-1]]
		scalers = joblib.load("api/scale.pkl")
		scaled_data = scalers.transform(df[cols_to_scale])
		df[cols_to_scale] = scaled_data.flatten()
		print(df)
		result = ml.predict(df)
		print(result)
		newdf = pd.DataFrame(result, columns=['predict'])
		# # print(result)
		return JsonResponse(newdf.to_dict(orient='records'), safe=False)
	except ValueError as e:
		return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def bot(request):
	try:
		msg = request.data.get('msg')
		res = chatbotres(msg)
		return JsonResponse({"response": res}, status=status.HTTP_200_OK)
	except Exception as e:
		return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def PaymentView(request):
	try:
		items = AddtoCart.objects.filter(user=request.user)
		total = 0
		for item in items:
			total += (item.price * item.qty)
		# total = sum(item.price*item.qty for item in items)
		total = total * 100  # Convert to paisa
		payment = client.order.create({
			"amount": float(total),
			"currency": "INR",
			"receipt": "receipt#1",
			"notes": {
				"key1": "value3",
				"key2": "value2"
			}
		})
		for item in items:
			pay = Payment(cartid=item, rozorpay_order_id=payment['id'])
			pay.save()
		context = {
			"total": float(total),
			"paymentid": payment['id']
		}
		print(context)
		return JsonResponse(context, status=status.HTTP_200_OK)
	except Exception as e:
		return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


def otpEmail(request, otp, to_email):
	try:
		mail_subject = 'OTP Email'
		message = render_to_string('otp.html', {'otp': otp})
		email = EmailMessage(mail_subject, message, to=[to_email])
		email.content_subtype = 'html'  # Set the content type to HTML
		email.send()
		messages.success(request, f'Mail sent successfully to {to_email}.')
	except Exception as e:
		messages.error(request, f'Failed to send email: {e}.')


@api_view(["GET"])
def otp(request, email):
	try:
		random_number = random.randint(100000, 999999)
		otpEmail(request, random_number, email)
		context = {
			"otp": random_number,
			"email": email
		}
		return JsonResponse(context, status=status.HTTP_200_OK)
	except Exception as e:
		return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def activate(request, email):
	try:
		# User = get_user_model()
		print(email)
		user_instance = User.objects.get(email=email)
		print(user_instance)
		user_instance.is_active = True
		user_instance.save()
		token = get_tokens_for_user(user_instance)
		print(token)
		context = {
			'token': token,
			'msg': 'Account activation Successful'
		}
		return JsonResponse(context, status=status.HTTP_201_CREATED)
	except Exception as e:
		return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
