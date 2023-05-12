from django.contrib import admin

# Register your models here.

from .models import Message, Contact, Chat

admin.site.register(Message)
admin.site.register(Contact)
admin.site.register(Chat)
