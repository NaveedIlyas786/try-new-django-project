# Generated by Django 4.2.4 on 2023-10-31 19:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0017_safity_scopworknumber_shopdrawing_scopworknumber_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='onbuild',
            name='status',
            field=models.CharField(blank=True, choices=[('Upload', 'Upload'), ('Pending', 'Pending')], default='Pending', max_length=50, null=True, verbose_name='HDS System'),
        ),
    ]
