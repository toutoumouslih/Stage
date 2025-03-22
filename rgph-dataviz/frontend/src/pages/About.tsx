import React from 'react';
import { Container, Typography, Paper, Grid, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import TimelineIcon from '@mui/icons-material/Timeline';

const About: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        À propos de RGPH DataViz
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <InfoIcon color="primary" />
              <Typography variant="h6">
                Présentation
              </Typography>
            </Box>
            <Typography paragraph>
              RGPH DataViz est une plateforme interactive conçue pour visualiser et explorer
              les données du Recensement Général de la Population et de l'Habitat (RGPH) de
              la Mauritanie. Notre objectif est de rendre ces données démographiques
              accessibles et compréhensibles pour tous.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <DataUsageIcon color="primary" />
              <Typography variant="h6">
                Les Données
              </Typography>
            </Box>
            <Typography paragraph>
              Les données présentées proviennent des recensements de :
            </Typography>
            <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
              <li>2023</li>
              <li>2013</li>
              <li>2000</li>
              <li>1988</li>
              <li>1977</li>
              <li>1965</li>
            </ul>
            <Typography>
              Ces données comprennent des informations détaillées sur la population,
              l'alphabétisation, l'emploi et d'autres indicateurs sociodémographiques
              importants.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <TimelineIcon color="primary" />
              <Typography variant="h6">
                Fonctionnalités
              </Typography>
            </Box>
            <Typography paragraph>
              Notre plateforme offre plusieurs fonctionnalités :
            </Typography>
            <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
              <li>Carte interactive des régions</li>
              <li>Visualisation des données démographiques</li>
              <li>Évolution historique de la population</li>
              <li>Indicateurs sociaux par région</li>
              <li>Comparaison entre régions</li>
            </ul>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary' }}>
              Source des données
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Les données présentées sur cette plateforme sont fournies par l'Office
              National de la Statistique de Mauritanie. Pour plus d'informations sur les
              méthodologies de collecte et les définitions des indicateurs, veuillez
              consulter le site officiel de l'ONS.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
