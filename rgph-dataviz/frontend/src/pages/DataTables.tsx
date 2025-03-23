import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  TextField,
  Grid,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { fetchRegions } from '../services/api';
import { Region } from '../types/region';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie, Cell } from 'recharts';

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

const DataTables: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchRegions();
        console.log('Received data:', data); // Debug log
        const mappedRegions = data.features.map((feature: any) => {
          console.log('Feature properties:', feature.properties); // Debug log
          return feature.properties;
        });
        setRegions(mappedRegions);
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err); // Debug log
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredRegions = regions.filter(region => {
    const matchesSearch = region.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || region.name === selectedRegion;
    return matchesSearch && matchesRegion;
  });

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
        Tableaux de Données
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

        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Rechercher une région..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Box>

        <TabPanel value={tabValue} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Région</TableCell>
                  <TableCell align="right">Population 2023</TableCell>
                  <TableCell align="right">Taux de croissance</TableCell>
                  <TableCell align="right">Taux de natalité</TableCell>
                  <TableCell align="right">Taux de mortalité</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRegions.map((region) => (
                  <TableRow key={region.id}>
                    <TableCell>{region.name}</TableCell>
                    <TableCell align="right">{region.population?.toLocaleString() || 'N/A'}</TableCell>
                    <TableCell align="right">
                      {region.growth_rates && region.growth_rates['2013-2023'] 
                        ? `${region.growth_rates['2013-2023']}%` 
                        : 'N/A'}
                    </TableCell>
                    <TableCell align="right">
                      {region.birth_rates && region.birth_rates['2023'] 
                        ? `${region.birth_rates['2023']}%` 
                        : 'N/A'}
                    </TableCell>
                    <TableCell align="right">
                      {region.mortality_rates && region.mortality_rates['2023'] 
                        ? `${region.mortality_rates['2023']}%` 
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Région</TableCell>
                  <TableCell align="right">Taux d'alphabétisation</TableCell>
                  <TableCell align="right">Taux de scolarisation primaire</TableCell>
                  <TableCell align="right">Taux de scolarisation secondaire</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRegions.map((region) => (
                  <TableRow key={region.id}>
                    <TableCell>{region.name}</TableCell>
                    <TableCell align="right">
                      {region.illiteracy_rates?.total 
                        ? `${region.illiteracy_rates.total}%` 
                        : 'N/A'}
                    </TableCell>
                    <TableCell align="right">
                      {region.primary_enrollment_rates?.['2023']?.total 
                        ? `${region.primary_enrollment_rates['2023'].total}%` 
                        : 'N/A'}
                    </TableCell>
                    <TableCell align="right">
                      {region.secondary_enrollment_rates?.['2023']?.total 
                        ? `${region.secondary_enrollment_rates['2023'].total}%` 
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Région</TableCell>
                  <TableCell align="right">Espérance de vie</TableCell>
                  <TableCell align="right">Taux de couverture sanitaire</TableCell>
                  <TableCell align="right">Maladies chroniques</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRegions.map((region) => (
                  <TableRow key={region.id}>
                    <TableCell>{region.name}</TableCell>
                    <TableCell align="right">
                      {region.life_expectancy?.['2023'] 
                        ? `${region.life_expectancy['2023']} ans` 
                        : 'N/A'}
                    </TableCell>
                    <TableCell align="right">
                      {region.health_insurance?.total 
                        ? `${region.health_insurance.total}%` 
                        : 'N/A'}
                    </TableCell>
                    <TableCell align="right">
                      {region.chronic_diseases?.total 
                        ? `${region.chronic_diseases.total}%` 
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Région</TableCell>
                  <TableCell align="right">Taux d'activité</TableCell>
                  <TableCell align="right">Taux d'emploi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRegions.map((region) => (
                  <TableRow key={region.id}>
                    <TableCell>{region.name}</TableCell>
                    <TableCell align="right">
                      {region.activity_rates?.total 
                        ? `${region.activity_rates.total}%` 
                        : 'N/A'}
                    </TableCell>
                    <TableCell align="right">
                      {region.employment_rates?.total 
                        ? `${region.employment_rates.total}%` 
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default DataTables; 