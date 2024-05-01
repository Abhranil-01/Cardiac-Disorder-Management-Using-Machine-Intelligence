from django.db import models
from datetime import date
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser

#  Custom User Manager
class UserManager(BaseUserManager):
  def create_user(self, email, name, phone_number, password=None, password2=None):
	  """
	  Creates and saves a User with the given email, name,phone_number and password.
	  """
	
	  if not email:
		  raise ValueError('User must have an email address')

	  user = self.model(
		  email=self.normalize_email(email),
		  name=name,
		 phone_number=phone_number,
	  )

	  user.set_password(password)
	  user.save(using=self._db)
	  return user

  def create_superuser(self, email, name,phone_number, password=None):
	  """
	  Creates and saves a superuser with the given email, name,phone_number and password.
	  """
	  user = self.create_user(
		  email,
		  password=password,
		  name=name,
		 phone_number=phone_number,
	  )
	  user.is_admin = True
	  user.save(using=self._db)
	  return user

#  Custom User Model
class User(AbstractBaseUser):
  email = models.EmailField(
	  verbose_name='Email',
	  max_length=255,
	  unique=True,
  )
  name = models.CharField(max_length=200)
  phone_number = models.CharField(max_length=13)
  is_active = models.BooleanField(default=True)
  is_admin = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  objects = UserManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name', 'phone_number']

  def __str__(self):
	  return self.email

  def has_perm(self, perm, obj=None):
	  "Does the user have a specific permission?"
	  # Simplest possible answer: Yes, always
	  return self.is_admin

  def has_module_perms(self, app_label):
	  "Does the user have permissions to view the app `app_label`?"
	  # Simplest possible answer: Yes, always
	  return True

  @property
  def is_staff(self):
	  "Is the user a member of staff?"
	  # Simplest possible answer: All admins are staff
	  return self.is_admin

class Profile(models.Model):
	registered_email = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', primary_key=True,blank=True)
	name = models.CharField(max_length=50, blank = True, null=True)
	phone_number = models.DecimalField(max_digits=10, decimal_places=0, null=True)
	gender = models.CharField(max_length=7, null=True,choices=[('male','male'),('female','female')])
	blood_group = models.CharField(max_length=5, blank=True, null=True)
	date_of_birth = models.DateField(default=date.today,blank=True, null=True)
	address = models.TextField(blank=True, null=True)
	image = models.ImageField(upload_to='profile_images/', default='profile_images/default.jpg')

	def __str__(self):
		return self.registered_email.email

class Medicine(models.Model):
	name = models.CharField(max_length=255)
	price = models.DecimalField(max_digits=10, decimal_places=2)
	image = models.ImageField(upload_to='medicine_images/', default='medicine_images/default.jpg')
	qty = models.IntegerField()
	type = models.CharField(max_length=255)
	featured = models.BooleanField(default=False)
	description = models.TextField()
	key_benifits = models.TextField(blank=True)
	Safety_Information = models.TextField(blank=True)
	Key_Ingredients = models.TextField(blank=True)
	def __str__(self):
		return self.name

class Contact(models.Model):
	name = models.CharField(max_length=255)
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

class AddtoCart(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE,blank=True)
	medicine_id = models.ForeignKey(Medicine, on_delete=models.CASCADE)
	price = models.DecimalField(max_digits=10, decimal_places=2,blank=True,null=True)
	qty = models.IntegerField() 

	def __str__(self):
		return f"{self.user.name}'s cart item: {self.medicine_id.name}"


class OrderList(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
	medicine_id  = models.ForeignKey(Medicine, on_delete=models.CASCADE)
	qty =  models.IntegerField()
	status = models.CharField(max_length=20, choices={
		'Pending':'Pending',
		'Accepted' : 'Accepted',
		'Shiping' : 'Shiping',
		'Out for delivery' : 'Out for delivery',
		'Delivered' : "Delivered",
		'Cancelled' : 'Cancelled'
	},default='Pending')
	price = models.DecimalField(max_digits=10, decimal_places=2,blank=True)
	updated = models.DateTimeField(auto_now=True,blank=True)
	created = models.DateTimeField(auto_now_add=True,blank=True)

	class Meta:
		ordering = ['-updated', '-created']

	def __str__(self):
		return f"{self.user.name}'s order: {self.medicine_id.name} ({self.status})"
	
