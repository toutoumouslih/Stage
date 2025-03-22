import React, { useEffect, useState } from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    IconButton, 
    Typography, 
    Box, 
    Grid,
    CircularProgress,
    Divider,
    Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { fetchRegionDetails } from '../services/api';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import FertilityStats from './FertilityStats';
import MortalityStats from './MortalityStats';
import PopulationStats from './PopulationStats';
import HealthStats from './HealthStats';
import EducationStats from './EducationStats';
import ActivityEmploymentStats from './ActivityEmploymentStats';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: theme.shape.borderRadius,
        maxWidth: '800px',
        width: '100%',
    },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
}));

const StatBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
}));

const COLORS = ['#1976d2', '#e91e63'];

interface RegionDetailsProps {
    open: boolean;
    onClose: () => void;
    regionId: number | null;
}

interface RegionDetailsData {
    id: number;
    name: string;
    capital: string;
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
    fertility_rates: {
        [key: string]: number;
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

const RegionDetails: React.FC<RegionDetailsProps> = ({ open, onClose, regionId }) => {
    const [data, setData] = useState<RegionDetailsData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRegionDetails = async () => {
            if (!regionId) return;

            try {
                setLoading(true);
                setError(null);
                const response = await fetchRegionDetails(regionId);
                
                // Transform the API response to match our RegionDetailsData interface
                const transformedData: RegionDetailsData = {
                    id: response.id,
                    name: response.name || 'Région',
                    capital: response.capital || 'N/A',
                    population: response.population || 0,
                    male_population: response.male_population || 0,
                    female_population: response.female_population || 0,
                    male_percentage: response.male_percentage || 0,
                    female_percentage: response.female_percentage || 0,
                    total_percentage: response.total_percentage || 0,
                    historical_population: response.historical_population || {},
                    growth_rates: response.growth_rates || {},
                    fertility_rates: response.fertility_rates || {},
                    birth_rates: response.birth_rates || {},
                    life_expectancy: response.life_expectancy || {},
                    infant_mortality: response.infant_mortality || {},
                    child_mortality: response.child_mortality || {},
                    mortality_rates: response.mortality_rates || {},
                    health_insurance: response.health_insurance || {
                        urban: 0,
                        rural: 0,
                        nomadic: 0,
                        total: 0
                    },
                    chronic_diseases: response.chronic_diseases || {
                        urban: 0,
                        rural: 0,
                        nomadic: 0,
                        total: 0
                    },
                    disability_rates: response.disability_rates || {
                        male: 0,
                        female: 0,
                        total: 0
                    },
                    illiteracy_rates: response.illiteracy_rates || {
                        male: 0,
                        female: 0,
                        total: 0
                    },
                    primary_enrollment_rates: response.primary_enrollment_rates || {},
                    secondary_enrollment_rates: response.secondary_enrollment_rates || {},
                    net_primary_rates: response.net_primary_rates || {},
                    net_secondary_rates: response.net_secondary_rates || {
                        "2023": {
                            male: 0,
                            female: 0,
                            total: 0
                        }
                    } as { [key: string]: { male: number; female: number; total: number; } },
                    activity_rates: response.activity_rates || {
                        urban: 0,
                        rural: 0,
                        nomadic: 0,
                        total: 0
                    },
                    employment_rates: response.employment_rates || {
                        urban: 0,
                        rural: 0,
                        nomadic: 0,
                        total: 0
                    }
                };
                
                setData(transformedData);
            } catch (err) {
                setError('Erreur lors du chargement des détails de la région');
                console.error('Error loading region details:', err);
            } finally {
                setLoading(false);
            }
        };

        if (open && regionId) {
            loadRegionDetails();
        }
    }, [open, regionId]);

    if (!data) return null;

    const historicalData = Object.entries(data.historical_population).map(([year, population]) => ({
        year,
        population
    }));

    const growthData = Object.entries(data.growth_rates).map(([period, rate]) => ({
        period,
        rate
    }));

    return (
        <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <StyledDialogTitle>
                <Typography variant="h6">{data.name}</Typography>
                <IconButton onClick={onClose} color="inherit">
                    <CloseIcon />
                </IconButton>
            </StyledDialogTitle>
            <DialogContent>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : data ? (
                    <Box sx={{ p: 2 }}>
                        <Grid container spacing={3}>
                            {/* Informations générales */}
                            <Grid item xs={12}>
                                <StatBox>
                                    <Typography variant="h6" gutterBottom>
                                        Informations générales
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Capitale
                                            </Typography>
                                            <Typography variant="body1">
                                                {data.capital}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Population totale
                                            </Typography>
                                            <Typography variant="body1">
                                                {data.population?.toLocaleString() || '0'} ({data.total_percentage}%)
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </StatBox>
                            </Grid>

                            {/* Distribution par genre */}
                            <Grid item xs={12} md={6}>
                                <StatBox>
                                    <Typography variant="h6" gutterBottom>
                                        Distribution par genre
                                    </Typography>
                                    <Box sx={{ height: 200 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={[
                                                        { name: 'Hommes', value: data.male_percentage },
                                                        { name: 'Femmes', value: data.female_percentage }
                                                    ]}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {[data.male_percentage, data.female_percentage].map((value, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Box>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Hommes
                                            </Typography>
                                            <Typography variant="body1">
                                                {data.male_population?.toLocaleString() || '0'} ({data.male_percentage}%)
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Femmes
                                            </Typography>
                                            <Typography variant="body1">
                                                {data.female_population?.toLocaleString() || '0'} ({data.female_percentage}%)
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </StatBox>
                            </Grid>

                            {/* Évolution de la population */}
                            <Grid item xs={12} md={6}>
                                <StatBox>
                                    <Typography variant="h6" gutterBottom>
                                        Évolution de la population
                                    </Typography>
                                    <Box sx={{ height: 200 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={historicalData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="year" />
                                                <YAxis />
                                                <Tooltip />
                                                <Line 
                                                    type="monotone" 
                                                    dataKey="population" 
                                                    stroke="#1976d2" 
                                                    strokeWidth={2}
                                                    dot={{ r: 4 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </Box>
                                </StatBox>
                            </Grid>

                            {/* Taux d'accroissement */}
                            <Grid item xs={12}>
                                <StatBox>
                                    <Typography variant="h6" gutterBottom>
                                        Taux d'accroissement
                                    </Typography>
                                    <Box sx={{ height: 200 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={growthData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="period" />
                                                <YAxis />
                                                <Tooltip />
                                                <Line 
                                                    type="monotone" 
                                                    dataKey="rate" 
                                                    stroke="#2e7d32" 
                                                    strokeWidth={2}
                                                    dot={{ r: 4 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </Box>
                                </StatBox>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider />
                                <HealthStats data={data} />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider />
                                <EducationStats data={data} />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider />
                                <PopulationStats data={data} />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider />
                                <FertilityStats region={data} />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider />
                                <MortalityStats region={data} />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider />
                                <ActivityEmploymentStats
                                    activity_rates={data.activity_rates}
                                    employment_rates={data.employment_rates}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                ) : null}
            </DialogContent>
        </StyledDialog>
    );
};

export default RegionDetails; 