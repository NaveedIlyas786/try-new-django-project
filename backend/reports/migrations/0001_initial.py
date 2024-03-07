# Generated by Django 4.2.4 on 2024-03-07 16:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='WageRate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=250, null=True, verbose_name='Add Title')),
            ],
        ),
        migrations.CreateModel(
            name='WageRateDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('area_name', models.CharField(blank=True, max_length=500, null=True, verbose_name='Area name')),
                ('st_amount', models.FloatField(blank=True, null=True, verbose_name='ST Amount')),
                ('ot_amount', models.FloatField(blank=True, null=True, verbose_name='OT Amount')),
                ('dt_amount', models.FloatField(blank=True, null=True, verbose_name='DT Amount')),
                ('title', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reports.wagerate', verbose_name='Add Title')),
            ],
        ),
    ]
