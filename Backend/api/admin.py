from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Medicine, Contact, TestBook, Profile
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
    def image_preview(self, obj):
        if obj.image:
            return mark_safe('<img src="{url}" width="100px" />'.format(url=obj.image.url))
        else:
            return 'No Image'

    image_preview.short_description = 'Image Preview'

    list_display = ('get_email', 'blood_group', 'image_preview', 'location')
    search_fields = ('registered_email__email', 'blood_group', 'location')

    def get_email(self, obj):
        return obj.registered_email.email

    get_email.short_description = 'Email'

    fieldsets = (
        (None, {
            'fields': ('registered_email', 'blood_group', 'image', 'location')
        }),
    )


@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'qty', 'type')
    search_fields = ('name', 'type')
    list_filter = ('type',)

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'phone_number', 'email')
    search_fields = ('name', 'phone_number', 'email')

@admin.register(TestBook)
class TestBookAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'type', 'price', 'time')
    search_fields = ('name', 'type')
    list_filter = ('type',)