from rest_auth.models import TokenModel
from rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers

class TokenSerializer(serializers.ModelSerializer):
    """
    Serializer for Token model, i.e. what gets returned on login
    """
    user = UserDetailsSerializer(many=False, read_only=True)

    class Meta:
        model = TokenModel
        fields = ('user', )