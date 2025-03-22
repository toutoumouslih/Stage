# Generated by Django 5.1.7 on 2025-03-20 01:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Region',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('code', models.CharField(max_length=10, unique=True)),
                ('capital', models.CharField(max_length=100)),
                ('population', models.IntegerField()),
                ('male_population', models.IntegerField()),
                ('female_population', models.IntegerField()),
                ('literacy', models.FloatField()),
                ('employment_rate', models.FloatField()),
                ('average_age', models.FloatField()),
                ('households', models.IntegerField()),
                ('coordinates', models.JSONField()),
            ],
            options={
                'ordering': ['name'],
            },
        ),
    ]
