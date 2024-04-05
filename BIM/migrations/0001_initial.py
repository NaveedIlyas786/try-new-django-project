# Generated by Django 4.2.4 on 2024-03-07 19:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('projects', '0080_wagerate'),
    ]

    operations = [
        migrations.CreateModel(
            name='BIM',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bimRequirement', models.BooleanField(default=False)),
                ('materialDeadline', models.DateField(blank=True, null=True, verbose_name='Material Order Deadline')),
                ('materialVendor', models.CharField(blank=True, max_length=50, null=True, verbose_name='Material')),
                ('framingStartDate', models.DateField(blank=True, null=True, verbose_name='Metal Framing Scheduled Start Date')),
                ('modelAvailable', models.BooleanField(blank=True, default=False, null=True, verbose_name='Architect Model available')),
                ('estimatedModelTime', models.IntegerField(blank=True, null=True, verbose_name='Estimated Modeling Time Unit')),
                ('modelDeadline', models.DateField(blank=True, null=True, verbose_name='Model Deadline Metal Framing + Revit')),
                ('reviewComplete', models.FloatField(blank=True, null=True, verbose_name='% Review complete')),
                ('comments', models.CharField(blank=True, max_length=5000, null=True, verbose_name='Comments/Missing Items ')),
                ('project', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='projects.project', verbose_name='Select Project')),
            ],
        ),
    ]