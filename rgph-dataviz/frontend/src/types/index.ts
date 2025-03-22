export interface Region {
  id: number;
  name: string;
  code: string;
  population: number;
  surface_area: number;
  density: number;
  coordinates?: [number, number]; // Coordonnées [latitude, longitude]
  country: 'MAR' | 'MRT';
}

export interface DemographicData {
  id: number;
  region: number;
  region_name: string;
  indicator_type: 'AGE' | 'GEN' | 'EDU' | 'EMP' | 'HOU';
  name: string;
  value: number;
  year: number;
}

export interface MapTheme {
  property: 'population' | 'density';
  colors: string[];
  labels: string[];
  title: string;
}

export interface CountryStyle {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  gradient: string[];
}
