# Generated by Django 4.2.4 on 2023-10-05 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Estimating', '0010_alter_company_cmpny_name_alter_company_adress_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='Cmpny_Name',
            field=models.CharField(blank=True, max_length=50, null=True, unique=True, verbose_name='Company Name'),
        ),
    ]
