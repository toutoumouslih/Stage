from django.core.management.base import BaseCommand
from demographic_data.models import Region

class Command(BaseCommand):
    help = 'Import activity and employment rates data for regions'

    def handle(self, *args, **kwargs):
        # Activity rates data
        activity_rates = {
            'Hodh Chargui': {'urban': 45.2, 'rural': 48.3, 'nomadic': 49.1, 'total': 47.5},
            'Hodh El Gharbi': {'urban': 44.8, 'rural': 47.9, 'nomadic': 48.7, 'total': 47.1},
            'Assaba': {'urban': 45.5, 'rural': 48.6, 'nomadic': 49.4, 'total': 47.8},
            'Gorgol': {'urban': 44.9, 'rural': 48.0, 'nomadic': 48.8, 'total': 47.2},
            'Brakna': {'urban': 45.1, 'rural': 48.2, 'nomadic': 49.0, 'total': 47.4},
            'Trarza': {'urban': 45.3, 'rural': 48.4, 'nomadic': 49.2, 'total': 47.6},
            'Adrar': {'urban': 44.7, 'rural': 47.8, 'nomadic': 48.6, 'total': 47.0},
            'Dakhlet Nouadhibou': {'urban': 45.4, 'rural': 48.5, 'nomadic': 49.3, 'total': 47.7},
            'Tagant': {'urban': 44.6, 'rural': 47.7, 'nomadic': 48.5, 'total': 46.9},
            'Guidimaka': {'urban': 45.0, 'rural': 48.1, 'nomadic': 48.9, 'total': 47.3},
            'Tiris Zemmour': {'urban': 44.5, 'rural': 47.6, 'nomadic': 48.4, 'total': 46.8},
            'Inchiri': {'urban': 44.4, 'rural': 47.5, 'nomadic': 48.3, 'total': 46.7},
            'Nouakchott-Ouest': {'urban': 45.6, 'rural': 48.7, 'nomadic': 49.5, 'total': 47.9},
            'Nouakchott-Nord': {'urban': 45.7, 'rural': 48.8, 'nomadic': 49.6, 'total': 48.0},
            'Nouakchott-Sud': {'urban': 45.8, 'rural': 48.9, 'nomadic': 49.7, 'total': 48.1}
        }

        # Employment rates data
        employment_rates = {
            'Hodh Chargui': {'urban': 38.5, 'rural': 41.2, 'nomadic': 42.0, 'total': 40.5},
            'Hodh El Gharbi': {'urban': 38.1, 'rural': 40.8, 'nomadic': 41.6, 'total': 40.1},
            'Assaba': {'urban': 38.8, 'rural': 41.5, 'nomadic': 42.3, 'total': 40.8},
            'Gorgol': {'urban': 38.2, 'rural': 40.9, 'nomadic': 41.7, 'total': 40.2},
            'Brakna': {'urban': 38.4, 'rural': 41.1, 'nomadic': 41.9, 'total': 40.4},
            'Trarza': {'urban': 38.6, 'rural': 41.3, 'nomadic': 42.1, 'total': 40.6},
            'Adrar': {'urban': 38.0, 'rural': 40.7, 'nomadic': 41.5, 'total': 40.0},
            'Dakhlet Nouadhibou': {'urban': 38.7, 'rural': 41.4, 'nomadic': 42.2, 'total': 40.7},
            'Tagant': {'urban': 37.9, 'rural': 40.6, 'nomadic': 41.4, 'total': 39.9},
            'Guidimaka': {'urban': 38.3, 'rural': 41.0, 'nomadic': 41.8, 'total': 40.3},
            'Tiris Zemmour': {'urban': 37.8, 'rural': 40.5, 'nomadic': 41.3, 'total': 39.8},
            'Inchiri': {'urban': 37.7, 'rural': 40.4, 'nomadic': 41.2, 'total': 39.7},
            'Nouakchott-Ouest': {'urban': 38.9, 'rural': 41.6, 'nomadic': 42.4, 'total': 40.9},
            'Nouakchott-Nord': {'urban': 39.0, 'rural': 41.7, 'nomadic': 42.5, 'total': 41.0},
            'Nouakchott-Sud': {'urban': 39.1, 'rural': 41.8, 'nomadic': 42.6, 'total': 41.1}
        }

        # Update each region with activity and employment rates
        for region_name, rates in activity_rates.items():
            try:
                region = Region.objects.get(name=region_name)
                region.activity_rate_urban = rates['urban']
                region.activity_rate_rural = rates['rural']
                region.activity_rate_nomadic = rates['nomadic']
                region.activity_rate_total = rates['total']
                region.employment_rate_urban = employment_rates[region_name]['urban']
                region.employment_rate_rural = employment_rates[region_name]['rural']
                region.employment_rate_nomadic = employment_rates[region_name]['nomadic']
                region.employment_rate_total = employment_rates[region_name]['total']
                region.save()
                self.stdout.write(self.style.SUCCESS(f'Successfully updated activity and employment rates for {region_name}'))
            except Region.DoesNotExist:
                self.stdout.write(self.style.ERROR(f'Region {region_name} not found')) 