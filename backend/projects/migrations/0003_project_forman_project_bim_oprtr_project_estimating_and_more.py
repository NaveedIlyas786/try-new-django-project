# Generated by Django 4.2.4 on 2023-10-12 21:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Estimating', '0014_dprtmnt_role_dms_dertory'),
        ('projects', '0002_remove_project_forman_remove_project_bim_oprtr_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='Forman',
            field=models.ForeignKey(blank=True, limit_choices_to=models.Q(('roles__name', 'Foreman'), ('roles__name', 'General Superintendent'), _connector='OR'), null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Forman_as_Forman', to=settings.AUTH_USER_MODEL, verbose_name='FOREMAN/Superintendent'),
        ),
        migrations.AddField(
            model_name='project',
            name='bim_oprtr',
            field=models.ForeignKey(blank=True, limit_choices_to=models.Q(('roles__name', 'BIM'), ('roles__name', 'BIM Modeler/Trimble Operator'), ('roles__name', 'BIM/Manager PR'), _connector='OR'), null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Bim_Operator', to=settings.AUTH_USER_MODEL, verbose_name='BIM Modeler'),
        ),
        migrations.AddField(
            model_name='project',
            name='estimating',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='projects_start_date', to='Estimating.estimating', verbose_name='start date'),
        ),
        migrations.AddField(
            model_name='project',
            name='job_name',
            field=models.CharField(blank=True, max_length=50000, null=True, verbose_name='Add Job # Name'),
        ),
        migrations.AddField(
            model_name='project',
            name='job_num',
            field=models.PositiveIntegerField(blank=True, null=True, unique=True, verbose_name='Add Job #'),
        ),
        migrations.AddField(
            model_name='project',
            name='prjct_engnr',
            field=models.ForeignKey(blank=True, limit_choices_to=models.Q(('roles__name', 'Project Engineer')), null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Project_Engineer', to=settings.AUTH_USER_MODEL, verbose_name='Project Engineer'),
        ),
        migrations.AddField(
            model_name='project',
            name='prjct_mngr',
            field=models.ForeignKey(blank=True, limit_choices_to=models.Q(('roles__name', 'Project Manager')), null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Project_Manager', to=settings.AUTH_USER_MODEL, verbose_name='Project Manager'),
        ),
        migrations.AddField(
            model_name='project',
            name='scope',
            field=models.CharField(blank=True, max_length=500000, null=True, verbose_name='Scope (Description) '),
        ),
        migrations.AddField(
            model_name='project',
            name='start_date',
            field=models.DateField(blank=True, null=True, verbose_name='start Date(YYYY-MM-DD)'),
        ),
        migrations.AddField(
            model_name='project',
            name='status',
            field=models.CharField(blank=True, choices=[('C', 'C'), ('P', 'P'), ('Q', 'Q'), ('V', 'V'), ('X', 'X')], default='C', max_length=50, null=True),
        ),
    ]
