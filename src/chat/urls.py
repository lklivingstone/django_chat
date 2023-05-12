from django.contrib import admin
from django.urls import path


from .views import (
    sample_view, 
    protected_endpoint,
    ChatListView,
    ChatDetailView,
    ChatCreateView,
    ChatUpdateView,
    ChatDeleteView
)

urlpatterns = [
    path('sample/', sample_view, name='sample'),
    path('protected/', protected_endpoint, name='protected_endpoint'),
    path('', ChatListView.as_view()),
    path('create/', ChatCreateView.as_view()),
    path('<pk>', ChatDetailView.as_view()),
    path('<pk>/update/', ChatUpdateView.as_view()),
    path('<pk>/delete/', ChatDeleteView.as_view()),
]
