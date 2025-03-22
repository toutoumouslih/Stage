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
  center: [number, number];
}

export interface GeoJSONProperties extends Region {}

export interface GeoJSONGeometry {
  type: string;
  coordinates: number[][][];
}

export interface GeoJSONFeature {
  type: "Feature";
  properties: GeoJSONProperties;
  geometry: GeoJSONGeometry;
}

export interface GeoJSONData {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}
