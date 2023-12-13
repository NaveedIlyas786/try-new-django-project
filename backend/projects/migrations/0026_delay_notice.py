# Generated by Django 4.2.4 on 2023-12-13 16:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Estimating', '0030_alter_spec_detail_number'),
        ('projects', '0025_hds_system_custom_laborrate_custom'),
    ]

    operations = [
        migrations.CreateModel(
            name='Delay_Notice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('delay_num', models.IntegerField(blank=True, null=True, verbose_name='Delay Number #')),
                ('floor', models.CharField(blank=True, max_length=500, null=True, verbose_name='Floor')),
                ('area', models.CharField(blank=True, max_length=500, null=True, verbose_name='area')),
                ('schdul_num', models.IntegerField(blank=True, null=True, verbose_name='Schedule ID #')),
                ('date', models.DateField(blank=True, null=True, verbose_name='date')),
                ('Asocatd_rfi', models.BooleanField(blank=True, null=True, verbose_name='Assoicated RFI')),
                ('if_yes', models.IntegerField(blank=True, null=True, verbose_name='If Yes #')),
                ('open_date', models.DateField(blank=True, null=True, verbose_name='date Opened')),
                ('close_date', models.DateField(blank=True, null=True, verbose_name='date Closed')),
                ('dscrptn_impct', models.CharField(blank=True, max_length=5000, null=True, verbose_name='Detailed Description of Impact Trade:')),
                ('dscrptn_task', models.CharField(blank=True, max_length=5000, null=True, verbose_name='Schedule ID # and description of tasks that follow that will be affected:')),
                ('gc_forem', models.CharField(blank=True, max_length=500, null=True, verbose_name='GC Foreman or Supervisor Name:')),
                ('comnt', models.CharField(blank=True, max_length=5000, null=True, verbose_name='Additional Comments:')),
                ('preprd_by', models.CharField(blank=True, max_length=500, null=True, verbose_name='Prepared by:')),
                ('gnrl_cntrctr', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Estimating.gc_detail', verbose_name=True)),
                ('project', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='projects.project', verbose_name='slect project')),
            ],
        ),
    ]
