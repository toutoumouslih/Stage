import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

interface ActivityEmploymentStatsProps {
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

const ActivityEmploymentStats: React.FC<ActivityEmploymentStatsProps> = ({
    activity_rates,
    employment_rates
}) => {
    const chartData = [
        {
            name: 'Urbain',
            'Taux d\'activité': activity_rates.urban,
            'Taux d\'emploi': employment_rates.urban
        },
        {
            name: 'Rural',
            'Taux d\'activité': activity_rates.rural,
            'Taux d\'emploi': employment_rates.rural
        },
        {
            name: 'Nomade',
            'Taux d\'activité': activity_rates.nomadic,
            'Taux d\'emploi': employment_rates.nomadic
        },
        {
            name: 'Total',
            'Taux d\'activité': activity_rates.total,
            'Taux d\'emploi': employment_rates.total
        }
    ];

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Taux d'activité et d'emploi
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Taux d'activité" fill="#1976d2" />
                                    <Bar dataKey="Taux d'emploi" fill="#2e7d32" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Taux d'activité
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Urbain
                                        </Typography>
                                        <Typography variant="body1">
                                            {activity_rates.urban}%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Rural
                                        </Typography>
                                        <Typography variant="body1">
                                            {activity_rates.rural}%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Nomade
                                        </Typography>
                                        <Typography variant="body1">
                                            {activity_rates.nomadic}%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Total
                                        </Typography>
                                        <Typography variant="body1">
                                            {activity_rates.total}%
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Taux d'emploi
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Urbain
                                        </Typography>
                                        <Typography variant="body1">
                                            {employment_rates.urban}%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Rural
                                        </Typography>
                                        <Typography variant="body1">
                                            {employment_rates.rural}%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Nomade
                                        </Typography>
                                        <Typography variant="body1">
                                            {employment_rates.nomadic}%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Total
                                        </Typography>
                                        <Typography variant="body1">
                                            {employment_rates.total}%
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ActivityEmploymentStats; 