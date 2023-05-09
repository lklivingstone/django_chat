from django.shortcuts import render
from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes


@api_view(['GET'])
def sample_view(request):
    data = ['foo', 'bar', 'baz']
    return Response(data)

@api_view(['POST'])
def user_check(request):
    
    username = request.data.get("username")
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        return Response({'username': username})
    else:
        return Response({'message': 'User is not valid'})

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def protected_endpoint(request):
    return Response({'protected': 'data'})