# Generated by Django 4.2.4 on 2023-12-18 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0032_alter_pco_zip_city'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pco',
            name='date',
            field=models.DateField(blank=True, null=True, verbose_name='Date'),
        ),
    ]
