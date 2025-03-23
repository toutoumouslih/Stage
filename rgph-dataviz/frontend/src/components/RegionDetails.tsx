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
    Alert,
    Paper,
    Button,
    DialogActions
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
import { Region } from '../types/region';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        maxWidth: '90vw',
        width: '100%',
        margin: theme.spacing(2),
        borderRadius: theme.spacing(2),
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-4px)',
    },
}));

const StyledHeader = styled(Box)(({ theme }) => ({
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(3),
    borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
    marginBottom: theme.spacing(3),
}));

const StyledSectionTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    borderBottom: `2px solid ${theme.palette.primary.light}`,
}));

const COLORS = ['#1976d2', '#e91e63'];

interface RegionDetailsProps {
    open: boolean;
    onClose: () => void;
    regionId: number;
}

const RegionDetails: React.FC<RegionDetailsProps> = ({ open, onClose, regionId }) => {
    const [data, setData] = useState<Region | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRegionDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetchRegionDetails(regionId);
                setData(response);
            } catch (err) {
                setError('Erreur lors du chargement des données');
                console.error('Error loading region details:', err);
            } finally {
                setLoading(false);
            }
        };

        if (open) {
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
        <StyledDialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
            fullWidth
        >
            <DialogTitle>
                <StyledHeader>
                    <Typography variant="h4" gutterBottom>
                        {data.name}
                    </Typography>
                    <Typography variant="subtitle1">
                        {data.capital} - {data.code}
                    </Typography>
                </StyledHeader>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    {/* Population Overview */}
                    <Grid item xs={12}>
                        <StyledPaper>
                            <StyledSectionTitle variant="h6">
                                Vue d'ensemble démographique
                            </StyledSectionTitle>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <Typography variant="h4" color="primary" gutterBottom>
                                        {data.population.toLocaleString()}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        Population totale (2023)
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Typography variant="h4" color="primary" gutterBottom>
                                        {data.male_percentage.toFixed(1)}%
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        Population masculine
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Typography variant="h4" color="primary" gutterBottom>
                                        {data.female_percentage.toFixed(1)}%
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        Population féminine
                                    </Typography>
                                </Grid>
                            </Grid>
                        </StyledPaper>
                    </Grid>

                    {/* Historical Population Chart */}
                    <Grid item xs={12}>
                        <StyledPaper>
                            <StyledSectionTitle variant="h6">
                                Évolution démographique
                            </StyledSectionTitle>
                            <PopulationStats data={data} />
                        </StyledPaper>
                    </Grid>

                    {/* Health Stats */}
                    <Grid item xs={12}>
                        <StyledPaper>
                            <StyledSectionTitle variant="h6">
                                Santé et bien-être
                            </StyledSectionTitle>
                            <HealthStats data={data} />
                        </StyledPaper>
                    </Grid>

                    {/* Education Stats */}
                    <Grid item xs={12}>
                        <StyledPaper>
                            <StyledSectionTitle variant="h6">
                                Éducation
                            </StyledSectionTitle>
                            <EducationStats data={data} />
                        </StyledPaper>
                    </Grid>

                    {/* Activity and Employment Stats */}
                    <Grid item xs={12}>
                        <StyledPaper>
                            <StyledSectionTitle variant="h6">
                                Activité et emploi
                            </StyledSectionTitle>
                            <ActivityEmploymentStats 
                                activity_rates={data.activity_rates}
                                employment_rates={data.employment_rates}
                            />
                        </StyledPaper>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Fermer
                </Button>
            </DialogActions>
        </StyledDialog>
    );
};

export default RegionDetails; 