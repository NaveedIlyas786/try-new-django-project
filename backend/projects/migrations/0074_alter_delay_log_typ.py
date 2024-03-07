# Generated by Django 4.2.4 on 2024-03-01 20:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0073_alter_credited_material_quntty_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='delay_log',
            name='typ',
            field=models.CharField(blank=True, choices=[('Related PCO', 'Related PCO'), ('Related RFI', 'Related RFI'), ('Other Trades', 'Other Trades')], default='Other Trades', max_length=50, null=True, verbose_name='Select status'),
        ),
    ]