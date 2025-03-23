export interface RegionHistoricalData {
    population: {
        1965: number;
        1977: number;
        1988: number;
        2000: number;
        2013: number;
        2023: number;
    };
    growth_rates: {
        "1977-1988": number;
        "1988-2000": number;
        "2000-2013": number;
        "2013-2023": number;
    };
}

export interface RegionStats {
    name: string;
    population: number;
    male_population: number;
    female_population: number;
    male_percentage: number;
    female_percentage: number;
    total_percentage: number;
    historical_population: {
        [key: string]: number;
    };
    growth_rates: {
        [key: string]: number;
    };
}

export interface RegionGeoJSON {
    type: string;
    features: Array<{
        type: string;
        properties: Region;
        geometry: {
            type: string;
            coordinates: number[][][];
        };
    }>;
}

export interface Region {
    id: number;
    name: string;
    code: string;
    capital: string;
    population: number;
    male_population: number;
    female_population: number;
    male_percentage: number;
    female_percentage: number;
    total_percentage: number;
    coordinates: number[][][];
    center: [number, number];
    historical_population: {
        [key: string]: number;
    };
    growth_rates: {
        [key: string]: number;
    };
    fertility_rates: {
        [key: string]: number | null;
    };
    birth_rates: {
        [key: string]: number;
    };
    life_expectancy: {
        [key: string]: number;
    };
    infant_mortality: {
        [key: string]: number;
    };
    child_mortality: {
        [key: string]: number;
    };
    mortality_rates: {
        [key: string]: number;
    };
    health_insurance: {
        urban: number;
        rural: number;
        nomadic: number;
        total: number;
    };
    chronic_diseases: {
        urban: number;
        rural: number;
        nomadic: number;
        total: number;
    };
    disability_rates: {
        male: number;
        female: number;
        total: number;
    };
    illiteracy_rates: {
        male: number;
        female: number;
        total: number;
    };
    primary_enrollment_rates: {
        [key: string]: {
            male: number;
            female: number;
            total: number;
        };
    };
    secondary_enrollment_rates: {
        [key: string]: {
            male: number;
            female: number;
            total: number;
        };
    };
    net_primary_rates: {
        [key: string]: {
            male: number;
            female: number;
            total: number;
        };
    };
    net_secondary_rates: {
        [key: string]: {
            male: number;
            female: number;
            total: number;
        };
    };
    activity_rates: {
        urban: number;
        rural: number;
        nomadic: number;
        total: number;
    };
    employment_rates: {
        urban: number;
        rural: number;
        nomadic: number;
        total: number;
    };
}

export interface RegionDetailsData {
    id: number;
    name: string;
    code: string;
    capital: string;
    population: number;
    male_population: number;
    female_population: number;
    male_percentage: number;
    female_percentage: number;
    total_percentage: number;
    coordinates: number[][][];
    center: [number, number];
    historical_population: {
        [key: string]: number;
    };
    growth_rates: {
        [key: string]: number;
    };
    fertility_rates: {
        [key: string]: number | null;
    };
    birth_rates: {
        [key: string]: number;
    };
    life_expectancy: {
        [key: string]: number;
    };
    infant_mortality: {
        [key: string]: number;
    };
    child_mortality: {
        [key: string]: number;
    };
    mortality_rates: {
        [key: string]: number;
    };
    health_insurance: {
        urban: number;
        rural: number;
        nomadic: number;
        total: number;
    };
    chronic_diseases: {
        urban: number;
        rural: number;
        nomadic: number;
        total: number;
    };
    disability_rates: {
        male: number;
        female: number;
        total: number;
    };
    illiteracy_rates: {
        male: number;
        female: number;
        total: number;
    };
    primary_enrollment_rates: {
        [key: string]: {
            male: number;
            female: number;
            total: number;
        };
    };
    secondary_enrollment_rates: {
        [key: string]: {
            male: number;
            female: number;
            total: number;
        };
    };
    net_primary_rates: {
        [key: string]: {
            male: number;
            female: number;
            total: number;
        };
    };
    net_secondary_rates: {
        [key: string]: {
            male: number;
            female: number;
            total: number;
        };
    };
    activity_rates: {
        urban: number;
        rural: number;
        nomadic: number;
        total: number;
    };
    employment_rates: {
        urban: number;
        rural: number;
        nomadic: number;
        total: number;
    };
} 