from django.core.management.base import BaseCommand
from demographic_data.models import Region

class Command(BaseCommand):
    help = 'Importe les données des régions de la Mauritanie'

    def handle(self, *args, **options):
        # Données des régions de la Mauritanie
        regions_data = [
            {
                'name': 'Trarza',
                'code': 'MRT_TRZ',
                'capital': 'Rosso',
                'population': 272773,
                'male_population': 134958,
                'female_population': 137815,
                'literacy': 65.8,
                'employment_rate': 58.2,
                'average_age': 29.4,
                'households': 45462,
                'coordinates': [[[-15.8, 17.5], [-16.2, 18.8], [-15.1, 19.2], [-14.5, 18.2], [-14.8, 17.3], [-15.8, 17.5]]]
            },
            {
                'name': 'Adrar',
                'code': 'MRT_ADR',
                'capital': 'Atar',
                'population': 62658,
                'male_population': 32182,
                'female_population': 30476,
                'literacy': 71.2,
                'employment_rate': 61.5,
                'average_age': 31.2,
                'households': 10443,
                'coordinates': [[[-13.5, 19.8], [-12.2, 21.2], [-11.5, 20.5], [-12.8, 19.2], [-13.5, 19.8]]]
            },
            {
                'name': 'Nouakchott',
                'code': 'MRT_NKC',
                'capital': 'Nouakchott',
                'population': 958399,
                'male_population': 482990,
                'female_population': 475409,
                'literacy': 78.5,
                'employment_rate': 64.8,
                'average_age': 27.6,
                'households': 159733,
                'coordinates': [[[-15.9, 18.2], [-16.0, 17.8], [-15.8, 17.6], [-15.7, 17.8], [-15.9, 18.2]]]
            },
            {
                'name': 'Brakna',
                'code': 'MRT_BRK',
                'capital': 'Aleg',
                'population': 312277,
                'male_population': 154621,
                'female_population': 157656,
                'literacy': 62.4,
                'employment_rate': 55.8,
                'average_age': 28.9,
                'households': 52046,
                'coordinates': [[[-14.8, 17.3], [-14.2, 18.5], [-13.5, 18.2], [-13.8, 17.1], [-14.8, 17.3]]]
            },
            {
                'name': 'Gorgol',
                'code': 'MRT_GRG',
                'capital': 'Kaédi',
                'population': 335917,
                'male_population': 165287,
                'female_population': 170630,
                'literacy': 59.2,
                'employment_rate': 53.5,
                'average_age': 26.8,
                'households': 55986,
                'coordinates': [[[-13.8, 17.1], [-13.2, 17.8], [-12.5, 17.5], [-12.8, 16.8], [-13.8, 17.1]]]
            },
            {
                'name': 'Guidimakha',
                'code': 'MRT_GMK',
                'capital': 'Sélibaby',
                'population': 267029,
                'male_population': 131784,
                'female_population': 135245,
                'literacy': 57.8,
                'employment_rate': 51.2,
                'average_age': 25.4,
                'households': 44505,
                'coordinates': [[[-12.8, 16.8], [-12.2, 17.2], [-11.5, 16.9], [-11.8, 16.5], [-12.8, 16.8]]]
            },
            {
                'name': 'Hodh Ech Chargui',
                'code': 'MRT_HCH',
                'capital': 'Néma',
                'population': 430668,
                'male_population': 212189,
                'female_population': 218479,
                'literacy': 54.6,
                'employment_rate': 49.8,
                'average_age': 27.2,
                'households': 71778,
                'coordinates': [[[-7.2, 18.5], [-5.8, 19.2], [-5.2, 18.5], [-6.5, 17.8], [-7.2, 18.5]]]
            },
            {
                'name': 'Hodh El Gharbi',
                'code': 'MRT_HGH',
                'capital': 'Ayoun el Atrous',
                'population': 294109,
                'male_population': 144959,
                'female_population': 149150,
                'literacy': 56.2,
                'employment_rate': 50.5,
                'average_age': 26.9,
                'households': 49018,
                'coordinates': [[[-9.2, 17.8], [-8.5, 18.5], [-7.8, 17.8], [-8.5, 17.1], [-9.2, 17.8]]]
            },
            {
                'name': 'Assaba',
                'code': 'MRT_ASB',
                'capital': 'Kiffa',
                'population': 325897,
                'male_population': 160567,
                'female_population': 165330,
                'literacy': 58.4,
                'employment_rate': 52.8,
                'average_age': 27.5,
                'households': 54316,
                'coordinates': [[[-11.5, 17.8], [-10.8, 18.5], [-10.1, 17.8], [-10.8, 17.1], [-11.5, 17.8]]]
            },
            {
                'name': 'Tagant',
                'code': 'MRT_TAG',
                'capital': 'Tidjikja',
                'population': 80962,
                'male_population': 39671,
                'female_population': 41291,
                'literacy': 63.5,
                'employment_rate': 54.2,
                'average_age': 29.8,
                'households': 13494,
                'coordinates': [[[-11.8, 19.2], [-11.1, 19.9], [-10.4, 19.2], [-11.1, 18.5], [-11.8, 19.2]]]
            },
            {
                'name': 'Inchiri',
                'code': 'MRT_INC',
                'capital': 'Akjoujt',
                'population': 19639,
                'male_population': 10212,
                'female_population': 9427,
                'literacy': 69.8,
                'employment_rate': 59.5,
                'average_age': 30.5,
                'households': 3273,
                'coordinates': [[[-14.8, 19.8], [-14.1, 20.5], [-13.4, 19.8], [-14.1, 19.1], [-14.8, 19.8]]]
            },
            {
                'name': 'Tiris Zemmour',
                'code': 'MRT_TZM',
                'capital': 'Zouérat',
                'population': 53261,
                'male_population': 28428,
                'female_population': 24833,
                'literacy': 72.5,
                'employment_rate': 62.8,
                'average_age': 31.8,
                'households': 8877,
                'coordinates': [[[-12.5, 22.5], [-11.8, 23.2], [-11.1, 22.5], [-11.8, 21.8], [-12.5, 22.5]]]
            },
            {
                'name': 'Dakhlet Nouadhibou',
                'code': 'MRT_DNB',
                'capital': 'Nouadhibou',
                'population': 123779,
                'male_population': 65403,
                'female_population': 58376,
                'literacy': 76.2,
                'employment_rate': 65.5,
                'average_age': 29.2,
                'households': 20630,
                'coordinates': [[[-16.5, 20.8], [-15.8, 21.5], [-15.1, 20.8], [-15.8, 20.1], [-16.5, 20.8]]]
            }
        ]

        # Supprime toutes les régions existantes
        Region.objects.all().delete()

        # Crée les nouvelles régions
        for region_data in regions_data:
            Region.objects.create(**region_data)
            self.stdout.write(
                self.style.SUCCESS(f'Région "{region_data["name"]}" créée avec succès')
            )

        self.stdout.write(
            self.style.SUCCESS('Import des régions terminé avec succès')
        )
