# Generated by Django 4.2.4 on 2023-10-24 14:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0010_alter_project_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='scope',
            new_name='proposal',
        ),
    ]