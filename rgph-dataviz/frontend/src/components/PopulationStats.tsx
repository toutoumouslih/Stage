import React from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PopulationStatsProps {
  data: {
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
  };
}

const PopulationStats: React.FC<PopulationStatsProps> = ({ data }) => {
  // Préparation des données pour le graphique de population
  const populationData = Object.entries(data.historical_population)
    .map(([year, value]) => ({
      year,
      value
    }))
    .sort((a, b) => parseInt(a.year) - parseInt(b.year));

  // Préparation des données pour le graphique des taux d'accroissement
  const growthRatesData = Object.entries(data.growth_rates)
    .map(([period, value]) => ({
      period,
      value
    }))
    .sort((a, b) => a.period.localeCompare(b.period));

  return (
    <Grid container spacing={3}>
      {/* Population totale */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Évolution de la population
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={populationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" name="Population" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Taux d'accroissement */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Taux d'accroissement
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthRatesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" name="Taux (%)" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Tableau récapitulatif */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Données détaillées
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Indicateur</TableCell>
                  <TableCell align="right">Valeur</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Population totale</TableCell>
                  <TableCell align="right">{data.population.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Population masculine</TableCell>
                  <TableCell align="right">{data.male_population.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Population féminine</TableCell>
                  <TableCell align="right">{data.female_population.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>% Population masculine</TableCell>
                  <TableCell align="right">{data.male_percentage.toFixed(1)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>% Population féminine</TableCell>
                  <TableCell align="right">{data.female_percentage.toFixed(1)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>% Total</TableCell>
                  <TableCell align="right">{data.total_percentage.toFixed(1)}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PopulationStats; 