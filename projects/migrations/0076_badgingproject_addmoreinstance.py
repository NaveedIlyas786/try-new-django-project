# Generated by Django 4.2.4 on 2024-03-06 14:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0075_project_badging'),
    ]

    operations = [
        migrations.CreateModel(
            name='BadgingProject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.CharField(blank=True, max_length=50, null=True, verbose_name='First Name')),
                ('lastName', models.CharField(blank=True, max_length=50, null=True, verbose_name='Late Name')),
                ('middle', models.CharField(blank=True, max_length=50, null=True, verbose_name='Midle')),
                ('phone', models.CharField(blank=True, max_length=50, null=True, verbose_name='Phone')),
                ('submittedDate', models.DateField(blank=True, null=True, verbose_name='Submitted date')),
                ('approvedDate', models.DateField(blank=True, null=True, verbose_name='Approved date')),
                ('resubmitDate', models.DateField(blank=True, null=True, verbose_name='Resubmit date')),
                ('renewedDate', models.DateField(blank=True, null=True, verbose_name='Renewed date')),
                ('tradeExpertise', models.CharField(blank=True, max_length=5000, null=True, verbose_name='Trade Expertise')),
                ('project', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='projects.project', verbose_name='slect project')),
            ],
        ),
        migrations.CreateModel(
            name='AddMoreInstance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('instanceName', models.CharField(blank=True, max_length=50, null=True, verbose_name='New Name')),
                ('badging', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='projects.badgingproject', verbose_name='slect Badging')),
            ],
        ),
    ]
