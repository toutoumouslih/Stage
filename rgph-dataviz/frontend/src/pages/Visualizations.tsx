import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { fetchRegions } from '../services/api';
import { Region } from '../types/region';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Visualizations: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchRegions();
        const mappedRegions = data.features.map((feature: any) => feature.properties);
        setRegions(mappedRegions);
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleRegionChange = (event: any) => {
    setSelectedRegion(event.target.value);
  };

  // Filtrer les régions en fonction de la sélection
  const filteredRegions = selectedRegion === 'all' 
    ? regions 
    : regions.filter(region => region.name === selectedRegion);

  // Préparation des données pour les graphiques
  const populationData = filteredRegions.map(region => ({
    name: region.name,
    population: region.population,
    male: region.male_population,
    female: region.female_population,
  }));

  const educationData = filteredRegions.map(region => ({
    name: region.name,
    illiteracy: region.illiteracy_rates?.total || 0,
    primary: region.primary_enrollment_rates?.['2023']?.total || 0,
    secondary: region.secondary_enrollment_rates?.['2023']?.total || 0,
  }));

  const healthData = filteredRegions.map(region => ({
    name: region.name,
    lifeExpectancy: region.life_expectancy?.['2023'] || 0,
    healthInsurance: region.health_insurance?.total || 0,
    chronicDiseases: region.chronic_diseases?.total || 0,
  }));

  const employmentData = filteredRegions.map(region => ({
    name: region.name,
    activity: region.activity_rates?.total || 0,
    employment: region.employment_rates?.total || 0,
  }));

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Visualisations
      </Typography>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Population" />
          <Tab label="Éducation" />
          <Tab label="Santé" />
          <Tab label="Emploi" />
        </Tabs>

        <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Région</InputLabel>
            <Select
              value={selectedRegion}
              label="Région"
              onChange={handleRegionChange}
            >
              <MenuItem value="all">Toutes les régions</MenuItem>
              {regions.map((region) => (
                <MenuItem key={region.id} value={region.name}>
                  {region.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Répartition de la population par région
                </Typography>
                <BarChart
                  width={500}
                  height={300}
                  data={populationData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="population" fill="#8884d8" name="Population" />
                </BarChart>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Répartition par genre
                </Typography>
                <PieChart width={500} height={300}>
                  <Pie
                    data={[
                      { name: 'Hommes', value: filteredRegions.reduce((acc, r) => acc + (r.male_population || 0), 0) },
                      { name: 'Femmes', value: filteredRegions.reduce((acc, r) => acc + (r.female_population || 0), 0) },
                    ]}
                    cx={250}
                    cy={150}
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {filteredRegions.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Indicateurs d'éducation par région
                </Typography>
                <BarChart
                  width={800}
                  height={400}
                  data={educationData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="illiteracy" fill="#8884d8" name="Taux d'analphabétisme" />
                  <Bar dataKey="primary" fill="#82ca9d" name="Scolarisation primaire" />
                  <Bar dataKey="secondary" fill="#ffc658" name="Scolarisation secondaire" />
                </BarChart>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Indicateurs de santé par région
                </Typography>
                <BarChart
                  width={800}
                  height={400}
                  data={healthData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="lifeExpectancy" fill="#8884d8" name="Espérance de vie" />
                  <Bar dataKey="healthInsurance" fill="#82ca9d" name="Couverture sanitaire" />
                  <Bar dataKey="chronicDiseases" fill="#ffc658" name="Maladies chroniques" />
                </BarChart>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Indicateurs d'emploi par région
                </Typography>
                <BarChart
                  width={800}
                  height={400}
                  data={employmentData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="activity" fill="#8884d8" name="Taux d'activité" />
                  <Bar dataKey="employment" fill="#82ca9d" name="Taux d'emploi" />
                </BarChart>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Visualizations; 