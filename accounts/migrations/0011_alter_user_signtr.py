# Generated by Django 4.2.4 on 2024-01-22 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0010_user_signtr'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='signtr',
            field=models.BinaryField(blank=True, editable=True, null=True, verbose_name='Signature'),
        ),
    ]
