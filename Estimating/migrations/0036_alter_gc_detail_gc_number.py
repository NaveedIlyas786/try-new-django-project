# Generated by Django 4.2.4 on 2024-01-05 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Estimating', '0035_remove_estimating_bidder_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gc_detail',
            name='gc_number',
            field=models.IntegerField(blank=True, max_length=50, null=True, verbose_name='GC Number'),
        ),
    ]
