# Generated by Django 4.2.4 on 2023-09-25 19:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0003_alter_project_detail_file_name_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project_detail',
            old_name='prjct_ID',
            new_name='prjct_id',
        ),
        migrations.RenameField(
            model_name='project_detail',
            old_name='prnt_ID',
            new_name='prnt_id',
        ),
    ]
