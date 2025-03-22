from django.core.management.base import BaseCommand
from demographic_data.models import Region
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Import health data for regions'

    def handle(self, *args, **options):
        # Données d'assurance maladie par wilaya selon le milieu de résidence en 2023
        health_insurance_data = {
            'Hodh Chargui': {'urban': 7.3, 'rural': 2.9, 'nomadic': 0.1, 'total': 3.9},
            'Hodh El Gharbi': {'urban': 10.0, 'rural': 3.7, 'nomadic': 0.0, 'total': 5.2},
            'Assaba': {'urban': 8.1, 'rural': 4.7, 'nomadic': 0.3, 'total': 5.8},
            'Gorgol': {'urban': 8.6, 'rural': 5.0, 'nomadic': 0.4, 'total': 6.0},
            'Brakna': {'urban': 13.7, 'rural': 7.7, 'nomadic': 1.3, 'total': 9.3},
            'Trarza': {'urban': 12.9, 'rural': 9.2, 'nomadic': 1.0, 'total': 10.3},
            'Adrar': {'urban': 19.6, 'rural': 11.2, 'nomadic': 2.2, 'total': 16.4},
            'Dakhlet Nouadhibou': {'urban': 20.2, 'rural': 13.6, 'nomadic': 2.4, 'total': 19.9},
            'Tagant': {'urban': 18.8, 'rural': 11.9, 'nomadic': 0.2, 'total': 13.9},
            'Guidimakha': {'urban': 4.5, 'rural': 2.1, 'nomadic': 0.3, 'total': 2.8},
            'Tiris Zemmour': {'urban': 30.4, 'rural': 3.4, 'nomadic': 0.0, 'total': 26.7},
            'Inchiri': {'urban': 29.3, 'rural': 16.9, 'nomadic': 0.0, 'total': 24.8},
            'Nouakchott-Ouest': {'urban': 18.5, 'rural': 0.0, 'nomadic': 0.0, 'total': 18.5},
            'Nouakchott-Nord': {'urban': 15.6, 'rural': 0.0, 'nomadic': 0.0, 'total': 15.6},
            'Nouakchott-Sud': {'urban': 14.6, 'rural': 0.0, 'nomadic': 0.0, 'total': 14.6}
        }

        # Données de maladies chroniques par wilaya selon le milieu de résidence en 2023
        chronic_diseases_data = {
            'Hodh Chargui': {'urban': 4.8, 'rural': 3.0, 'nomadic': 1.9, 'total': 3.4},
            'Hodh El Gharbi': {'urban': 6.1, 'rural': 3.2, 'nomadic': 2.6, 'total': 3.9},
            'Assaba': {'urban': 6.4, 'rural': 4.4, 'nomadic': 1.3, 'total': 5.1},
            'Gorgol': {'urban': 7.2, 'rural': 5.5, 'nomadic': 5.5, 'total': 6.0},
            'Brakna': {'urban': 7.3, 'rural': 6.1, 'nomadic': 2.3, 'total': 6.4},
            'Trarza': {'urban': 8.6, 'rural': 7.4, 'nomadic': 3.3, 'total': 7.7},
            'Adrar': {'urban': 7.2, 'rural': 4.7, 'nomadic': 0.8, 'total': 6.3},
            'Dakhlet Nouadhibou': {'urban': 7.4, 'rural': 6.5, 'nomadic': 4.1, 'total': 7.4},
            'Tagant': {'urban': 8.0, 'rural': 5.6, 'nomadic': 0.6, 'total': 6.3},
            'Guidimakha': {'urban': 6.1, 'rural': 4.2, 'nomadic': 1.1, 'total': 4.8},
            'Tiris Zemmour': {'urban': 8.0, 'rural': 2.8, 'nomadic': 1.4, 'total': 7.3},
            'Inchiri': {'urban': 7.8, 'rural': 4.7, 'nomadic': 0.9, 'total': 6.7},
            'Nouakchott-Ouest': {'urban': 8.2, 'rural': 0.0, 'nomadic': 0.0, 'total': 8.2},
            'Nouakchott-Nord': {'urban': 8.2, 'rural': 0.0, 'nomadic': 0.0, 'total': 8.2},
            'Nouakchott-Sud': {'urban': 8.1, 'rural': 0.0, 'nomadic': 0.0, 'total': 8.1}
        }

        # Données de prévalence du handicap par wilaya selon le sexe
        disability_data = {
            'Hodh Chargui': {'male': 8.4, 'female': 9.1, 'total': 8.7},
            'Hodh El Gharbi': {'male': 8.4, 'female': 9.3, 'total': 8.9},
            'Assaba': {'male': 8.1, 'female': 9.5, 'total': 8.9},
            'Gorgol': {'male': 9.4, 'female': 11.2, 'total': 10.4},
            'Brakna': {'male': 11.0, 'female': 13.5, 'total': 12.3},
            'Trarza': {'male': 10.1, 'female': 12.7, 'total': 11.5},
            'Adrar': {'male': 15.3, 'female': 18.2, 'total': 16.8},
            'Dakhlet Nouadhibou': {'male': 11.3, 'female': 15.1, 'total': 13.0},
            'Tagant': {'male': 11.6, 'female': 13.0, 'total': 12.3},
            'Guidimakha': {'male': 7.9, 'female': 9.3, 'total': 8.6},
            'Tiris Zemmour': {'male': 11.5, 'female': 14.4, 'total': 12.7},
            'Inchiri': {'male': 14.5, 'female': 18.4, 'total': 16.0},
            'Nouakchott-Ouest': {'male': 9.1, 'female': 10.4, 'total': 9.7},
            'Nouakchott-Nord': {'male': 9.4, 'female': 11.8, 'total': 10.6},
            'Nouakchott-Sud': {'male': 9.6, 'female': 12.8, 'total': 11.2}
        }

        updated_count = 0
        for region_name, health_insurance in health_insurance_data.items():
            try:
                region = Region.objects.get(name=region_name)
                region.health_insurance_urban = health_insurance['urban']
                region.health_insurance_rural = health_insurance['rural']
                region.health_insurance_nomadic = health_insurance['nomadic']
                region.health_insurance_total = health_insurance['total']
                
                chronic_diseases = chronic_diseases_data[region_name]
                region.chronic_diseases_urban = chronic_diseases['urban']
                region.chronic_diseases_rural = chronic_diseases['rural']
                region.chronic_diseases_nomadic = chronic_diseases['nomadic']
                region.chronic_diseases_total = chronic_diseases['total']
                
                disability = disability_data[region_name]
                region.disability_rate_male = disability['male']
                region.disability_rate_female = disability['female']
                region.disability_rate_total = disability['total']
                
                region.save()
                updated_count += 1
                logger.info(f"Updated health data for region: {region_name}")
            except Region.DoesNotExist:
                logger.error(f"Region not found: {region_name}")
            except Exception as e:
                logger.error(f"Error updating region {region_name}: {str(e)}")

        self.stdout.write(self.style.SUCCESS(f'Successfully updated health data for {updated_count} regions')) 