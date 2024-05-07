from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Medicine, Contact, TestBook, Profile, AddtoCart, OrderList
from .models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserModelAdmin(BaseUserAdmin):
  # The fields to be used in displaying the User model.
  # These override the definitions on the base UserModelAdmin
  # that reference specific fields on auth.User.
  list_display = ('id', 'email', 'name', 'phone_number', 'is_admin')
  list_filter = ('is_admin',)
  fieldsets = (
	  ('User Credentials', {'fields': ('email', 'password')}),
	  ('Personal info', {'fields': ('name', 'phone_number')}),
	  ('Permissions', {'fields': ('is_admin',)}),
  )
  # add_fieldsets is not a standard ModelAdmin attribute. UserModelAdmin
  # overrides get_fieldsets to use this attribute when creating a user.
  add_fieldsets = (
	  (None, {
		  'classes': ('wide',),
		  'fields': ('email', 'name', 'phone_number', 'password1', 'password2'),
	  }),
  )
  search_fields = ('email',)
  ordering = ('email', 'id')
  filter_horizontal = ()


# Now register the new UserModelAdmin...
admin.site.register(User, UserModelAdmin)
# Register your models here.


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
	# def image_preview(self, obj):
	# 	if obj.image:
	# 		return mark_safe('<img src="{url}" width="100px" />'.format(url=obj.image.url))
	# 	else:
	# 		return 'No Image'

	# image_preview.short_description = 'Image Preview'

	list_display = ('get_email', 'blood_group')
	search_fields = ('registered_email__email', 'blood_group')

	def get_email(self, obj):
		return obj.registered_email.email

	get_email.short_description = 'Email'

	fieldsets = (
		(None, {
			'fields': ('registered_email', 'blood_group', 'image','phone_number','address','gender','date_of_birth')
		}),
	)


@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):
	def preview_photo1(self, obj):
		if obj.image:
			return mark_safe('<img src="{url}" width="100px" />'.format(url=obj.image.url))
		else:
			return 'No Image'

	preview_photo1.short_description = 'Image Preview'
	list_display = ('id', 'name', 'price', 'qty', 'type','featured','preview_photo1')
	search_fields = ('name', 'type')
	list_filter = ('type',)

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
	list_display = ('id', 'name',  'email')
	search_fields = ('name','email')

@admin.register(TestBook)
class TestBookAdmin(admin.ModelAdmin):
	list_display = ('id', 'name', 'type', 'price', 'time')
	search_fields = ('name', 'type')
	list_filter = ('type',)

@admin.register(OrderList)
class OrderLIstAdmin(admin.ModelAdmin):
	list_display = ('user', 'medicine_id', 'qty','status', 'price')

@admin.register(AddtoCart)
class AddtoCard(admin.ModelAdmin):
	list_display = ('user', 'medicine_id', 'qty')
