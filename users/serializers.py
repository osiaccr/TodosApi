from rest_framework import serializers
from rest_auth.models import TokenModel
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ('id', 'username', 'email')


class TokenSerializer(serializers.ModelSerializer):
    """
    Serializer for Token model, i.e. what gets returned on login
    """
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = TokenModel
        fields = ('user', )
