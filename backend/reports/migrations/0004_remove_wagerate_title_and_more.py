# Generated by Django 4.2.4 on 2024-03-07 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reports', '0003_rename_area_name_wageratedetail_title_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='wagerate',
            name='title',
        ),
        migrations.AlterField(
            model_name='wageratedetail',
            name='title_name',
            field=models.CharField(blank=True, max_length=500, null=True, verbose_name='Tile name'),
        ),
    ]