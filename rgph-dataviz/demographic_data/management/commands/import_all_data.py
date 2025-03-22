from django.core.management.base import BaseCommand
from demographic_data.models import Region

class Command(BaseCommand):
    help = 'Import all demographic data for regions'

    def handle(self, *args, **kwargs):
        # Données pour chaque région
        regions_data = {
            'Hodh Chargui': {
                'male_population': 288388,
                'female_population': 337255,
                'population': 625643,
                'male_percentage': 12.1,
                'female_percentage': 13.2,
                'total_percentage': 12.7,
                'population_1965': 170500,
                'population_1977': 156721,
                'population_1988': 212203,
                'population_2000': 281600,
                'population_2013': 430668,
                'population_2023': 625643,
                'growth_rate_1977_1988': 2.7,
                'growth_rate_1988_2000': 2.3,
                'growth_rate_2000_2013': 3.4,
                'growth_rate_2013_2023': 3.4
            },
            'Hodh El Gharbi': {
                'male_population': 186877,
                'female_population': 216214,
                'population': 403091,
                'male_percentage': 7.9,
                'female_percentage': 8.5,
                'total_percentage': 8.2,
                'population_1965': 98300,
                'population_1977': 124194,
                'population_1988': 159296,
                'population_2000': 212156,
                'population_2013': 294109,
                'population_2023': 403091,
                'growth_rate_1977_1988': 2.3,
                'growth_rate_1988_2000': 2.3,
                'growth_rate_2000_2013': 2.6,
                'growth_rate_2013_2023': 2.9
            },
            'Assaba': {
                'male_population': 203189,
                'female_population': 248615,
                'population': 451804,
                'male_percentage': 8.6,
                'female_percentage': 9.7,
                'total_percentage': 9.2,
                'population_1965': 107000,
                'population_1977': 129162,
                'population_1988': 167123,
                'population_2000': 242265,
                'population_2013': 325897,
                'population_2023': 451804,
                'growth_rate_1977_1988': 2.3,
                'growth_rate_1988_2000': 3.0,
                'growth_rate_2000_2013': 2.4,
                'growth_rate_2013_2023': 3.0
            },
            'Gorgol': {
                'male_population': 210612,
                'female_population': 231878,
                'population': 442490,
                'male_percentage': 8.9,
                'female_percentage': 9.1,
                'total_percentage': 9.0,
                'population_1965': 113600,
                'population_1977': 149432,
                'population_1988': 184359,
                'population_2000': 242711,
                'population_2013': 335917,
                'population_2023': 442490,
                'growth_rate_1977_1988': 1.9,
                'growth_rate_1988_2000': 2.2,
                'growth_rate_2000_2013': 2.6,
                'growth_rate_2013_2023': 2.5
            },
            'Brakna': {
                'male_population': 181163,
                'female_population': 210147,
                'population': 391310,
                'male_percentage': 7.6,
                'female_percentage': 8.2,
                'total_percentage': 7.9,
                'population_1965': 133000,
                'population_1977': 151353,
                'population_1988': 192157,
                'population_2000': 247006,
                'population_2013': 312277,
                'population_2023': 391310,
                'growth_rate_1977_1988': 2.1,
                'growth_rate_1988_2000': 2.0,
                'growth_rate_2000_2013': 1.9,
                'growth_rate_2013_2023': 2.1
            },
            'Trarza': {
                'male_population': 151958,
                'female_population': 171945,
                'population': 323903,
                'male_percentage': 6.4,
                'female_percentage': 6.7,
                'total_percentage': 6.6,
                'population_1965': 197700,
                'population_1977': 216008,
                'population_1988': 202596,
                'population_2000': 268220,
                'population_2013': 272773,
                'population_2023': 323903,
                'growth_rate_1977_1988': -0.6,
                'growth_rate_1988_2000': 2.3,
                'growth_rate_2000_2013': 0.1,
                'growth_rate_2013_2023': 1.6
            },
            'Adrar': {
                'male_population': 34710,
                'female_population': 36913,
                'population': 71623,
                'male_percentage': 1.5,
                'female_percentage': 1.4,
                'total_percentage': 1.5,
                'population_1965': 63800,
                'population_1977': 55354,
                'population_1988': 61043,
                'population_2000': 69542,
                'population_2013': 62658,
                'population_2023': 71623,
                'growth_rate_1977_1988': 0.9,
                'growth_rate_1988_2000': 1.0,
                'growth_rate_2000_2013': -0.8,
                'growth_rate_2013_2023': 1.2
            },
            'Dakhlet Nouadhibou': {
                'male_population': 102944,
                'female_population': 81515,
                'population': 184459,
                'male_percentage': 4.3,
                'female_percentage': 3.2,
                'total_percentage': 3.7,
                'population_1965': 11200,
                'population_1977': 53526,
                'population_1988': 63030,
                'population_2000': 79516,
                'population_2013': 123779,
                'population_2023': 184459,
                'growth_rate_1977_1988': 8.7,
                'growth_rate_1988_2000': 1.9,
                'growth_rate_2000_2013': 3.6,
                'growth_rate_2013_2023': 3.7
            },
            'Tagant': {
                'male_population': 54264,
                'female_population': 60496,
                'population': 114760,
                'male_percentage': 2.3,
                'female_percentage': 2.4,
                'total_percentage': 2.3,
                'population_1965': 74800,
                'population_1977': 74980,
                'population_1988': 64908,
                'population_2000': 76620,
                'population_2013': 80962,
                'population_2023': 114760,
                'growth_rate_1977_1988': -1.3,
                'growth_rate_1988_2000': 1.3,
                'growth_rate_2000_2013': 0.4,
                'growth_rate_2013_2023': 3.2
            },
            'Guidimakha': {
                'male_population': 172362,
                'female_population': 190713,
                'population': 363075,
                'male_percentage': 7.3,
                'female_percentage': 7.5,
                'total_percentage': 7.4,
                'population_1965': 68100,
                'population_1977': 83231,
                'population_1988': 116436,
                'population_2000': 177707,
                'population_2013': 267029,
                'population_2023': 363075,
                'growth_rate_1977_1988': 3.0,
                'growth_rate_1988_2000': 3.4,
                'growth_rate_2000_2013': 3.3,
                'growth_rate_2013_2023': 2.8
            },
            'Tiris Zemmour': {
                'male_population': 46899,
                'female_population': 32230,
                'population': 79129,
                'male_percentage': 2.0,
                'female_percentage': 1.3,
                'total_percentage': 1.6,
                'population_1965': 17400,
                'population_1977': 22554,
                'population_1988': 33147,
                'population_2000': 41121,
                'population_2013': 53261,
                'population_2023': 79129,
                'growth_rate_1977_1988': 3.4,
                'growth_rate_1988_2000': 1.7,
                'growth_rate_2000_2013': 2.1,
                'growth_rate_2013_2023': 3.7
            },
            'Inchiri': {
                'male_population': 18466,
                'female_population': 11018,
                'population': 29484,
                'male_percentage': 0.8,
                'female_percentage': 0.4,
                'total_percentage': 0.6,
                'population_1965': 24800,
                'population_1977': 17611,
                'population_1988': 14613,
                'population_2000': 11500,
                'population_2013': 19639,
                'population_2023': 29484,
                'growth_rate_1977_1988': -1.7,
                'growth_rate_1988_2000': -1.9,
                'growth_rate_2000_2013': 4.3,
                'growth_rate_2013_2023': 3.8
            },
            'Nouakchott-Ouest': {
                'male_population': 105167,
                'female_population': 99714,
                'population': 204881,
                'male_percentage': 4.4,
                'female_percentage': 3.9,
                'total_percentage': 4.2,
                'population_1965': None,
                'population_1977': None,
                'population_1988': None,
                'population_2000': 155098,
                'population_2013': 165814,
                'population_2023': 204881,
                'growth_rate_1977_1988': None,
                'growth_rate_1988_2000': None,
                'growth_rate_2000_2013': 0.5,
                'growth_rate_2013_2023': 2.0
            },
            'Nouakchott-Nord': {
                'male_population': 303315,
                'female_population': 311150,
                'population': 614465,
                'male_percentage': 12.8,
                'female_percentage': 12.2,
                'total_percentage': 12.5,
                'population_1965': None,
                'population_1977': None,
                'population_1988': None,
                'population_2000': 163504,
                'population_2013': 366912,
                'population_2023': 614465,
                'growth_rate_1977_1988': None,
                'growth_rate_1988_2000': None,
                'growth_rate_2000_2013': 6.5,
                'growth_rate_2013_2023': 4.8
            },
            'Nouakchott-Sud': {
                'male_population': 315156,
                'female_population': 312259,
                'population': 627415,
                'male_percentage': 13.3,
                'female_percentage': 12.2,
                'total_percentage': 12.7,
                'population_1965': None,
                'population_1977': None,
                'population_1988': None,
                'population_2000': 239593,
                'population_2013': 425673,
                'population_2023': 627415,
                'growth_rate_1977_1988': None,
                'growth_rate_1988_2000': None,
                'growth_rate_2000_2013': 4.6,
                'growth_rate_2013_2023': 3.6
            }
        }

        # Mise à jour des données pour chaque région
        for region_name, data in regions_data.items():
            try:
                region = Region.objects.get(name=region_name)
                
                # Mise à jour des champs
                for field, value in data.items():
                    setattr(region, field, value)
                
                region.save()
                self.stdout.write(self.style.SUCCESS(f'Données mises à jour pour {region_name}'))
                
            except Region.DoesNotExist:
                self.stdout.write(self.style.WARNING(f'Région non trouvée : {region_name}'))
                continue
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Erreur lors de la mise à jour de {region_name}: {str(e)}'))
                continue

        self.stdout.write(self.style.SUCCESS('Import des données terminé')) 