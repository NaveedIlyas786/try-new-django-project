from typing import Required
from rest_framework import serializers
from .models import WageRateDetail

class WageRateSerializer(serializers.ModelSerializer):

    class Meta:
        model = WageRate
        fields = ['id', 'project','detail']
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for field_name, field in self.fields.items():
            field.required = False
    def save(self,**Kwargs):
        detail_data=self.validated_data.pop('wageratedetail_set',[])#type:ignore
        wage_instance = super().save(**kwargs)#type:ignore
        self._save_nested_data(detail_data, WageRateDetail, wage_instance)
        return wage_instance
    def _save_nested_data(self,data_list,ModelClass,parent_instance):
        for data in data_list:
            ModelClass.objects.create(pco=parent_instance,**data)
            



