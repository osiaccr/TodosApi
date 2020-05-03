from django.shortcuts import render
from rest_framework import viewsets, serializers
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .permisions import IsOwner
from rest_framework.authentication import SessionAuthentication

from .models import Todo
from .serializer import TodoSerializer
from .permisions import IsOwner


class TodoView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsOwner]
    authentication_classes = (SessionAuthentication, )
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Todo.objects.all()
        else:
            user = self.request.user
            return Todo.objects.filter(owner=user)
