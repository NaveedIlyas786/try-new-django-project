# serializers.py in the "Estimating" app

from rest_framework import serializers
from .models import Estimating

class EstimatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estimating
        fields = '__all__' # to include all fields in the API
