# Generated by Django 4.2.4 on 2023-10-19 12:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Estimating', '0018_rename_full_name_dms_dertory_first_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='estimating',
            old_name='bidder_address',
            new_name='bidder_detail',
        ),
        migrations.RemoveField(
            model_name='estimating',
            name='link',
        ),
        migrations.AlterField(
            model_name='dms_dertory',
            name='first_name',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='First Name'),
        ),
    ]
