from django.contrib import admin
from django.urls import path


from .views import sample_view, protected_endpoint

urlpatterns = [
    path('sample/', sample_view, name='sample'),
    path('protected/', protected_endpoint, name='protected_endpoint'),
]
