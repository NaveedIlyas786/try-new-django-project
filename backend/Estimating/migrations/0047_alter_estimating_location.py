# Generated by Django 4.2.4 on 2024-03-04 20:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Estimating', '0046_alter_addendum_addendum_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='estimating',
            name='location',
            field=models.CharField(blank=True, default='California', max_length=250, null=True, verbose_name='Location'),
        ),
    ]
