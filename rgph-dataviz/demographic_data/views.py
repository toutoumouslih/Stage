from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.serializers.json import DjangoJSONEncoder
from .models import Region
from .serializers import RegionSerializer
import logging

logger = logging.getLogger(__name__)

class RegionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer

    @action(detail=False, methods=['get'])
    def geojson(self, request):
        """Retourne toutes les régions au format GeoJSON FeatureCollection"""
        try:
            regions = self.get_queryset()
            features = []
            
            for region in regions:
                feature = {
                    "type": "Feature",
                    "properties": region.to_dict(),
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": region.coordinates
                    }
                }
                features.append(feature)

            return Response({
                "type": "FeatureCollection",
                "features": features
            })
        except Exception as e:
            logger.error(f"Error in geojson view: {str(e)}")
            return Response(
                {"error": "Une erreur s'est produite lors de la récupération des données GeoJSON"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=['get'])
    def details(self, request, pk=None):
        """Retourne les détails d'une région spécifique"""
        try:
            region = self.get_object()
            logger.info(f"Fetching details for region {region.name} (ID: {region.id})")
            
            # Utiliser le sérialiseur pour formater les données
            serializer = self.get_serializer(region)
            logger.debug(f"Serializing data for region {region.name}")
            data = serializer.data
            logger.debug(f"Serialized data: {data}")
            
            # Ajouter le centre de la région
            data['center'] = region.center
            logger.debug(f"Added center data: {region.center}")
            
            logger.info(f"Successfully retrieved details for region {region.name}")
            return Response(data)
            
        except Region.DoesNotExist:
            logger.error(f"Region with ID {pk} not found")
            return Response(
                {"error": "La région spécifiée n'existe pas"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"Error in details view for region {pk}: {str(e)}")
            logger.exception("Full traceback:")
            return Response(
                {"error": "Une erreur s'est produite lors de la récupération des détails de la région"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=['get'])
    def stats(self, request, pk=None):
        """Retourne les statistiques détaillées d'une région"""
        try:
            region = self.get_object()
            
            return Response({
                "name": region.name,
                "population": region.population,
                "male_population": region.male_population,
                "female_population": region.female_population,
                "male_percentage": region.male_percentage,
                "female_percentage": region.female_percentage,
                "total_percentage": region.total_percentage,
                "historical_population": {
                    "1965": region.population_1965,
                    "1977": region.population_1977,
                    "1988": region.population_1988,
                    "2000": region.population_2000,
                    "2013": region.population_2013,
                    "2023": region.population_2023
                },
                "growth_rates": {
                    "1977-1988": region.growth_rate_1977_1988,
                    "1988-2000": region.growth_rate_1988_2000,
                    "2000-2013": region.growth_rate_2000_2013,
                    "2013-2023": region.growth_rate_2013_2023
                }
            })
        except Region.DoesNotExist:
            logger.error(f"Region with ID {pk} not found")
            return Response(
                {"error": "La région spécifiée n'existe pas"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"Error in stats view for region {pk}: {str(e)}")
            return Response(
                {"error": "Une erreur s'est produite lors de la récupération des statistiques de la région"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
