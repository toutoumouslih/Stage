from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('demographic_data', '0013_region_illiteracy_rate_female_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='region',
            name='activity_rate_urban',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='region',
            name='activity_rate_rural',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='region',
            name='activity_rate_nomadic',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='region',
            name='activity_rate_total',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='region',
            name='employment_rate_urban',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='region',
            name='employment_rate_rural',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='region',
            name='employment_rate_nomadic',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='region',
            name='employment_rate_total',
            field=models.FloatField(blank=True, null=True),
        ),
    ] 