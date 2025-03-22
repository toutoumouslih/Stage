import React from 'react';
import InteractiveMap from '../components/InteractiveMap';
import { Box, Container } from '@mui/material';

const RegionalMap: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ height: '90vh', py: 4 }}>
        <InteractiveMap />
      </Box>
    </Container>
  );
};

export default RegionalMap;
