import React from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EducationStatsProps {
  data: {
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
  };
}

const EducationStats: React.FC<EducationStatsProps> = ({ data }) => {
  // Préparation des données pour les graphiques
  const illiteracyData = [
    { name: 'Masculin', value: data.illiteracy_rates.male },
    { name: 'Féminin', value: data.illiteracy_rates.female }
  ];

  const primaryEnrollmentData = Object.entries(data.primary_enrollment_rates).map(([year, rates]) => ({
    year,
    Masculin: rates.male,
    Féminin: rates.female,
    Total: rates.total
  }));

  const secondaryEnrollmentData = Object.entries(data.secondary_enrollment_rates).map(([year, rates]) => ({
    year,
    Masculin: rates.male,
    Féminin: rates.female,
    Total: rates.total
  }));

  return (
    <Grid container spacing={3}>
      {/* Taux d'analphabétisme */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Taux d'analphabétisme par sexe (2023)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={illiteracyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value: number) => value.toFixed(1) + '%'} />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Pourcentage" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Taux brut de scolarisation au fondamental */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Évolution du taux brut de scolarisation au fondamental
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={primaryEnrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis domain={[0, 120]} />
              <Tooltip formatter={(value: number) => value.toFixed(1) + '%'} />
              <Legend />
              <Line type="monotone" dataKey="Masculin" stroke="#8884d8" />
              <Line type="monotone" dataKey="Féminin" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Total" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Taux brut de scolarisation au secondaire */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Évolution du taux brut de scolarisation au secondaire
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={secondaryEnrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value: number) => value.toFixed(1) + '%'} />
              <Legend />
              <Line type="monotone" dataKey="Masculin" stroke="#8884d8" />
              <Line type="monotone" dataKey="Féminin" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Total" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Tableau récapitulatif */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Données détaillées de l'éducation (2023)
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Indicateur</TableCell>
                  <TableCell align="right">Masculin</TableCell>
                  <TableCell align="right">Féminin</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Taux d'analphabétisme (%)</TableCell>
                  <TableCell align="right">{data.illiteracy_rates.male.toFixed(1)}</TableCell>
                  <TableCell align="right">{data.illiteracy_rates.female.toFixed(1)}</TableCell>
                  <TableCell align="right">{data.illiteracy_rates.total.toFixed(1)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Taux brut de scolarisation au fondamental (%)</TableCell>
                  <TableCell align="right">{data.primary_enrollment_rates['2023'].male.toFixed(1)}</TableCell>
                  <TableCell align="right">{data.primary_enrollment_rates['2023'].female.toFixed(1)}</TableCell>
                  <TableCell align="right">{data.primary_enrollment_rates['2023'].total.toFixed(1)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Taux brut de scolarisation au secondaire (%)</TableCell>
                  <TableCell align="right">{data.secondary_enrollment_rates['2023'].male.toFixed(1)}</TableCell>
                  <TableCell align="right">{data.secondary_enrollment_rates['2023'].female.toFixed(1)}</TableCell>
                  <TableCell align="right">{data.secondary_enrollment_rates['2023'].total.toFixed(1)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Taux net de scolarisation au fondamental (%)</TableCell>
                  <TableCell align="right">{data.net_primary_rates['2023'].male.toFixed(1)}</TableCell>
                  <TableCell align="right">{data.net_primary_rates['2023'].female.toFixed(1)}</TableCell>
                  <TableCell align="right">{data.net_primary_rates['2023'].total.toFixed(1)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Taux net de scolarisation au secondaire (%)</TableCell>
                  <TableCell align="right">{data.net_secondary_rates['2023'].male.toFixed(1)}</TableCell>
                  <TableCell align="right">{data.net_secondary_rates['2023'].female.toFixed(1)}</TableCell>
                  <TableCell align="right">{data.net_secondary_rates['2023'].total.toFixed(1)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EducationStats; 