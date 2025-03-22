from rest_framework import serializers
from .models import Region

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = [
            'id', 'name', 'code', 'capital', 'population', 'male_population', 'female_population',
            'male_percentage', 'female_percentage', 'total_percentage', 'coordinates', 'center',
            'population_1965', 'population_1977', 'population_1988', 'population_2000',
            'population_2013', 'population_2023', 'growth_rate_1977_1988', 'growth_rate_1988_2000',
            'growth_rate_2000_2013', 'growth_rate_2013_2023', 'fertility_rate_1977',
            'fertility_rate_1981', 'fertility_rate_1988', 'fertility_rate_2000',
            'fertility_rate_2003', 'fertility_rate_2011', 'fertility_rate_2013',
            'fertility_rate_2015', 'fertility_rate_2019', 'fertility_rate_2023',
            'birth_rate_2013', 'birth_rate_2023', 'life_expectancy_1988', 'life_expectancy_2000',
            'life_expectancy_2023', 'infant_mortality_2013', 'infant_mortality_2019',
            'infant_mortality_2023', 'child_mortality_2019', 'child_mortality_2023',
            'mortality_rate_2013', 'mortality_rate_2023', 'health_insurance_urban',
            'health_insurance_rural', 'health_insurance_nomadic', 'health_insurance_total',
            'chronic_diseases_urban', 'chronic_diseases_rural', 'chronic_diseases_nomadic',
            'chronic_diseases_total', 'disability_rate_male', 'disability_rate_female',
            'disability_rate_total', 'illiteracy_rate_male', 'illiteracy_rate_female',
            'illiteracy_rate_total', 'primary_enrollment_rate_male_2000',
            'primary_enrollment_rate_female_2000', 'primary_enrollment_rate_total_2000',
            'primary_enrollment_rate_male_2013', 'primary_enrollment_rate_female_2013',
            'primary_enrollment_rate_total_2013', 'primary_enrollment_rate_male_2023',
            'primary_enrollment_rate_female_2023', 'primary_enrollment_rate_total_2023',
            'secondary_enrollment_rate_male_2000', 'secondary_enrollment_rate_female_2000',
            'secondary_enrollment_rate_total_2000', 'secondary_enrollment_rate_male_2013',
            'secondary_enrollment_rate_female_2013', 'secondary_enrollment_rate_total_2013',
            'secondary_enrollment_rate_male_2023', 'secondary_enrollment_rate_female_2023',
            'secondary_enrollment_rate_total_2023', 'net_primary_rate_male_2000',
            'net_primary_rate_female_2000', 'net_primary_rate_total_2000',
            'net_primary_rate_male_2013', 'net_primary_rate_female_2013',
            'net_primary_rate_total_2013', 'net_primary_rate_male_2023',
            'net_primary_rate_female_2023', 'net_primary_rate_total_2023',
            'net_secondary_rate_male_2023', 'net_secondary_rate_female_2023',
            'net_secondary_rate_total_2023', 'activity_rate_urban', 'activity_rate_rural',
            'activity_rate_nomadic', 'activity_rate_total', 'employment_rate_urban',
            'employment_rate_rural', 'employment_rate_nomadic', 'employment_rate_total'
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        
        # Format historical population data
        data['historical_population'] = {
            '1965': data.pop('population_1965'),
            '1977': data.pop('population_1977'),
            '1988': data.pop('population_1988'),
            '2000': data.pop('population_2000'),
            '2013': data.pop('population_2013'),
            '2023': data.pop('population_2023')
        }
        
        # Format growth rates data
        data['growth_rates'] = {
            '1977_1988': data.pop('growth_rate_1977_1988'),
            '1988_2000': data.pop('growth_rate_1988_2000'),
            '2000_2013': data.pop('growth_rate_2000_2013'),
            '2013_2023': data.pop('growth_rate_2013_2023')
        }
        
        # Format fertility rates data
        data['fertility_rates'] = {
            '1977': data.pop('fertility_rate_1977'),
            '1981': data.pop('fertility_rate_1981'),
            '1988': data.pop('fertility_rate_1988'),
            '2000': data.pop('fertility_rate_2000'),
            '2003': data.pop('fertility_rate_2003'),
            '2011': data.pop('fertility_rate_2011'),
            '2013': data.pop('fertility_rate_2013'),
            '2015': data.pop('fertility_rate_2015'),
            '2019': data.pop('fertility_rate_2019'),
            '2023': data.pop('fertility_rate_2023')
        }
        
        # Format birth rates data
        data['birth_rates'] = {
            '2013': data.pop('birth_rate_2013'),
            '2023': data.pop('birth_rate_2023')
        }
        
        # Format life expectancy data
        data['life_expectancy'] = {
            '1988': data.pop('life_expectancy_1988'),
            '2000': data.pop('life_expectancy_2000'),
            '2023': data.pop('life_expectancy_2023')
        }
        
        # Format infant mortality data
        data['infant_mortality'] = {
            '2013': data.pop('infant_mortality_2013'),
            '2019': data.pop('infant_mortality_2019'),
            '2023': data.pop('infant_mortality_2023')
        }
        
        # Format child mortality data
        data['child_mortality'] = {
            '2019': data.pop('child_mortality_2019'),
            '2023': data.pop('child_mortality_2023')
        }
        
        # Format mortality rates data
        data['mortality_rates'] = {
            '2013': data.pop('mortality_rate_2013'),
            '2023': data.pop('mortality_rate_2023')
        }
        
        # Format health insurance data
        data['health_insurance'] = {
            'urban': data.pop('health_insurance_urban'),
            'rural': data.pop('health_insurance_rural'),
            'nomadic': data.pop('health_insurance_nomadic'),
            'total': data.pop('health_insurance_total')
        }
        
        # Format chronic diseases data
        data['chronic_diseases'] = {
            'urban': data.pop('chronic_diseases_urban'),
            'rural': data.pop('chronic_diseases_rural'),
            'nomadic': data.pop('chronic_diseases_nomadic'),
            'total': data.pop('chronic_diseases_total')
        }
        
        # Format disability rates data
        data['disability_rates'] = {
            'male': data.pop('disability_rate_male'),
            'female': data.pop('disability_rate_female'),
            'total': data.pop('disability_rate_total')
        }

        # Format illiteracy rates data
        data['illiteracy_rates'] = {
            'male': data.pop('illiteracy_rate_male'),
            'female': data.pop('illiteracy_rate_female'),
            'total': data.pop('illiteracy_rate_total')
        }

        # Format primary enrollment rates data
        data['primary_enrollment_rates'] = {
            '2000': {
                'male': data.pop('primary_enrollment_rate_male_2000'),
                'female': data.pop('primary_enrollment_rate_female_2000'),
                'total': data.pop('primary_enrollment_rate_total_2000')
            },
            '2013': {
                'male': data.pop('primary_enrollment_rate_male_2013'),
                'female': data.pop('primary_enrollment_rate_female_2013'),
                'total': data.pop('primary_enrollment_rate_total_2013')
            },
            '2023': {
                'male': data.pop('primary_enrollment_rate_male_2023'),
                'female': data.pop('primary_enrollment_rate_female_2023'),
                'total': data.pop('primary_enrollment_rate_total_2023')
            }
        }

        # Format secondary enrollment rates data
        data['secondary_enrollment_rates'] = {
            '2000': {
                'male': data.pop('secondary_enrollment_rate_male_2000'),
                'female': data.pop('secondary_enrollment_rate_female_2000'),
                'total': data.pop('secondary_enrollment_rate_total_2000')
            },
            '2013': {
                'male': data.pop('secondary_enrollment_rate_male_2013'),
                'female': data.pop('secondary_enrollment_rate_female_2013'),
                'total': data.pop('secondary_enrollment_rate_total_2013')
            },
            '2023': {
                'male': data.pop('secondary_enrollment_rate_male_2023'),
                'female': data.pop('secondary_enrollment_rate_female_2023'),
                'total': data.pop('secondary_enrollment_rate_total_2023')
            }
        }

        # Format net primary rates data
        data['net_primary_rates'] = {
            '2000': {
                'male': data.pop('net_primary_rate_male_2000'),
                'female': data.pop('net_primary_rate_female_2000'),
                'total': data.pop('net_primary_rate_total_2000')
            },
            '2013': {
                'male': data.pop('net_primary_rate_male_2013'),
                'female': data.pop('net_primary_rate_female_2013'),
                'total': data.pop('net_primary_rate_total_2013')
            },
            '2023': {
                'male': data.pop('net_primary_rate_male_2023'),
                'female': data.pop('net_primary_rate_female_2023'),
                'total': data.pop('net_primary_rate_total_2023')
            }
        }

        # Format net secondary rates data
        data['net_secondary_rates'] = {
            '2023': {
                'male': data.pop('net_secondary_rate_male_2023'),
                'female': data.pop('net_secondary_rate_female_2023'),
                'total': data.pop('net_secondary_rate_total_2023')
            }
        }

        # Format activity rates data
        data['activity_rates'] = {
            'urban': data.pop('activity_rate_urban'),
            'rural': data.pop('activity_rate_rural'),
            'nomadic': data.pop('activity_rate_nomadic'),
            'total': data.pop('activity_rate_total')
        }

        # Format employment rates data
        data['employment_rates'] = {
            'urban': data.pop('employment_rate_urban'),
            'rural': data.pop('employment_rate_rural'),
            'nomadic': data.pop('employment_rate_nomadic'),
            'total': data.pop('employment_rate_total')
        }

        return data
