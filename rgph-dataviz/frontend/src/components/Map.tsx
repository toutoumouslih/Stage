import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchRegions } from '../services/api';
import { styled } from '@mui/material/styles';
import { 
    Paper, 
    Typography, 
    Box, 
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    MenuItem,
    TextField,
    FormControlLabel,
    Switch,
    InputAdornment,
    IconButton,
    Slider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const MapWrapper = styled(Paper)(({ theme }) => ({
    height: 'calc(100vh - 140px)',
    width: '100%',
    background: '#f5f5f5',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
}));

const ControlPanel = styled(Paper)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 1000,
    padding: theme.spacing(2),
    width: '300px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(4px)',
}));

const LoadingOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1000,
}));

const RegionLabel = styled('div')(({ theme }) => ({
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    zIndex: 500,
    pointerEvents: 'none',
}));

// Style pour les polygones des régions
const regionStyle = {
    weight: 1,
    opacity: 0.5,
    color: '#2196f3',
    fillOpacity: 0.03,
    fillColor: '#2196f3',
    dashArray: '3',
};

const hoveredRegionStyle = {
    ...regionStyle,
    weight: 1.5,
    opacity: 0.7,
    color: '#1976d2',
    fillOpacity: 0.08,
    dashArray: 'none',
};

// Configuration des marqueurs
const markerConfig = {
    sizes: {
        small: { normal: 6, hover: 10 },
        medium: { normal: 8, hover: 12 },
        large: { normal: 10, hover: 14 },
    },
    colors: {
        normal: '#2196f3',
        hover: '#1565c0',
        border: 'white',
    },
};

// Créer un icône personnalisé en forme de losange avec taille configurable
const createDiamondIcon = (isHovered: boolean, size: 'small' | 'medium' | 'large' = 'medium') => {
    const sizes = markerConfig.sizes[size];
    const currentSize = isHovered ? sizes.hover : sizes.normal;
    
    return L.divIcon({
        className: 'custom-diamond-icon',
        html: `<div style="
            width: ${currentSize}px;
            height: ${currentSize}px;
            background: ${isHovered ? markerConfig.colors.hover : markerConfig.colors.normal};
            transform: rotate(45deg);
            border: 1px solid ${markerConfig.colors.border};
            box-shadow: 0 0 3px rgba(0,0,0,0.2);
            transition: all 0.2s ease;
        "></div>`,
        iconSize: [currentSize, currentSize],
        iconAnchor: [currentSize / 2, currentSize / 2],
    });
};

// Créer un icône personnalisé pour les labels avec taille configurable
const createRegionLabel = (name: string, fontSize: number = 11) => {
    return L.divIcon({
        className: 'region-label',
        html: `<div style="
            background-color: rgba(255, 255, 255, 0.85);
            padding: 3px 6px;
            border-radius: 3px;
            font-size: ${fontSize}px;
            font-weight: 500;
            box-shadow: 0 1px 2px rgba(0,0,0,0.15);
            white-space: nowrap;
            pointer-events: none;
            border: 1px solid rgba(0,0,0,0.1);
            color: #333;
            transform: translate(-50%, -50%);
        ">${name}</div>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
    });
};

interface MapProps {
    onRegionClick: (regionId: number) => void;
}

interface Region {
    id: number;
    name: string;
    capital: string;
    coordinates: [number, number];
    population?: number;
}

interface RegionProperties {
    id: number;
    name: string;
    capital: string;
    center?: [number, number];
    population?: number;
}

interface RegionFeature extends GeoJSON.Feature {
    properties: RegionProperties;
    geometry: {
        type: "Polygon";
        coordinates: number[][][];
    };
}

interface RegionGeoJSON {
    type: "FeatureCollection";
    features: RegionFeature[];
}

const Map: React.FC<MapProps> = ({ onRegionClick }) => {
    const [regions, setRegions] = useState<Region[]>([]);
    const [filteredRegions, setFilteredRegions] = useState<Region[]>([]);
    const [hoveredRegion, setHoveredRegion] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [showLabels, setShowLabels] = useState(true);
    const [markerSize, setMarkerSize] = useState<'small' | 'medium' | 'large'>('medium');
    const [labelSize, setLabelSize] = useState<number>(11);

    // Charger les régions avec useCallback
    const loadRegions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchRegions() as RegionGeoJSON;
            const regionsData = data.features.map(feature => {
                if (!feature.properties) {
                    throw new Error('Feature properties are missing');
                }

                const coordinates: [number, number] = feature.properties.center || [
                    feature.geometry.coordinates[0][0][1],
                    feature.geometry.coordinates[0][0][0]
                ];

                return {
                    id: feature.properties.id,
                    name: feature.properties.name,
                    capital: feature.properties.capital,
                    coordinates,
                    population: feature.properties.population,
                };
            });
            setRegions(regionsData);
            setFilteredRegions(regionsData);
        } catch (error) {
            console.error('Error loading regions:', error);
            setError('Erreur lors du chargement des régions');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadRegions();
    }, [loadRegions]);

    // Filtrer et trier les régions avec useMemo
    const processedRegions = useMemo(() => {
        let result = [...regions];
        
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            result = result.filter(region => 
                region.name.toLowerCase().includes(searchLower) ||
                region.capital.toLowerCase().includes(searchLower)
            );
        }
        
        result.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'capital':
                    return a.capital.localeCompare(b.capital);
                case 'population':
                    return (b.population || 0) - (a.population || 0);
                default:
                    return 0;
            }
        });
        
        return result;
    }, [regions, searchTerm, sortBy]);

    // Mettre à jour les régions filtrées quand processedRegions change
    useEffect(() => {
        setFilteredRegions(processedRegions);
    }, [processedRegions]);

    // Gestionnaires d'événements optimisés
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleSortChange = useCallback((event: SelectChangeEvent) => {
        setSortBy(event.target.value);
    }, []);

    const handleMarkerHover = useCallback((regionId: number, e: L.LeafletMouseEvent) => {
        setHoveredRegion(regionId);
        e.target.openPopup();
    }, []);

    const handleMarkerLeave = useCallback((e: L.LeafletMouseEvent) => {
        setHoveredRegion(null);
        e.target.closePopup();
    }, []);

    return (
        <MapWrapper elevation={3}>
            {loading && (
                <LoadingOverlay>
                    <CircularProgress />
                </LoadingOverlay>
            )}
            {error && (
                <LoadingOverlay>
                    <Typography color="error">{error}</Typography>
                </LoadingOverlay>
            )}
            
            <ControlPanel elevation={2}>
                <Typography variant="h6" gutterBottom>
                    Filtres et Personnalisation
                </Typography>
                
                <TextField
                    fullWidth
                    size="small"
                    label="Rechercher une région"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: searchTerm && (
                            <InputAdornment position="end">
                                <IconButton
                                    size="small"
                                    onClick={() => setSearchTerm('')}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                
                <FormControl fullWidth size="small" margin="normal">
                    <InputLabel>Trier par</InputLabel>
                    <Select
                        value={sortBy}
                        label="Trier par"
                        onChange={handleSortChange}
                    >
                        <MenuItem value="name">Nom</MenuItem>
                        <MenuItem value="capital">Capitale</MenuItem>
                        <MenuItem value="population">Population</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                        Taille des marqueurs
                    </Typography>
                    <FormControl fullWidth size="small">
                        <Select
                            value={markerSize}
                            onChange={(e) => setMarkerSize(e.target.value as 'small' | 'medium' | 'large')}
                        >
                            <MenuItem value="small">Petit</MenuItem>
                            <MenuItem value="medium">Moyen</MenuItem>
                            <MenuItem value="large">Grand</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                        Taille du texte
                    </Typography>
                    <Slider
                        value={labelSize}
                        min={8}
                        max={14}
                        step={1}
                        onChange={(_, value) => setLabelSize(value as number)}
                        valueLabelDisplay="auto"
                        size="small"
                    />
                </Box>
                
                <FormControlLabel
                    control={
                        <Switch
                            checked={showLabels}
                            onChange={(e) => setShowLabels(e.target.checked)}
                        />
                    }
                    label="Afficher les noms des régions"
                />
                
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    {filteredRegions.length} région{filteredRegions.length > 1 ? 's' : ''} trouvée{filteredRegions.length > 1 ? 's' : ''}
                </Typography>
            </ControlPanel>

            <MapContainer
                center={[20.5, -10.5]}
                zoom={6}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                maxBounds={[[14, -20], [28, -4]]}
                minZoom={5}
                maxZoom={10}
            >
                <ZoomControl position="bottomright" />
                <TileLayer
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
                />
                {filteredRegions.map(region => (
                    <React.Fragment key={region.id}>
                        <Marker
                            position={region.coordinates}
                            icon={createDiamondIcon(hoveredRegion === region.id, markerSize)}
                            eventHandlers={{
                                click: () => onRegionClick(region.id),
                                mouseover: (e) => handleMarkerHover(region.id, e),
                                mouseout: handleMarkerLeave
                            }}
                        >
                            <Popup>
                                <Box sx={{ p: 1 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                        {region.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Capitale: {region.capital}
                                    </Typography>
                                    {region.population && (
                                        <Typography variant="body2" color="text.secondary">
                                            Population: {region.population.toLocaleString()}
                                        </Typography>
                                    )}
                                </Box>
                            </Popup>
                        </Marker>

                        {showLabels && (
                            <Marker
                                position={region.coordinates}
                                icon={createRegionLabel(region.name, labelSize)}
                                interactive={false}
                            />
                        )}
                    </React.Fragment>
                ))}
            </MapContainer>
        </MapWrapper>
    );
};

export default Map; 