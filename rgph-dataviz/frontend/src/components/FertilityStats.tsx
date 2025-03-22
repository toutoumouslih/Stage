import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme
} from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

interface FertilityStatsProps {
    region: {
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
    };
}

const FertilityStats: React.FC<FertilityStatsProps> = ({ region }) => {
    const theme = useTheme();

    // Préparer les données pour le graphique de fécondité
    const fertilityData = Object.entries(region.fertility_rates)
        .filter(([_, value]) => value !== null)
        .map(([year, rate]) => ({
            year: parseInt(year),
            rate: rate
        }))
        .sort((a, b) => a.year - b.year);

    // Préparer les données pour le graphique de natalité
    const birthRateData = Object.entries(region.birth_rates)
        .filter(([_, value]) => value !== null)
        .map(([year, rate]) => ({
            year: parseInt(year),
            rate: rate
        }))
        .sort((a, b) => a.year - b.year);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Statistiques de Fécondité et Natalité
            </Typography>
            
            <Grid container spacing={3}>
                {/* Graphique d'évolution de la fécondité */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Évolution de l'Indice Synthétique de Fécondité
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={fertilityData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="rate"
                                        stroke={theme.palette.primary.main}
                                        name="Taux de fécondité"
                                        dot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>

                {/* Graphique d'évolution de la natalité */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Évolution du Taux Brut de Natalité
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={birthRateData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="rate"
                                        stroke={theme.palette.secondary.main}
                                        name="Taux de natalité"
                                        dot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>

                {/* Tableau des données */}
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Année</TableCell>
                                    <TableCell align="right">Taux de Fécondité</TableCell>
                                    <TableCell align="right">Taux de Natalité</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(region.fertility_rates)
                                    .sort((a, b) => parseInt(a) - parseInt(b))
                                    .map(year => (
                                        <TableRow key={year}>
                                            <TableCell component="th" scope="row">
                                                {year}
                                            </TableCell>
                                            <TableCell align="right">
                                                {region.fertility_rates[year]?.toFixed(1) || '-'}
                                            </TableCell>
                                            <TableCell align="right">
                                                {region.birth_rates[year]?.toFixed(1) || '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FertilityStats; 