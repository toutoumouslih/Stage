# Generated by Django 5.1.7 on 2025-03-21 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('demographic_data', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='region',
            name='growth_rate',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='region',
            name='population_1965',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='region',
            name='population_1977',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='region',
            name='population_1988',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='region',
            name='population_2000',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='region',
            name='population_2013',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
