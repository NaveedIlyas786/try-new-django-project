# serializers.py
from rest_framework import serializers
from .models import Project, Project_detail



class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id','estimating','job_num','prjct_engnr','bim_oprtr','Forman','prjct_mngr','start_date']

        extra_kwargs = {
            'estimating': {'required': True},
            'job_num': {'required': True},
            'prjct_engnr': {'required': True},
            'bim_oprtr': {'required': True},
            'Forman': {'required': True},
            'prjct_mngr': {'required': True},
            'start_date': {'required': True},
        }



    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['estimating'] = instance.estimating.Prjct_Name if instance.estimating else None
        representation['prjct_engnr'] = instance.prjct_engnr.full_Name if instance.prjct_engnr else None
        representation['bim_oprtr'] = instance.bim_oprtr.full_Name if instance.bim_oprtr else None
        representation['Forman'] = instance.Forman.full_Name if instance.Forman else None
        representation['prjct_mngr'] = instance.prjct_engnr.full_Name if instance.prjct_mngr else None


        return representation
        





class RecursiveProjectDetailSerializer(serializers.Serializer):
    """Serializer for recursive Estimating_detail children."""
    def to_representation(self, value):
        serializer = ProjectDetailSerializer(value, context=self.context)
        return serializer.data

class ProjectDetailSerializer(serializers.ModelSerializer):
    children = RecursiveProjectDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Project_detail
        fields = ['id', 'drctry_Name', 'prjct_id', 'prnt_id', 'file_type', 'file_name', 'children']

