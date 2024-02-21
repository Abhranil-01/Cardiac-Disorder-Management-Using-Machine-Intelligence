from django.db import models
from datetime import date
# Create your models here.

class Register(models.Model):
	name = models.CharField(max_length=100)
	email = models.EmailField(unique=True)
	phone_number = models.CharField(max_length=15)
	password = models.CharField(max_length=100)
	id = models.AutoField(primary_key=True)
	def __str__(self):
		return self.name

class Profile(models.Model):
	registered_email = models.OneToOneField(Register, on_delete=models.CASCADE, related_name='profile', primary_key=True)
	image = models.ImageField(upload_to='profile_images/', default='profile_images/default.jpg')
	blood_group = models.CharField(max_length=5, blank=True, null=True)
	location = models.CharField(max_length=100, blank=True, null=True)
	date_of_birth = models.DateField(default=date.today,blank=True, null=True)


	def __str__(self):
		return self.registered_email.email

class Medicine(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='medicine_images/', default='medicine_images/default.jpg')
    qty = models.IntegerField()
    type = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name

class Contact(models.Model):
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    query = models.TextField()

    def __str__(self):
        return self.name

class TestBook(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    time = models.DateTimeField()

    def __str__(self):
        return self.name