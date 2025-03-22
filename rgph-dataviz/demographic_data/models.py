from django.db import models

class Region(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=2, unique=True)
    capital = models.CharField(max_length=100)
    population = models.IntegerField(null=True, blank=True)
    male_population = models.IntegerField(null=True, blank=True)
    female_population = models.IntegerField(null=True, blank=True)
    coordinates = models.JSONField(null=True, blank=True, default=list)
    
    # Pourcentages de population
    male_percentage = models.FloatField(null=True, blank=True)
    female_percentage = models.FloatField(null=True, blank=True)
    total_percentage = models.FloatField(null=True, blank=True)
    
    # Données historiques de population
    population_1965 = models.IntegerField(null=True, blank=True)
    population_1977 = models.IntegerField(null=True, blank=True)
    population_1988 = models.IntegerField(null=True, blank=True)
    population_2000 = models.IntegerField(null=True, blank=True)
    population_2013 = models.IntegerField(null=True, blank=True)
    population_2023 = models.IntegerField(null=True, blank=True)
    
    # Taux d'accroissement
    growth_rate_1977_1988 = models.FloatField(null=True, blank=True)
    growth_rate_1988_2000 = models.FloatField(null=True, blank=True)
    growth_rate_2000_2013 = models.FloatField(null=True, blank=True)
    growth_rate_2013_2023 = models.FloatField(null=True, blank=True)

    # Données de fécondité
    fertility_rate_1977 = models.FloatField(null=True, blank=True)
    fertility_rate_1981 = models.FloatField(null=True, blank=True)
    fertility_rate_1988 = models.FloatField(null=True, blank=True)
    fertility_rate_2000 = models.FloatField(null=True, blank=True)
    fertility_rate_2003 = models.FloatField(null=True, blank=True)
    fertility_rate_2011 = models.FloatField(null=True, blank=True)
    fertility_rate_2013 = models.FloatField(null=True, blank=True)
    fertility_rate_2015 = models.FloatField(null=True, blank=True)
    fertility_rate_2019 = models.FloatField(null=True, blank=True)
    fertility_rate_2023 = models.FloatField(null=True, blank=True)

    # Taux brut de natalité
    birth_rate_2013 = models.FloatField(null=True, blank=True)
    birth_rate_2023 = models.FloatField(null=True, blank=True)

    # Espérance de vie
    life_expectancy_1988 = models.FloatField(null=True, blank=True)
    life_expectancy_2000 = models.FloatField(null=True, blank=True)
    life_expectancy_2023 = models.FloatField(null=True, blank=True)

    # Mortalité infantile
    infant_mortality_2013 = models.FloatField(null=True, blank=True)
    infant_mortality_2019 = models.FloatField(null=True, blank=True)
    infant_mortality_2023 = models.FloatField(null=True, blank=True)

    # Mortalité infanto-juvénile
    child_mortality_2019 = models.FloatField(null=True, blank=True)
    child_mortality_2023 = models.FloatField(null=True, blank=True)

    # Taux brut de mortalité
    mortality_rate_2013 = models.FloatField(null=True, blank=True)
    mortality_rate_2023 = models.FloatField(null=True, blank=True)

    # Données de santé
    # Assurance maladie par milieu de résidence
    health_insurance_urban = models.FloatField(null=True, blank=True)
    health_insurance_rural = models.FloatField(null=True, blank=True)
    health_insurance_nomadic = models.FloatField(null=True, blank=True)
    health_insurance_total = models.FloatField(null=True, blank=True)

    # Maladies chroniques par milieu de résidence
    chronic_diseases_urban = models.FloatField(null=True, blank=True)
    chronic_diseases_rural = models.FloatField(null=True, blank=True)
    chronic_diseases_nomadic = models.FloatField(null=True, blank=True)
    chronic_diseases_total = models.FloatField(null=True, blank=True)

    # Taux de prévalence du handicap par sexe
    disability_rate_male = models.FloatField(null=True, blank=True)
    disability_rate_female = models.FloatField(null=True, blank=True)
    disability_rate_total = models.FloatField(null=True, blank=True)

    # Taux d'analphabétisme
    illiteracy_rate_male = models.FloatField(null=True, blank=True)
    illiteracy_rate_female = models.FloatField(null=True, blank=True)
    illiteracy_rate_total = models.FloatField(null=True, blank=True)

    # Taux brut de scolarisation au fondamental
    primary_enrollment_rate_male_2000 = models.FloatField(null=True, blank=True)
    primary_enrollment_rate_female_2000 = models.FloatField(null=True, blank=True)
    primary_enrollment_rate_total_2000 = models.FloatField(null=True, blank=True)
    primary_enrollment_rate_male_2013 = models.FloatField(null=True, blank=True)
    primary_enrollment_rate_female_2013 = models.FloatField(null=True, blank=True)
    primary_enrollment_rate_total_2013 = models.FloatField(null=True, blank=True)
    primary_enrollment_rate_male_2023 = models.FloatField(null=True, blank=True)
    primary_enrollment_rate_female_2023 = models.FloatField(null=True, blank=True)
    primary_enrollment_rate_total_2023 = models.FloatField(null=True, blank=True)

    # Taux brut de scolarisation au secondaire
    secondary_enrollment_rate_male_2000 = models.FloatField(null=True, blank=True)
    secondary_enrollment_rate_female_2000 = models.FloatField(null=True, blank=True)
    secondary_enrollment_rate_total_2000 = models.FloatField(null=True, blank=True)
    secondary_enrollment_rate_male_2013 = models.FloatField(null=True, blank=True)
    secondary_enrollment_rate_female_2013 = models.FloatField(null=True, blank=True)
    secondary_enrollment_rate_total_2013 = models.FloatField(null=True, blank=True)
    secondary_enrollment_rate_male_2023 = models.FloatField(null=True, blank=True)
    secondary_enrollment_rate_female_2023 = models.FloatField(null=True, blank=True)
    secondary_enrollment_rate_total_2023 = models.FloatField(null=True, blank=True)

    # Taux net de scolarisation au fondamental
    net_primary_rate_male_2000 = models.FloatField(null=True, blank=True)
    net_primary_rate_female_2000 = models.FloatField(null=True, blank=True)
    net_primary_rate_total_2000 = models.FloatField(null=True, blank=True)
    net_primary_rate_male_2013 = models.FloatField(null=True, blank=True)
    net_primary_rate_female_2013 = models.FloatField(null=True, blank=True)
    net_primary_rate_total_2013 = models.FloatField(null=True, blank=True)
    net_primary_rate_male_2023 = models.FloatField(null=True, blank=True)
    net_primary_rate_female_2023 = models.FloatField(null=True, blank=True)
    net_primary_rate_total_2023 = models.FloatField(null=True, blank=True)

    # Taux net de scolarisation au secondaire
    net_secondary_rate_male_2023 = models.FloatField(null=True, blank=True)
    net_secondary_rate_female_2023 = models.FloatField(null=True, blank=True)
    net_secondary_rate_total_2023 = models.FloatField(null=True, blank=True)

    # Activity rates
    activity_rate_urban = models.FloatField(null=True, blank=True)
    activity_rate_rural = models.FloatField(null=True, blank=True)
    activity_rate_nomadic = models.FloatField(null=True, blank=True)
    activity_rate_total = models.FloatField(null=True, blank=True)

    # Employment rates
    employment_rate_urban = models.FloatField(null=True, blank=True)
    employment_rate_rural = models.FloatField(null=True, blank=True)
    employment_rate_nomadic = models.FloatField(null=True, blank=True)
    employment_rate_total = models.FloatField(null=True, blank=True)

    @property
    def center(self):
        """Calcule le centre de la région"""
        if not self.coordinates or not self.coordinates[0]:
            return None
            
        coords = self.coordinates[0]  # Premier polygone
        lats = [coord[1] for coord in coords]
        lons = [coord[0] for coord in coords]
        
        return [
            sum(lats) / len(lats),
            sum(lons) / len(lons)
        ]

    def __str__(self):
        return self.name

    def to_dict(self):
        """Convertit l'objet en dictionnaire pour l'API"""
        data = {
            "id": self.id,
            "name": self.name,
            "code": self.code,
            "capital": self.capital,
            "population": self.population,
            "male_population": self.male_population,
            "female_population": self.female_population,
            "male_percentage": self.male_percentage,
            "female_percentage": self.female_percentage,
            "total_percentage": self.total_percentage,
            "population_2023": self.population_2023,
            "growth_rate_2013_2023": self.growth_rate_2013_2023,
            "fertility_rates": {
                "1977": self.fertility_rate_1977,
                "1981": self.fertility_rate_1981,
                "1988": self.fertility_rate_1988,
                "2000": self.fertility_rate_2000,
                "2003": self.fertility_rate_2003,
                "2011": self.fertility_rate_2011,
                "2013": self.fertility_rate_2013,
                "2015": self.fertility_rate_2015,
                "2019": self.fertility_rate_2019,
                "2023": self.fertility_rate_2023
            },
            "birth_rates": {
                "2013": self.birth_rate_2013,
                "2023": self.birth_rate_2023
            },
            "life_expectancy": {
                "1988": self.life_expectancy_1988,
                "2000": self.life_expectancy_2000,
                "2023": self.life_expectancy_2023
            },
            "infant_mortality": {
                "2013": self.infant_mortality_2013,
                "2019": self.infant_mortality_2019,
                "2023": self.infant_mortality_2023
            },
            "child_mortality": {
                "2019": self.child_mortality_2019,
                "2023": self.child_mortality_2023
            },
            "mortality_rates": {
                "2013": self.mortality_rate_2013,
                "2023": self.mortality_rate_2023
            },
            "health_insurance": {
                "urban": self.health_insurance_urban,
                "rural": self.health_insurance_rural,
                "nomadic": self.health_insurance_nomadic,
                "total": self.health_insurance_total
            },
            "chronic_diseases": {
                "urban": self.chronic_diseases_urban,
                "rural": self.chronic_diseases_rural,
                "nomadic": self.chronic_diseases_nomadic,
                "total": self.chronic_diseases_total
            },
            "disability_rates": {
                "male": self.disability_rate_male,
                "female": self.disability_rate_female,
                "total": self.disability_rate_total
            },
            "illiteracy_rates": {
                "male": self.illiteracy_rate_male,
                "female": self.illiteracy_rate_female,
                "total": self.illiteracy_rate_total
            },
            "primary_enrollment_rates": {
                "2000": {
                    "male": self.primary_enrollment_rate_male_2000,
                    "female": self.primary_enrollment_rate_female_2000,
                    "total": self.primary_enrollment_rate_total_2000
                },
                "2013": {
                    "male": self.primary_enrollment_rate_male_2013,
                    "female": self.primary_enrollment_rate_female_2013,
                    "total": self.primary_enrollment_rate_total_2013
                },
                "2023": {
                    "male": self.primary_enrollment_rate_male_2023,
                    "female": self.primary_enrollment_rate_female_2023,
                    "total": self.primary_enrollment_rate_total_2023
                }
            },
            "secondary_enrollment_rates": {
                "2000": {
                    "male": self.secondary_enrollment_rate_male_2000,
                    "female": self.secondary_enrollment_rate_female_2000,
                    "total": self.secondary_enrollment_rate_total_2000
                },
                "2013": {
                    "male": self.secondary_enrollment_rate_male_2013,
                    "female": self.secondary_enrollment_rate_female_2013,
                    "total": self.secondary_enrollment_rate_total_2013
                },
                "2023": {
                    "male": self.secondary_enrollment_rate_male_2023,
                    "female": self.secondary_enrollment_rate_female_2023,
                    "total": self.secondary_enrollment_rate_total_2023
                }
            },
            "net_primary_rates": {
                "2000": {
                    "male": self.net_primary_rate_male_2000,
                    "female": self.net_primary_rate_female_2000,
                    "total": self.net_primary_rate_total_2000
                },
                "2013": {
                    "male": self.net_primary_rate_male_2013,
                    "female": self.net_primary_rate_female_2013,
                    "total": self.net_primary_rate_total_2013
                },
                "2023": {
                    "male": self.net_primary_rate_male_2023,
                    "female": self.net_primary_rate_female_2023,
                    "total": self.net_primary_rate_total_2023
                }
            },
            "net_secondary_rates": {
                "2023": {
                    "male": self.net_secondary_rate_male_2023,
                    "female": self.net_secondary_rate_female_2023,
                    "total": self.net_secondary_rate_total_2023
                }
            },
            "activity_rates": {
                "urban": self.activity_rate_urban,
                "rural": self.activity_rate_rural,
                "nomadic": self.activity_rate_nomadic,
                "total": self.activity_rate_total
            },
            "employment_rates": {
                "urban": self.employment_rate_urban,
                "rural": self.employment_rate_rural,
                "nomadic": self.employment_rate_nomadic,
                "total": self.employment_rate_total
            }
        }
        return data

    class Meta:
        ordering = ['name']
