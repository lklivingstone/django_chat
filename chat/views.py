from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, get_user_model
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes


from rest_framework import permissions
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)

from .models import Chat, Contact
from .serializers import ChatSerializer

User= get_user_model()

@api_view(['GET'])
def sample_view(request):
    data = ['foo', 'bar', 'baz']
    return Response(data)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def protected_endpoint(request):
    return Response({'protected': 'data'})


###

def last_15_messages(chatID):
    chat= get_object_or_404(Chat, id= chatID)
    return chat.messages.order_by('-timestamp').all()

def get_user_contact(username):
    user= get_object_or_404(User, username=username)
    return get_object_or_404(Contact, user=user)

def get_current_chat(chatID):
    return get_object_or_404(Chat, id=chatID)

###

class ChatListView(ListAPIView):
    # queryset= Chat.objects.all()
    serializer_class= ChatSerializer
    permission_classes= [permissions.AllowAny, ]

    def get_queryset(self):
        queryset= Chat.objects.all()
        username= self.request.query_params.get('username', None)

        if username is not None:
            user= get_object_or_404(User, username=username)
            contact= get_object_or_404(Contact, user=user)

            queryset= contact.chats.all()

        return queryset

class ChatDetailView(RetrieveAPIView):
    queryset= Chat.objects.all()
    serializer_class= ChatSerializer
    permission_classes= [permissions.AllowAny, ]

class ChatCreateView(CreateAPIView):
    queryset= Chat.objects.all()
    serializer_class= ChatSerializer
    permission_classes= [permissions.IsAuthenticated, ]

class ChatUpdateView(UpdateAPIView):
    queryset= Chat.objects.all()
    serializer_class= ChatSerializer
    permission_classes= [permissions.IsAuthenticated, ]

class ChatDeleteView(DestroyAPIView):
    queryset= Chat.objects.all()
    serializer_class= ChatSerializer
    permission_classes= [permissions.IsAuthenticated, ]
