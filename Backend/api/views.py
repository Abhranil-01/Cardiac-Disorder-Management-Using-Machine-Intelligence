from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework import generics
from .models import  Medicine, Contact, TestBook, Profile
from .serializers import MedicineSerializer, ContactSerializer, TestBookSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .serializers import UserLoginSerializer, UserProfileSerializer, UserRegistrationSerializer,ProfileSerializer
from django.contrib.auth import authenticate
from .renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
import joblib
from rest_framework import viewsets
from rest_framework.decorators import api_view
# Generate Token Manually
import pickle
import joblib
import json
import numpy as np
from sklearn import preprocessing
import pandas as pd
from django.http import JsonResponse



def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
	  'refresh': str(refresh),
	  'access': str(refresh.access_token),
  }

class UserRegistrationView(APIView):
	renderer_classes = [UserRenderer]
	def post(self, request, format=None):
		serializer = UserRegistrationSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()
		token = get_tokens_for_user(user)
		return Response({'token':token, 'msg':'Registration Successful'}, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
	renderer_classes = [UserRenderer]
	def post(self, request, format=None):
		serializer = UserLoginSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		email = serializer.data.get('email')
		password = serializer.data.get('password')
		user = authenticate(email=email, password=password)
		if user is not None:
			token = get_tokens_for_user(user)
			return Response({'token':token, 'msg':'Login Success'}, status=status.HTTP_200_OK)
		else:
			return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)

class UserProfileView(APIView):
	renderer_classes = [UserRenderer]
	permission_classes = [IsAuthenticated]
	def get(self, request, format=None):
		serializer = UserProfileSerializer(request.user)
		return Response(serializer.data, status=status.HTTP_200_OK)


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

# class ProfileViewSet(viewsets.ModelViewSet):
# 	queryset = Profile.objects.all()
# 	serializer_class = ProfileSerializer
class MedicineViewSet(viewsets.ModelViewSet):
	queryset = Medicine.objects.all()
	serializer_class = MedicineSerializer

class ContactViewSet(viewsets.ModelViewSet):
	queryset = Contact.objects.all()
	serializer_class = ContactSerializer

class TestBookViewSet(viewsets.ModelViewSet):
	queryset = TestBook.objects.all()
	serializer_class = TestBookSerializer

@api_view(["POST"])
def predict(request):
	try:
		mydata = request.data
		ml = joblib.load('api/rf_model.pkl')
		df1 = pd.read_csv('api/data.csv')
		df1 = df1.drop(['target'],axis=1)
		new_row_df = pd.DataFrame([mydata])
		# Append the new row to the existing DataFrame
		df = pd.concat([df1, new_row_df])
		df = pd.get_dummies(df,drop_first=True)
		# df = df.append(new_row_df, ignore_index=True)
		# df = pd.DataFrame(mydata,index=[0])
		cols_to_scale = ['age', 'resting_blood_pressure', 'cholesterol', 'max_heart_rate_achieved', 'st_depression']
		df = df.iloc[[-1]]
		scalers = joblib.load("api/scale.pkl")
		scaled_data = scalers.transform(df[cols_to_scale])
		df[cols_to_scale] = scaled_data.flatten()
		result = ml.predict(df)
		newdf = pd.DataFrame(result, columns=['predict'])
		# # print(result)
		return JsonResponse(newdf.to_dict(orient='records' ), safe = False)
	except ValueError as e:
		return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


