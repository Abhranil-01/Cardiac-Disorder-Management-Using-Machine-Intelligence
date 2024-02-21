from rest_framework import serializers
from .models import Register, Profile, Medicine, Contact, TestBook


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['registered_email', 'blood_group', 'image', 'location','url']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields = ['name', 'email', 'phone_number', 'password','url']

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