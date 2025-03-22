from django.core.management.base import BaseCommand
from demographic_data.models import Region
import json

class Command(BaseCommand):
    help = 'Vérifie les données des régions dans la base de données'

    def handle(self, *args, **options):
        regions = Region.objects.all()
        self.stdout.write(f"Nombre total de régions : {regions.count()}")
        
        for region in regions:
            self.stdout.write(f"\nRégion : {region.name}")
            self.stdout.write(f"ID : {region.id}")
            self.stdout.write(f"Code : {region.code}")
            self.stdout.write(f"Population : {region.population}")
            
            try:
                coordinates = region.coordinates
                if coordinates:
                    self.stdout.write(f"Type de coordinates : {type(coordinates)}")
                    self.stdout.write(f"Contenu de coordinates : {json.dumps(coordinates, indent=2)}")
                else:
                    self.stdout.write(self.style.ERROR("Coordinates est None ou vide"))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Erreur avec coordinates : {str(e)}"))
