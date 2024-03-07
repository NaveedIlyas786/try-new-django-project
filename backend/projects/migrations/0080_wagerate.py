# Generated by Django 4.2.4 on 2024-03-07 16:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0079_alter_addmoreinstance_instancevalue'),
    ]

    operations = [
        migrations.CreateModel(
            name='WageRate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title_name', models.CharField(blank=True, max_length=500, null=True, verbose_name='Area name')),
                ('st_amount', models.FloatField(blank=True, null=True, verbose_name='ST Amount')),
                ('ot_amount', models.FloatField(blank=True, null=True, verbose_name='OT Amount')),
                ('dt_amount', models.FloatField(blank=True, null=True, verbose_name='DT Amount')),
                ('project', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='projects.project', verbose_name='add project')),
            ],
        ),
    ]
