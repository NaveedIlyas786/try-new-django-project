# Generated by Django 4.2.4 on 2024-02-05 18:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0057_alter_qualification_detail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='credited_material',
            name='pco',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='projects.pco', verbose_name='credited_materials'),
        ),
        migrations.AlterField(
            model_name='debited_material',
            name='pco',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='projects.pco', verbose_name='debited_materials'),
        ),
        migrations.AlterField(
            model_name='labor',
            name='pco',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='projects.pco', verbose_name='labor'),
        ),
        migrations.AlterField(
            model_name='miscellaneous',
            name='pco',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='projects.pco', verbose_name='miscellaneous'),
        ),
        migrations.AlterField(
            model_name='qualification',
            name='pco',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='projects.pco', verbose_name='qualifications'),
        ),
    ]
