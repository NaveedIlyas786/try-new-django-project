from rest_framework import serializers
from .models import WageRate, WageRateTitle

class WageRateDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = WageRate
        fields = ['id', 'area_name', 'st_amount', 'ot_amount', 'dt_amount']

class WageRateTitleSerializer(serializers.ModelSerializer):
    detail = serializers.SerializerMethodField()

    class Meta:
        model = WageRateTitle
        fields = ['id', 'title', 'detail']

    def get_detail(self, obj):
        wage_rates = WageRate.objects.filter(title=obj)
        serializer = WageRateDetailSerializer(wage_rates, many=True)
        return serializer.data
