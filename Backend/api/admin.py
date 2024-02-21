from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import  Profile, Register, Medicine, Contact, TestBook

# Register your models here.


@admin.register(Register)
class RegisterAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone_number')
    search_fields = ('name', 'email', 'phone_number')

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