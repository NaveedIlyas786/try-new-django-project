# Generated by Django 4.2.4 on 2024-02-01 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0053_rename_uthr_name_pco_log_auther_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='labor',
            name='typ',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='Type Rate'),
        ),
    ]
