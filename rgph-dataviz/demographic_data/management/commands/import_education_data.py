from django.core.management.base import BaseCommand
from demographic_data.models import Region

class Command(BaseCommand):
    help = 'Import education data for regions'

    def handle(self, *args, **kwargs):
        # Données d'analphabétisme
        illiteracy_data = {
            'Hodh Chargui': {'male': 34.9, 'female': 39.3, 'total': 37.4},
            'Hodh El Gharbi': {'male': 38.6, 'female': 41.6, 'total': 40.3},
            'Assaba': {'male': 29.2, 'female': 34.3, 'total': 32.1},
            'Gorgol': {'male': 44.2, 'female': 49.3, 'total': 46.9},
            'Brakna': {'male': 35.6, 'female': 39.9, 'total': 38.0},
            'Trarza': {'male': 20.2, 'female': 23.2, 'total': 21.9},
            'Adrar': {'male': 17.6, 'female': 20.9, 'total': 19.4},
            'Dakhlet Nouadhibou': {'male': 15.8, 'female': 17.4, 'total': 16.5},
            'Tagant': {'male': 23.8, 'female': 29.1, 'total': 26.6},
            'Guidimakha': {'male': 53.5, 'female': 62.6, 'total': 58.4},
            'Tiris Zemmour': {'male': 16.5, 'female': 16.1, 'total': 16.3},
            'Inchiri': {'male': 23.0, 'female': 21.4, 'total': 22.4},
            'Nouakchott-Ouest': {'male': 14.4, 'female': 18.5, 'total': 16.4},
            'Nouakchott-Nord': {'male': 13.8, 'female': 17.1, 'total': 15.5},
            'Nouakchott-Sud': {'male': 16.5, 'female': 20.1, 'total': 18.3}
        }

        # Données de scolarisation brute au fondamental
        primary_enrollment_data = {
            'Hodh Chargui': {
                '2000': {'male': 56.2, 'female': 54.9, 'total': 55.5},
                '2013': {'male': 45.2, 'female': 46.9, 'total': 46.0},
                '2023': {'male': 77.4, 'female': 86.6, 'total': 82.0}
            },
            'Hodh El Gharbi': {
                '2000': {'male': 45.1, 'female': 55.0, 'total': 59.9},
                '2013': {'male': 49.0, 'female': 60.6, 'total': 54.8},
                '2023': {'male': 74.5, 'female': 91.8, 'total': 83.2}
            },
            'Assaba': {
                '2000': {'male': 50.1, 'female': 51.1, 'total': 50.6},
                '2013': {'male': 52.0, 'female': 55.6, 'total': 53.8},
                '2023': {'male': 84.1, 'female': 93.0, 'total': 88.5}
            },
            'Gorgol': {
                '2000': {'male': 51.8, 'female': 47.0, 'total': 49.5},
                '2013': {'male': 58.7, 'female': 62.7, 'total': 60.7},
                '2023': {'male': 83.5, 'female': 96.4, 'total': 89.9}
            },
            'Brakna': {
                '2000': {'male': 64.8, 'female': 65.5, 'total': 65.1},
                '2013': {'male': 74.4, 'female': 83.7, 'total': 79.0},
                '2023': {'male': 96.9, 'female': 108.8, 'total': 102.9}
            },
            'Trarza': {
                '2000': {'male': 70.7, 'female': 73.5, 'total': 72.0},
                '2013': {'male': 76.5, 'female': 82.9, 'total': 79.7},
                '2023': {'male': 100.5, 'female': 109.8, 'total': 105.1}
            },
            'Adrar': {
                '2000': {'male': 98.1, 'female': 98.4, 'total': 98.2},
                '2013': {'male': 107.0, 'female': 106.0, 'total': 106.5},
                '2023': {'male': 129.9, 'female': 130.0, 'total': 129.9}
            },
            'Dakhlet Nouadhibou': {
                '2000': {'male': 107.8, 'female': 110.0, 'total': 108.9},
                '2013': {'male': 104.4, 'female': 104.9, 'total': 104.7},
                '2023': {'male': 118.8, 'female': 119.1, 'total': 118.9}
            },
            'Tagant': {
                '2000': {'male': 77.2, 'female': 76.5, 'total': 76.6},
                '2013': {'male': 88.1, 'female': 89.8, 'total': 88.9},
                '2023': {'male': 111.7, 'female': 117.4, 'total': 114.5}
            },
            'Guidimakha': {
                '2000': {'male': 45.2, 'female': 37.6, 'total': 41.6},
                '2013': {'male': 55.9, 'female': 56.1, 'total': 56.0},
                '2023': {'male': 74.9, 'female': 84.5, 'total': 79.7}
            },
            'Tiris Zemmour': {
                '2000': {'male': 111.1, 'female': 111.8, 'total': 111.5},
                '2013': {'male': 109.8, 'female': 106.0, 'total': 108.0},
                '2023': {'male': 123.8, 'female': 120.5, 'total': 122.1}
            },
            'Inchiri': {
                '2000': {'male': 79.6, 'female': 76.7, 'total': 78.2},
                '2013': {'male': 97.2, 'female': 99.2, 'total': 98.2},
                '2023': {'male': 128.9, 'female': 126.0, 'total': 127.4}
            },
            'Nouakchott-Ouest': {
                '2000': {'male': 101.7, 'female': 102.2, 'total': 102.0},
                '2013': {'male': 95.4, 'female': 98.1, 'total': 96.7},
                '2023': {'male': 100.0, 'female': 102.5, 'total': 101.2}
            },
            'Nouakchott-Nord': {
                '2000': {'male': 101.7, 'female': 102.2, 'total': 102.0},
                '2013': {'male': 95.4, 'female': 98.1, 'total': 96.7},
                '2023': {'male': 106.3, 'female': 110.7, 'total': 108.5}
            },
            'Nouakchott-Sud': {
                '2000': {'male': 101.7, 'female': 102.2, 'total': 102.0},
                '2013': {'male': 95.4, 'female': 98.1, 'total': 96.7},
                '2023': {'male': 106.3, 'female': 112.0, 'total': 109.2}
            }
        }

        # Données de scolarisation brute au secondaire
        secondary_enrollment_data = {
            'Hodh Chargui': {
                '2000': {'male': 8.5, 'female': 5.7, 'total': 7.1},
                '2013': {'male': 8.9, 'female': 7.4, 'total': 8.1},
                '2023': {'male': 12.2, 'female': 15.6, 'total': 13.9}
            },
            'Hodh El Gharbi': {
                '2000': {'male': 11.1, 'female': 9.2, 'total': 10.1},
                '2013': {'male': 15.4, 'female': 15.7, 'total': 15.6},
                '2023': {'male': 14.3, 'female': 22.1, 'total': 18.2}
            },
            'Assaba': {
                '2000': {'male': 12.2, 'female': 8.1, 'total': 10.1},
                '2013': {'male': 13.8, 'female': 11.7, 'total': 12.7},
                '2023': {'male': 18.6, 'female': 25.3, 'total': 22.0}
            },
            'Gorgol': {
                '2000': {'male': 11.6, 'female': 6.7, 'total': 9.1},
                '2013': {'male': 19.9, 'female': 15.0, 'total': 17.4},
                '2023': {'male': 21.0, 'female': 26.7, 'total': 23.8}
            },
            'Brakna': {
                '2000': {'male': 27.0, 'female': 21.1, 'total': 24.0},
                '2013': {'male': 25.5, 'female': 22.1, 'total': 23.7},
                '2023': {'male': 29.3, 'female': 39.9, 'total': 34.6}
            },
            'Trarza': {
                '2000': {'male': 27.0, 'female': 21.1, 'total': 24.0},
                '2013': {'male': 34.5, 'female': 30.3, 'total': 32.4},
                '2023': {'male': 35.2, 'female': 46.3, 'total': 40.8}
            },
            'Adrar': {
                '2000': {'male': 40.9, 'female': 30.8, 'total': 35.9},
                '2013': {'male': 42.4, 'female': 34.5, 'total': 38.4},
                '2023': {'male': 54.2, 'female': 61.5, 'total': 57.8}
            },
            'Dakhlet Nouadhibou': {
                '2000': {'male': 46.5, 'female': 38.3, 'total': 42.5},
                '2013': {'male': 53.9, 'female': 52.6, 'total': 53.3},
                '2023': {'male': 52.0, 'female': 64.1, 'total': 58.1}
            },
            'Tagant': {
                '2000': {'male': 22.0, 'female': 15.8, 'total': 18.9},
                '2013': {'male': 26.8, 'female': 19.6, 'total': 23.0},
                '2023': {'male': 34.5, 'female': 38.9, 'total': 36.7}
            },
            'Guidimakha': {
                '2000': {'male': 8.7, 'female': 4.3, 'total': 6.6},
                '2013': {'male': 14.7, 'female': 7.8, 'total': 11.2},
                '2023': {'male': 19.4, 'female': 20.7, 'total': 20.1}
            },
            'Tiris Zemmour': {
                '2000': {'male': 57.0, 'female': 43.4, 'total': 50.3},
                '2013': {'male': 69.5, 'female': 59.5, 'total': 64.6},
                '2023': {'male': 56.5, 'female': 64.3, 'total': 60.4}
            },
            'Inchiri': {
                '2000': {'male': 34.2, 'female': 36.5, 'total': 35.1},
                '2013': {'male': 35.7, 'female': 35.9, 'total': 35.8},
                '2023': {'male': 52.4, 'female': 65.5, 'total': 58.9}
            },
            'Nouakchott-Ouest': {
                '2000': {'male': 56.6, 'female': 48.1, 'total': 52.4},
                '2013': {'male': 60.9, 'female': 58.9, 'total': 59.9},
                '2023': {'male': 71.8, 'female': 75.3, 'total': 73.6}
            },
            'Nouakchott-Nord': {
                '2000': {'male': 56.6, 'female': 48.1, 'total': 52.4},
                '2013': {'male': 60.9, 'female': 58.9, 'total': 59.9},
                '2023': {'male': 57.4, 'female': 66.9, 'total': 62.1}
            },
            'Nouakchott-Sud': {
                '2000': {'male': 56.6, 'female': 48.1, 'total': 52.4},
                '2013': {'male': 60.9, 'female': 58.9, 'total': 59.9},
                '2023': {'male': 52.7, 'female': 65.4, 'total': 59.1}
            }
        }

        # Données de scolarisation nette au fondamental
        net_primary_data = {
            'Hodh Chargui': {
                '2000': {'male': 35.5, 'female': 32.6, 'total': 34.1},
                '2013': {'male': 28.9, 'female': 29.1, 'total': 29.0},
                '2023': {'male': 41.8, 'female': 42.3, 'total': 42.1}
            },
            'Hodh El Gharbi': {
                '2000': {'male': 27.5, 'female': 29.5, 'total': 28.4},
                '2013': {'male': 31.0, 'female': 36.4, 'total': 33.7},
                '2023': {'male': 40.0, 'female': 44.7, 'total': 42.4}
            },
            'Assaba': {
                '2000': {'male': 30.6, 'female': 30.0, 'total': 30.3},
                '2013': {'male': 32.0, 'female': 34.1, 'total': 33.0},
                '2023': {'male': 47.7, 'female': 50.4, 'total': 49.0}
            },
            'Gorgol': {
                '2000': {'male': 32.3, 'female': 30.8, 'total': 31.5},
                '2013': {'male': 37.6, 'female': 40.8, 'total': 39.2},
                '2023': {'male': 47.8, 'female': 54.1, 'total': 51.0}
            },
            'Brakna': {
                '2000': {'male': 41.6, 'female': 42.0, 'total': 41.8},
                '2013': {'male': 47.8, 'female': 53.1, 'total': 50.4},
                '2023': {'male': 58.7, 'female': 64.5, 'total': 61.6}
            },
            'Trarza': {
                '2000': {'male': 43.6, 'female': 43.3, 'total': 43.5},
                '2013': {'male': 48.9, 'female': 52.5, 'total': 50.7},
                '2023': {'male': 60.1, 'female': 63.5, 'total': 61.8}
            },
            'Adrar': {
                '2000': {'male': 63.7, 'female': 60.6, 'total': 62.3},
                '2013': {'male': 70.5, 'female': 70.7, 'total': 70.6},
                '2023': {'male': 85.9, 'female': 85.6, 'total': 85.7}
            },
            'Dakhlet Nouadhibou': {
                '2000': {'male': 72.8, 'female': 73.4, 'total': 73.1},
                '2013': {'male': 72.8, 'female': 74.3, 'total': 73.5},
                '2023': {'male': 77.0, 'female': 80.1, 'total': 78.5}
            },
            'Tagant': {
                '2000': {'male': 48.8, 'female': 47.0, 'total': 47.9},
                '2013': {'male': 58.5, 'female': 58.7, 'total': 58.6},
                '2023': {'male': 65.7, 'female': 67.6, 'total': 66.7}
            },
            'Guidimakha': {
                '2000': {'male': 29.1, 'female': 26.3, 'total': 27.8},
                '2013': {'male': 35.0, 'female': 36.2, 'total': 35.6},
                '2023': {'male': 41.9, 'female': 46.5, 'total': 44.2}
            },
            'Tiris Zemmour': {
                '2000': {'male': 79.9, 'female': 77.8, 'total': 78.9},
                '2013': {'male': 75.6, 'female': 74.3, 'total': 75.0},
                '2023': {'male': 83.9, 'female': 85.0, 'total': 84.4}
            },
            'Inchiri': {
                '2000': {'male': 50.8, 'female': 46.8, 'total': 48.7},
                '2013': {'male': 63.2, 'female': 67.6, 'total': 65.4},
                '2023': {'male': 81.2, 'female': 82.4, 'total': 81.8}
            },
            'Nouakchott-Ouest': {
                '2000': {'male': 68.5, 'female': 67.2, 'total': 67.8},
                '2013': {'male': 64.6, 'female': 66.6, 'total': 65.6},
                '2023': {'male': 67.0, 'female': 69.0, 'total': 68.0}
            },
            'Nouakchott-Nord': {
                '2000': {'male': 68.5, 'female': 67.2, 'total': 67.8},
                '2013': {'male': 64.6, 'female': 66.6, 'total': 65.6},
                '2023': {'male': 67.5, 'female': 70.2, 'total': 68.8}
            },
            'Nouakchott-Sud': {
                '2000': {'male': 68.5, 'female': 67.2, 'total': 67.8},
                '2013': {'male': 64.6, 'female': 66.6, 'total': 65.6},
                '2023': {'male': 65.5, 'female': 69.7, 'total': 67.6}
            }
        }

        # Données de scolarisation nette au secondaire
        net_secondary_data = {
            'Hodh Chargui': {'male': 8.5, 'female': 10.0, 'total': 9.2},
            'Hodh El Gharbi': {'male': 9.9, 'female': 13.6, 'total': 11.8},
            'Assaba': {'male': 13.1, 'female': 16.1, 'total': 14.6},
            'Gorgol': {'male': 14.0, 'female': 17.4, 'total': 15.7},
            'Brakna': {'male': 21.0, 'female': 26.6, 'total': 23.8},
            'Trarza': {'male': 24.8, 'female': 29.9, 'total': 27.3},
            'Adrar': {'male': 41.2, 'female': 43.7, 'total': 42.4},
            'Dakhlet Nouadhibou': {'male': 36.3, 'female': 44.6, 'total': 40.4},
            'Tagant': {'male': 24.3, 'female': 25.0, 'total': 24.7},
            'Guidimakha': {'male': 13.1, 'female': 13.8, 'total': 13.4},
            'Tiris Zemmour': {'male': 39.4, 'female': 46.2, 'total': 42.8},
            'Inchiri': {'male': 37.9, 'female': 44.5, 'total': 41.2},
            'Nouakchott-Ouest': {'male': 48.1, 'female': 51.3, 'total': 49.7},
            'Nouakchott-Nord': {'male': 39.2, 'female': 43.8, 'total': 41.5},
            'Nouakchott-Sud': {'male': 34.1, 'female': 41.1, 'total': 37.6}
        }

        # Mise à jour des données pour chaque région
        for region_name in illiteracy_data.keys():
            try:
                region = Region.objects.get(name=region_name)

                # Analphabétisme
                region.illiteracy_rate_male = illiteracy_data[region_name]['male']
                region.illiteracy_rate_female = illiteracy_data[region_name]['female']
                region.illiteracy_rate_total = illiteracy_data[region_name]['total']

                # Taux brut de scolarisation au fondamental
                for year in ['2000', '2013', '2023']:
                    setattr(region, f'primary_enrollment_rate_male_{year}',
                            primary_enrollment_data[region_name][year]['male'])
                    setattr(region, f'primary_enrollment_rate_female_{year}',
                            primary_enrollment_data[region_name][year]['female'])
                    setattr(region, f'primary_enrollment_rate_total_{year}',
                            primary_enrollment_data[region_name][year]['total'])

                # Taux brut de scolarisation au secondaire
                for year in ['2000', '2013', '2023']:
                    setattr(region, f'secondary_enrollment_rate_male_{year}',
                            secondary_enrollment_data[region_name][year]['male'])
                    setattr(region, f'secondary_enrollment_rate_female_{year}',
                            secondary_enrollment_data[region_name][year]['female'])
                    setattr(region, f'secondary_enrollment_rate_total_{year}',
                            secondary_enrollment_data[region_name][year]['total'])

                # Taux net de scolarisation au fondamental
                for year in ['2000', '2013', '2023']:
                    setattr(region, f'net_primary_rate_male_{year}',
                            net_primary_data[region_name][year]['male'])
                    setattr(region, f'net_primary_rate_female_{year}',
                            net_primary_data[region_name][year]['female'])
                    setattr(region, f'net_primary_rate_total_{year}',
                            net_primary_data[region_name][year]['total'])

                # Taux net de scolarisation au secondaire
                region.net_secondary_rate_male_2023 = net_secondary_data[region_name]['male']
                region.net_secondary_rate_female_2023 = net_secondary_data[region_name]['female']
                region.net_secondary_rate_total_2023 = net_secondary_data[region_name]['total']

                region.save()
                self.stdout.write(self.style.SUCCESS(f'Updated education data for region: {region_name}'))

            except Region.DoesNotExist:
                self.stdout.write(self.style.ERROR(f'Region not found: {region_name}'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error updating region {region_name}: {str(e)}')) 