from django.core.management.base import BaseCommand
from demographic_data.models import Region
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Import mortality and life expectancy data for regions'

    def handle(self, *args, **options):
        # Données d'espérance de vie
        life_expectancy_data = {
            'Hodh Chargui': {'1988': 42.7, '2000': 52.6, '2023': 66.4},
            'Hodh El Gharbi': {'1988': 50.0, '2000': 65.1, '2023': 68.6},
            'Assaba': {'1988': 56.1, '2000': 62.3, '2023': 67.2},
            'Gorgol': {'1988': 52.2, '2000': 56.8, '2023': 66.9},
            'Brakna': {'1988': 48.1, '2000': 64.3, '2023': 69.5},
            'Trarza': {'1988': 50.3, '2000': 68.0, '2023': 70.8},
            'Adrar': {'1988': 42.4, '2000': 65.4, '2023': 68.1},
            'Dakhlet Nouadhibou': {'1988': 45.9, '2000': 63.5, '2023': 69.3},
            'Tagant': {'1988': 45.6, '2000': 69.4, '2023': 67.2},
            'Guidimakha': {'1988': 47.8, '2000': 62.1, '2023': 66.5},
            'Tiris Zemmour': {'1988': 47.3, '2000': 66.4, '2023': 72.2},
            'Inchiri': {'1988': 52.3, '2000': 72.5, '2023': 69.3},
            'Nouakchott-Ouest': {'1988': 49.6, '2000': 45.4, '2023': 76.0},
            'Nouakchott-Nord': {'1988': 49.6, '2000': 45.4, '2023': 71.2},
            'Nouakchott-Sud': {'1988': 49.6, '2000': 45.4, '2023': 71.1}
        }

        # Données de mortalité infantile
        infant_mortality_data = {
            'Hodh Chargui': {'2013': 80, '2019': 34, '2023': 41.5},
            'Hodh El Gharbi': {'2013': 72, '2019': 35, '2023': 34.4},
            'Assaba': {'2013': 69, '2019': 41, '2023': 38.9},
            'Gorgol': {'2013': 85, '2019': 42, '2023': 39.8},
            'Brakna': {'2013': 90, '2019': 36, '2023': 31.6},
            'Trarza': {'2013': 59, '2019': 28, '2023': 27.7},
            'Adrar': {'2013': 76, '2019': 69, '2023': 36.0},
            'Dakhlet Nouadhibou': {'2013': 68, '2019': 31, '2023': 32.2},
            'Tagant': {'2013': 64, '2019': 61, '2023': 39.0},
            'Guidimakha': {'2013': 78, '2019': 36, '2023': 41.0},
            'Tiris Zemmour': {'2013': 65, '2019': 38, '2023': 23.7},
            'Inchiri': {'2013': 73, '2019': 38, '2023': 32.3},
            'Nouakchott-Ouest': {'2013': 68, '2019': 22, '2023': 14.3},
            'Nouakchott-Nord': {'2013': 68, '2019': 26, '2023': 26.8},
            'Nouakchott-Sud': {'2013': 68, '2019': 13, '2023': 26.9}
        }

        # Données de mortalité infanto-juvénile
        child_mortality_data = {
            'Hodh Chargui': {'2019': 47.0, '2023': 60.7},
            'Hodh El Gharbi': {'2019': 48.0, '2023': 48.0},
            'Assaba': {'2019': 53.0, '2023': 55.9},
            'Gorgol': {'2019': 51.0, '2023': 57.5},
            'Brakna': {'2019': 43.0, '2023': 43.4},
            'Trarza': {'2019': 30.0, '2023': 36.9},
            'Adrar': {'2019': 85.0, '2023': 50.8},
            'Dakhlet Nouadhibou': {'2019': 38.0, '2023': 45.0},
            'Tagant': {'2019': 75.0, '2023': 56.2},
            'Guidimakha': {'2019': 44.0, '2023': 59.9},
            'Tiris Zemmour': {'2019': 42.0, '2023': 30.7},
            'Inchiri': {'2019': 42.0, '2023': 44.4},
            'Nouakchott-Ouest': {'2019': 28.0, '2023': 17.1},
            'Nouakchott-Nord': {'2019': 30.0, '2023': 35.3},
            'Nouakchott-Sud': {'2019': 19.0, '2023': 35.5}
        }

        # Données de taux brut de mortalité
        mortality_rate_data = {
            'Hodh Chargui': {'2013': 13.5, '2023': 7.5},
            'Hodh El Gharbi': {'2013': 8.6, '2023': 6.9},
            'Assaba': {'2013': 9.1, '2023': 7.3},
            'Gorgol': {'2013': 13.4, '2023': 7.0},
            'Brakna': {'2013': 10.7, '2023': 6.5},
            'Trarza': {'2013': 12.1, '2023': 6.4},
            'Adrar': {'2013': 9.9, '2023': 7.6},
            'Dakhlet Nouadhibou': {'2013': 7.7, '2023': 4.9},
            'Tagant': {'2013': 8.3, '2023': 7.6},
            'Guidimakha': {'2013': 10.9, '2023': 6.6},
            'Tiris Zemmour': {'2013': 9.2, '2023': 4.4},
            'Inchiri': {'2013': 6.2, '2023': 6.1},
            'Nouakchott-Ouest': {'2013': 10.8, '2023': 3.4},
            'Nouakchott-Nord': {'2013': 10.8, '2023': 4.5},
            'Nouakchott-Sud': {'2013': 10.8, '2023': 4.4}
        }

        updated_count = 0
        for region_name in life_expectancy_data.keys():
            try:
                region = Region.objects.get(name=region_name)
                
                # Mise à jour de l'espérance de vie
                if region_name in life_expectancy_data:
                    for year, value in life_expectancy_data[region_name].items():
                        setattr(region, f'life_expectancy_{year}', value)

                # Mise à jour de la mortalité infantile
                if region_name in infant_mortality_data:
                    for year, value in infant_mortality_data[region_name].items():
                        setattr(region, f'infant_mortality_{year}', value)

                # Mise à jour de la mortalité infanto-juvénile
                if region_name in child_mortality_data:
                    for year, value in child_mortality_data[region_name].items():
                        setattr(region, f'child_mortality_{year}', value)

                # Mise à jour du taux brut de mortalité
                if region_name in mortality_rate_data:
                    for year, value in mortality_rate_data[region_name].items():
                        setattr(region, f'mortality_rate_{year}', value)
                
                region.save()
                updated_count += 1
                self.stdout.write(self.style.SUCCESS(f'Données mises à jour pour {region_name}'))
                
            except Region.DoesNotExist:
                self.stdout.write(self.style.WARNING(f'Région {region_name} non trouvée'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Erreur lors de la mise à jour de {region_name}: {str(e)}'))

        self.stdout.write(self.style.SUCCESS(f'Import terminé. {updated_count} régions mises à jour.')) 