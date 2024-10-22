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
	path('payment/',views.PaymentView, name='payment'),
    path('login/', views.UserLoginView.as_view(), name='login'),
    path('profile/', views.UserProfileView.as_view(), name='profile'),
	path('addtocart/', views.AddtoCartAPIView.as_view(), name='addtocart'),
	path('orderlist/', views.OrderListAPIView.as_view(), name='orderlist'),
	path('predict/',views.predict, name='predict' ),
	path('chatbot/',views.bot, name='chatbot' ),
	path('otp/<email>',views.otp, name='otp' ),
	path('activate/<email>',views.activate, name='activate' )
]