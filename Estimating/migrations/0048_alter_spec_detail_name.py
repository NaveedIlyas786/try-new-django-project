# Generated by Django 4.2.4 on 2024-03-05 15:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Estimating', '0047_alter_estimating_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spec_detail',
            name='name',
            field=models.CharField(blank=True, max_length=250, null=True, verbose_name='Name'),
        ),
    ]