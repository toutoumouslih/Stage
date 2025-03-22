import React from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface HealthStatsProps {
  data: {
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
  };
}

const HealthStats: React.FC<HealthStatsProps> = ({ data }) => {
  // Préparation des données pour les graphiques
  const healthInsuranceData = [
    { name: 'Urbain', value: data.health_insurance.urban },
    { name: 'Rural', value: data.health_insurance.rural },
    { name: 'Nomade', value: data.health_insurance.nomadic }
  ];

  const chronicDiseasesData = [
    { name: 'Urbain', value: data.chronic_diseases.urban },
    { name: 'Rural', value: data.chronic_diseases.rural },
    { name: 'Nomade', value: data.chronic_diseases.nomadic }
  ];

  const disabilityData = [
    { name: 'Masculin', value: data.disability_rates.male },
    { name: 'Féminin', value: data.disability_rates.female }
  ];

  return (
    <Grid container spacing={3}>
      {/* Assurance maladie */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Assurance maladie par milieu de résidence (2023)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={healthInsuranceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} />
              <Tooltip formatter={(value: number) => value.toFixed(1) + '%'} />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Pourcentage" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Maladies chroniques */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Maladies chroniques par milieu de résidence (2023)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chronicDiseasesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} />
              <Tooltip formatter={(value: number) => value.toFixed(1) + '%'} />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" name="Pourcentage" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Handicap */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Taux de prévalence du handicap par sexe (2023)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={disabilityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} />
              <Tooltip formatter={(value: number) => value.toFixed(1) + '%'} />
              <Legend />
              <Bar dataKey="value" fill="#ffc658" name="Pourcentage" />
            </BarChart>
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
                  <TableCell align="right">Urbain</TableCell>
                  <TableCell align="right">Rural</TableCell>
                  <TableCell align="right">Nomade</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Assurance maladie (%)</TableCell>
                  <TableCell align="right">{data.health_insurance.urban.toFixed(1)}</TableCell>
                  <TableCell align="right">{data.health_insurance.rural.toFixed(1)}</TableCell>
                  <TableCell align="right">{data.health_insurance.nomadic.toFixed(1)}</TableCell>
                  <TableCell align="right">{data.health_insurance.total.toFixed(1)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Maladies chroniques (%)</TableCell>
                  <TableCell align="right">{data.chronic_diseases.urban.toFixed(1)}</TableCell>
                  <TableCell align="right">{data.chronic_diseases.rural.toFixed(1)}</TableCell>
                  <TableCell align="right">{data.chronic_diseases.nomadic.toFixed(1)}</TableCell>
                  <TableCell align="right">{data.chronic_diseases.total.toFixed(1)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Handicap (%)</TableCell>
                  <TableCell align="right" colSpan={2}>Masculin: {data.disability_rates.male.toFixed(1)}</TableCell>
                  <TableCell align="right">Féminin: {data.disability_rates.female.toFixed(1)}</TableCell>
                  <TableCell align="right">{data.disability_rates.total.toFixed(1)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default HealthStats; 