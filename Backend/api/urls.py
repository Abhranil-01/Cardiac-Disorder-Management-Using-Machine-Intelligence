from django.urls import path,include
from api import views
from rest_framework import routers

router = routers.DefaultRouter()
# router.register('registers', views.RegisterViewSet, )
router.register('profiles', views.ProfileViewSet, )
router.register('medicines', views.MedicineViewSet)
router.register('contacts', views.ContactViewSet)
router.register('testbooks', views.TestBookViewSet)

urlpatterns =[
    path('',include(router.urls)),
	path('register/',views.UserRegistrationView.as_view(), name='register'),
    path('login/', views.UserLoginView.as_view(), name='login'),
    path('profile/', views.UserProfileView.as_view(), name='profile'),
]