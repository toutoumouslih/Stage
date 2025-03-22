import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import InteractiveMap from '../components/InteractiveMap';

const MapPage: React.FC = () => {
  return (
    <Container maxWidth={false}>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#006233', mb: 4 }}>
          Carte Administrative de la Mauritanie
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <InteractiveMap />
        </Paper>
      </Box>
    </Container>
  );
};

export default MapPage;
