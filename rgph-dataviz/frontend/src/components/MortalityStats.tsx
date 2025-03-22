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

interface MortalityStatsProps {
    region: {
        id: number;
        name: string;
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
    };
}

const MortalityStats: React.FC<MortalityStatsProps> = ({ region }) => {
    const theme = useTheme();

    // Préparer les données pour le graphique d'espérance de vie
    const lifeExpectancyData = Object.entries(region.life_expectancy)
        .filter(([_, value]) => value !== null)
        .map(([year, value]) => ({
            year: parseInt(year),
            value: value
        }))
        .sort((a, b) => a.year - b.year);

    // Préparer les données pour le graphique de mortalité infantile
    const infantMortalityData = Object.entries(region.infant_mortality)
        .filter(([_, value]) => value !== null)
        .map(([year, value]) => ({
            year: parseInt(year),
            value: value
        }))
        .sort((a, b) => a.year - b.year);

    // Préparer les données pour le graphique de mortalité infanto-juvénile
    const childMortalityData = Object.entries(region.child_mortality)
        .filter(([_, value]) => value !== null)
        .map(([year, value]) => ({
            year: parseInt(year),
            value: value
        }))
        .sort((a, b) => a.year - b.year);

    // Préparer les données pour le graphique de taux brut de mortalité
    const mortalityRateData = Object.entries(region.mortality_rates)
        .filter(([_, value]) => value !== null)
        .map(([year, value]) => ({
            year: parseInt(year),
            value: value
        }))
        .sort((a, b) => a.year - b.year);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Statistiques de Mortalité et Espérance de Vie
            </Typography>
            
            <Grid container spacing={3}>
                {/* Graphique d'espérance de vie */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Évolution de l'Espérance de Vie
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={lifeExpectancyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke={theme.palette.primary.main}
                                        name="Espérance de vie (années)"
                                        dot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>

                {/* Graphique de mortalité infantile */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Évolution de la Mortalité Infantile
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={infantMortalityData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke={theme.palette.error.main}
                                        name="Taux de mortalité infantile"
                                        dot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>

                {/* Graphique de mortalité infanto-juvénile */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Évolution de la Mortalité Infanto-juvénile
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={childMortalityData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke={theme.palette.warning.main}
                                        name="Taux de mortalité infanto-juvénile"
                                        dot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>

                {/* Graphique de taux brut de mortalité */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Évolution du Taux Brut de Mortalité
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={mortalityRateData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke={theme.palette.secondary.main}
                                        name="Taux brut de mortalité"
                                        dot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>

                {/* Tableau récapitulatif */}
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Année</TableCell>
                                    <TableCell align="right">Espérance de vie</TableCell>
                                    <TableCell align="right">Mortalité infantile</TableCell>
                                    <TableCell align="right">Mortalité infanto-juvénile</TableCell>
                                    <TableCell align="right">Taux brut de mortalité</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.from(new Set([
                                    ...Object.keys(region.life_expectancy),
                                    ...Object.keys(region.infant_mortality),
                                    ...Object.keys(region.child_mortality),
                                    ...Object.keys(region.mortality_rates)
                                ]))
                                    .sort((a, b) => parseInt(a) - parseInt(b))
                                    .map(year => (
                                        <TableRow key={year}>
                                            <TableCell component="th" scope="row">
                                                {year}
                                            </TableCell>
                                            <TableCell align="right">
                                                {region.life_expectancy[year]?.toFixed(1) || '-'}
                                            </TableCell>
                                            <TableCell align="right">
                                                {region.infant_mortality[year]?.toFixed(1) || '-'}
                                            </TableCell>
                                            <TableCell align="right">
                                                {region.child_mortality[year]?.toFixed(1) || '-'}
                                            </TableCell>
                                            <TableCell align="right">
                                                {region.mortality_rates[year]?.toFixed(1) || '-'}
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

export default MortalityStats; 