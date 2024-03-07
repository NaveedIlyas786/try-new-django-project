from typing import Required
from rest_framework import serializers
from .models import WageRateDetail

class WageRateSerializer(serializers.ModelSerializer):

    class Meta:
        model = WageRateDetail
        fields = ['id','project','titleName','st_amount','ot_amount','dt_amount']
        

