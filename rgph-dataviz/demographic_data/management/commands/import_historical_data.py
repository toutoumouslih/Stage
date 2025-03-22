from django.core.management.base import BaseCommand
from demographic_data.models import Region

class Command(BaseCommand):
    help = 'Importe les données historiques et les pourcentages pour chaque région'

    def handle(self, *args, **options):
        # Données historiques et pourcentages pour chaque région
        data = {
            'Hodh Chargui': {
                'population_1965': 138500,
                'population_1977': 134731,
                'population_1988': 212700,
                'population_2000': 393307,
                'population_2013': 430668,
                'literacy_rate': 54.6,
                'employment_rate': 49.8,
                'average_age': 27.2,
            },
            'Hodh El Gharbi': {
                'population_1965': 138500,
                'population_1977': 134731,
                'population_1988': 212700,
                'population_2000': 294109,
                'population_2013': 294109,
                'literacy_rate': 56.2,
                'employment_rate': 50.5,
                'average_age': 26.9,
            },
            'Assaba': {
                'population_1965': 111800,
                'population_1977': 171713,
                'population_1988': 242157,
                'population_2000': 325897,
                'population_2013': 325897,
                'literacy_rate': 58.4,
                'employment_rate': 52.8,
                'average_age': 27.5,
            },
            'Gorgol': {
                'population_1965': 111800,
                'population_1977': 148282,
                'population_1988': 207738,
                'population_2000': 335917,
                'population_2013': 335917,
                'literacy_rate': 59.2,
                'employment_rate': 53.5,
                'average_age': 26.8,
            },
            'Brakna': {
                'population_1965': 111800,
                'population_1977': 148282,
                'population_1988': 207738,
                'population_2000': 312277,
                'population_2013': 312277,
                'literacy_rate': 62.4,
                'employment_rate': 55.8,
                'average_age': 28.9,
            },
            'Trarza': {
                'population_1965': 150000,
                'population_1977': 165000,
                'population_1988': 202190,
                'population_2000': 272773,
                'population_2013': 272773,
                'literacy_rate': 65.8,
                'employment_rate': 58.2,
                'average_age': 29.4,
            },
            'Adrar': {
                'population_1965': 35000,
                'population_1977': 37299,
                'population_1988': 61075,
                'population_2000': 62658,
                'population_2013': 62658,
                'literacy_rate': 71.2,
                'employment_rate': 61.5,
                'average_age': 31.2,
            },
            'Dakhlet Nouadhibou': {
                'population_1965': 11000,
                'population_1977': 22365,
                'population_1988': 61075,
                'population_2000': 123779,
                'population_2013': 123779,
                'literacy_rate': 76.2,
                'employment_rate': 65.5,
                'average_age': 29.2,
            },
            'Tagant': {
                'population_1965': 35000,
                'population_1977': 37299,
                'population_1988': 61075,
                'population_2000': 80962,
                'population_2013': 80962,
                'literacy_rate': 63.5,
                'employment_rate': 54.2,
                'average_age': 29.8,
            },
            'Guidimakha': {
                'population_1965': 17500,
                'population_1977': 17704,
                'population_1988': 103325,
                'population_2000': 267029,
                'population_2013': 267029,
                'literacy_rate': 57.8,
                'employment_rate': 51.2,
                'average_age': 25.4,
            },
            'Tiris Zemmour': {
                'population_1965': 17500,
                'population_1977': 15704,
                'population_1988': 41294,
                'population_2000': 53261,
                'population_2013': 53261,
                'literacy_rate': 72.5,
                'employment_rate': 62.8,
                'average_age': 31.8,
            },
            'Inchiri': {
                'population_1965': 11000,
                'population_1977': 17911,
                'population_1988': 19500,
                'population_2000': 19639,
                'population_2013': 19639,
                'literacy_rate': 69.8,
                'employment_rate': 59.5,
                'average_age': 30.5,
            },
            'Nouakchott': {
                'population_1965': 20000,
                'population_1977': 134704,
                'population_1988': 393325,
                'population_2000': 558195,
                'population_2013': 958399,
                'literacy_rate': 78.5,
                'employment_rate': 64.8,
                'average_age': 27.6,
            }
        }

        # Mise à jour des données pour chaque région
        for region_name, region_data in data.items():
            try:
                region = Region.objects.get(name=region_name)
                for field, value in region_data.items():
                    setattr(region, field, value)
                region.save()
                self.stdout.write(
                    self.style.SUCCESS(f'Données mises à jour pour la région "{region_name}"')
                )
            except Region.DoesNotExist:
                self.stdout.write(
                    self.style.WARNING(f'Région "{region_name}" non trouvée')
                )
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'Erreur lors de la mise à jour de la région "{region_name}": {str(e)}')
                )

        self.stdout.write(
            self.style.SUCCESS('Import des données historiques terminé avec succès')
        ) 