import axios from 'axios';
import { Region, RegionStats, RegionGeoJSON } from '../types/region';

const API_BASE_URL = 'http://localhost:8000/api';

export const fetchRegions = async (): Promise<RegionGeoJSON> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/regions/geojson/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching regions:', error);
        throw error;
    }
};

export const fetchRegionDetails = async (regionId: number): Promise<Region> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/regions/${regionId}/details/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching region details:', error);
        throw error;
    }
};

export const fetchRegionStats = async (regionId: number): Promise<RegionStats> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/regions/${regionId}/stats/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching region stats:', error);
        throw error;
    }
};
