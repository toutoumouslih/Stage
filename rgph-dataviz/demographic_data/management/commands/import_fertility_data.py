from django.core.management.base import BaseCommand
from demographic_data.models import Region
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Import fertility and birth rate data for regions'

    def handle(self, *args, **options):
        # Données de fécondité
        fertility_data = {
            'Hodh Chargui': {
                '1977': 6.27, '1988': 5.1, '2013': 4.8, '2023': 5.1
            },
            'Hodh El Gharbi': {
                '1977': 6.24, '1988': 4.7, '2013': 4.2, '2023': 5.2
            },
            'Assaba': {
                '1977': 5.83, '1988': 4.9, '2013': 4.3, '2023': 4.9
            },
            'Gorgol': {
                '1977': 7.0, '1988': 5.6, '2013': 5.0, '2023': 5.7
            },
            'Brakna': {
                '1977': 6.9, '1988': 4.8, '2013': 4.6, '2023': 5.2
            },
            'Trarza': {
                '1977': 5.96, '1988': 4.7, '2013': 3.8, '2023': 4.3
            },
            'Adrar': {
                '1977': 5.72, '1988': 4.3, '2013': 3.8, '2023': 4.0
            },
            'Dakhlet Nouadhibou': {
                '1977': 6.2, '1988': 5.0, '2013': 3.9, '2023': 3.9
            },
            'Tagant': {
                '1977': 5.5, '1988': 4.2, '2013': 4.5, '2023': 4.9
            },
            'Guidimakha': {
                '1977': 6.27, '1988': 6.5, '2013': 4.6, '2023': 5.6
            },
            'Tiris Zemmour': {
                '1977': 7.27, '1988': 4.3, '2013': 4.1, '2023': 4.0
            },
            'Inchiri': {
                '1977': 6.55, '1988': 3.7, '2013': 4.4, '2023': 4.4
            },
            'Nouakchott-Ouest': {
                '2013': 3.7, '2023': 3.5
            },
            'Nouakchott-Nord': {
                '2013': 3.7, '2023': 3.9
            },
            'Nouakchott-Sud': {
                '2013': 3.7, '2023': 4.2
            }
        }

        # Données de taux brut de natalité
        birth_rate_data = {
            'Hodh Chargui': {'2013': 35.0, '2023': 38.5},
            'Hodh El Gharbi': {'2013': 30.0, '2023': 34.7},
            'Assaba': {'2013': 32.0, '2023': 33.5},
            'Gorgol': {'2013': 35.0, '2023': 36.2},
            'Brakna': {'2013': 31.0, '2023': 34.6},
            'Trarza': {'2013': 35.0, '2023': 30.8},
            'Adrar': {'2013': 28.0, '2023': 27.8},
            'Dakhlet Nouadhibou': {'2013': 28.0, '2023': 26.2},
            'Tagant': {'2013': 28.0, '2023': 32.6},
            'Guidimakha': {'2013': 41.0, '2023': 35.9},
            'Tiris Zemmour': {'2013': 28.0, '2023': 23.9},
            'Inchiri': {'2013': 26.0, '2023': 22.8},
            'Nouakchott-Ouest': {'2013': 35.0, '2023': 26.7},
            'Nouakchott-Nord': {'2013': 35.0, '2023': 29.0},
            'Nouakchott-Sud': {'2013': 35.0, '2023': 30.2}
        }

        updated_count = 0
        for region_name, fertility_rates in fertility_data.items():
            try:
                region = Region.objects.get(name=region_name)
                
                # Mise à jour des taux de fécondité
                for year, rate in fertility_rates.items():
                    setattr(region, f'fertility_rate_{year}', rate)
                
                # Mise à jour des taux de natalité
                if region_name in birth_rate_data:
                    for year, rate in birth_rate_data[region_name].items():
                        setattr(region, f'birth_rate_{year}', rate)
                
                region.save()
                updated_count += 1
                self.stdout.write(self.style.SUCCESS(f'Données mises à jour pour {region_name}'))
                
            except Region.DoesNotExist:
                self.stdout.write(self.style.WARNING(f'Région {region_name} non trouvée'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Erreur lors de la mise à jour de {region_name}: {str(e)}'))

        self.stdout.write(self.style.SUCCESS(f'Import terminé. {updated_count} régions mises à jour.')) 