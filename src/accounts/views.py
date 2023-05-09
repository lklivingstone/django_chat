from django.shortcuts import render

# Create your views here.
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, permissions
from .serializers import UserSerializer, RegisterSerializer
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status

from .models import CustomUser

class LoginView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
       username = request.data.get('username')
       password = request.data.get('password')
       user = authenticate(request, username=username, password=password)

       if user is not None:
           refresh = RefreshToken.for_user(user)
           return Response({
               'access_token': str(refresh.access_token),
               'username': user.username
           }, status=status.HTTP_200_OK)
       else:
           return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)
