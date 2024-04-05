# Generated by Django 4.2.4 on 2024-01-09 18:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0035_remove_project_gc_phone_alter_project_forman_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='rfi',
            old_name='other_trd',
            new_name='bool1',
        ),
        migrations.RemoveField(
            model_name='project',
            name='gc_pm',
        ),
        migrations.RemoveField(
            model_name='rfi',
            name='attn',
        ),
        migrations.RemoveField(
            model_name='rfi',
            name='close_date',
        ),
        migrations.RemoveField(
            model_name='rfi',
            name='company',
        ),
        migrations.RemoveField(
            model_name='rfi',
            name='email',
        ),
        migrations.RemoveField(
            model_name='rfi',
            name='open_date',
        ),
        migrations.RemoveField(
            model_name='rfi',
            name='phne',
        ),
        migrations.AddField(
            model_name='rfi',
            name='bool2',
            field=models.BooleanField(blank=True, null=True, verbose_name='bool2'),
        ),
        migrations.AddField(
            model_name='rfi',
            name='bool3',
            field=models.BooleanField(blank=True, null=True, verbose_name='boll3'),
        ),
        migrations.AddField(
            model_name='rfi',
            name='date2',
            field=models.DateField(blank=True, null=True, verbose_name='Date'),
        ),
        migrations.AddField(
            model_name='rfi',
            name='name_log',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='Name Login'),
        ),
        migrations.AddField(
            model_name='rfi',
            name='title',
            field=models.CharField(blank=True, max_length=250, null=True, verbose_name='Title login'),
        ),
        migrations.AlterField(
            model_name='rfi',
            name='rply_by',
            field=models.DateField(blank=True, null=True, verbose_name='Date'),
        ),
        migrations.AlterField(
            model_name='rfi',
            name='rspns',
            field=models.CharField(blank=True, max_length=5000, null=True, verbose_name='Response'),
        ),
        migrations.AlterField(
            model_name='rfi',
            name='rspns_rqrd',
            field=models.DateField(blank=True, null=True, verbose_name='Date'),
        ),
        migrations.CreateModel(
            name='GC_aen',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gc_attn', models.CharField(blank=True, max_length=100, null=True, verbose_name='GC attn')),
                ('attn_email', models.EmailField(blank=True, max_length=254, null=True, verbose_name='Add GC Email')),
                ('attn_phone', models.CharField(blank=True, max_length=50, null=True, verbose_name='GC Phone number')),
                ('prjct', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='projects.project', verbose_name='Add Project')),
            ],
        ),
    ]