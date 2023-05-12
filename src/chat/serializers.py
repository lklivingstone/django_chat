from rest_framework import serializers
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, get_user_model
from .models import Chat, Contact
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError

User= get_user_model()

def get_user_contact(username):
    user= get_object_or_404(User, username=username)
    return get_object_or_404(Contact, user=user)


class ContactSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class ChatSerializer(serializers.ModelSerializer):
    participants= ContactSerializer(many=True)

    class Meta:
        model= Chat
        fields= ('id', 'messages', 'participants')

    def create(self, validated_data):

        participants= validated_data.pop('participants')
        contacts= []
        for username in participants:
            contact= get_user_contact(username)
            contacts.append(contact)
            # chat.participants.add(contact)

        # participant1= participants[0]
        # participant2= participants[1]
        # user1= get_object_or_404(User, username=participant1)
        # user2= get_object_or_404(User, username=participant2)

        # contact1= get_object_or_404(Contact, user=user1)
        # contact2= get_object_or_404(Contact, user=user2)

        # # participants2= [participants1[1], participants1[0]]
        # print(contact1)
        # print(contact2)
        if participants[0]==participants[1]:
            raise ValidationError({'error': 'No place for loners :('}, code=status.HTTP_406_NOT_ACCEPTABLE)

        chat= Chat.objects.filter(participants=contacts[0]) & Chat.objects.filter(participants=contacts[1])
        chat= chat.first()

        if chat is not None:
            raise ValidationError({'error': 'Chat already exists'}, code=status.HTTP_406_NOT_ACCEPTABLE)
        
        chat = Chat.objects.create()

        for username in participants:
            contact= get_user_contact(username)
            chat.participants.add(contact)

        chat.save()
        return chat




# from chat.models import Chat
# from chat.serializers import ChatSerializer
# chat= Chat.objects.get(id=3)
# s= ChatSerializer(instance=chat)
# s