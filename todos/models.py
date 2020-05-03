from django.db import models
from django.contrib.auth import get_user_model
from rest_framework import serializers

from datetime import date

class Todo(models.Model):
    owner = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE
    )
    title = models.CharField(max_length=100)
    text = models.TextField()
    isCompleted = models.BooleanField(default=False)
    dateCreated = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title