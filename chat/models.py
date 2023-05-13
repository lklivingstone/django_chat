from django.db import models
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
User= get_user_model()

# Create your models here.

class Contact(models.Model):
    user= models.ForeignKey(User, related_name='friends', on_delete=models.CASCADE)
    friends= models.ManyToManyField('self', blank=True)

    def __str__(self):
        return self.user.username


class Message(models.Model):
    contact= models.ForeignKey(Contact, related_name='messages', on_delete=models.CASCADE)
    content= models.TextField()
    timestamp= models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.contact.user.username
    
class Chat(models.Model):
    participants= models.ManyToManyField(Contact, related_name='chats')
    messages= models.ManyToManyField(Message, blank=True) 
    
    def __str__(self):
        return "{}".format(self.pk)