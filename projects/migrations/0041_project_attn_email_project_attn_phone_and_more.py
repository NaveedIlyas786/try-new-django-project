# Generated by Django 4.2.4 on 2024-01-11 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0040_remove_delay_notice_asocatd_rfi_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='attn_email',
            field=models.EmailField(blank=True, max_length=254, null=True, verbose_name='Add GC Email'),
        ),
        migrations.AddField(
            model_name='project',
            name='attn_phone',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='GC Phone number'),
        ),
        migrations.AddField(
            model_name='project',
            name='gc_attn',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='GC attn'),
        ),
        migrations.DeleteModel(
            name='GC_aen',
        ),
    ]
