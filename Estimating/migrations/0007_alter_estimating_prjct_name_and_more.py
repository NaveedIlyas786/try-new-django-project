# Generated by Django 4.2.4 on 2023-10-02 16:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Estimating', '0006_location_is_active_alter_estimating_bid_amount_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='estimating',
            name='Prjct_Name',
            field=models.CharField(max_length=250, verbose_name='Estimate Project Name'),
        ),
        migrations.AlterField(
            model_name='estimating',
            name='bid_amount',
            field=models.IntegerField(blank=True, null=True, verbose_name='Bid Amount '),
        ),
        migrations.AlterField(
            model_name='estimating',
            name='bidder',
            field=models.CharField(blank=True, max_length=1500, null=True, verbose_name='Bidder Name'),
        ),
        migrations.AlterField(
            model_name='estimating',
            name='company',
            field=models.ForeignKey(blank=True, limit_choices_to=models.Q(('is_active', True)), null=True, on_delete=django.db.models.deletion.CASCADE, related_name='company_in_estimator', to='Estimating.company', verbose_name='Company'),
        ),
        migrations.AlterField(
            model_name='estimating',
            name='due_date',
            field=models.DateField(blank=True, null=True, verbose_name='Due Date'),
        ),
        migrations.AlterField(
            model_name='estimating',
            name='estimator',
            field=models.ForeignKey(blank=True, limit_choices_to=models.Q(('is_active', True), ('roles__name', 'Estimator')), null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='estimations_as_estimator', to=settings.AUTH_USER_MODEL, verbose_name='Estimator'),
        ),
        migrations.AlterField(
            model_name='estimating',
            name='location',
            field=models.ForeignKey(blank=True, limit_choices_to=models.Q(('is_active', True)), null=True, on_delete=django.db.models.deletion.CASCADE, related_name='estimating_as_Area', to='Estimating.location', verbose_name='Add Area'),
        ),
    ]
