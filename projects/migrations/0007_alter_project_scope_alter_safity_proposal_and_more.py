# Generated by Django 4.2.4 on 2023-10-14 22:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Estimating', '0015_rename_jon_title_dms_dertory_job_title'),
        ('projects', '0006_safity_proposal_shopdrawing_proposal_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='scope',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Estimating.proposal', verbose_name='Add Proposal'),
        ),
        migrations.AlterField(
            model_name='safity',
            name='proposal',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Estimating.proposal', verbose_name='Add Proposal'),
        ),
        migrations.AlterField(
            model_name='safity',
            name='scop_work_number',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Estimating.specification', verbose_name='Add scope of Work'),
        ),
        migrations.AlterField(
            model_name='shopdrawing',
            name='proposal',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Estimating.proposal', verbose_name='Add Proposal'),
        ),
        migrations.AlterField(
            model_name='shopdrawing',
            name='scop_work_number',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Estimating.specification', verbose_name='Add scope of Work'),
        ),
        migrations.AlterField(
            model_name='submittals',
            name='proposal',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Estimating.proposal', verbose_name='Add Proposal'),
        ),
        migrations.AlterField(
            model_name='submittals',
            name='scop_work_number',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Estimating.specification', verbose_name='Add scope of Work'),
        ),
    ]
