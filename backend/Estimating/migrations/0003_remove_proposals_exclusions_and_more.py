# Generated by Django 4.2.4 on 2023-09-12 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Estimating', '0002_alter_propsalsservices_servicetyp'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='proposals',
            name='exclusions',
        ),
        migrations.AlterField(
            model_name='estimating',
            name='start_date',
            field=models.DateField(blank=True, null=True, verbose_name='start Date(YYYY-MM-DD)'),
        ),
        migrations.AlterField(
            model_name='propsalsservices',
            name='serviceTyp',
            field=models.CharField(choices=[('Exclusions', 'Exclusions'), ('Inclusions', 'Inclusions')], default='Exclusion', max_length=50, verbose_name='Service Type'),
        ),
        migrations.AlterField(
            model_name='service',
            name='services',
            field=models.CharField(max_length=250, verbose_name='add Serves(INCLUSIONS or EXCLUSIONS)'),
        ),
    ]
