import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Grid,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Region } from '../types';

interface RegionModalProps {
  open: boolean;
  onClose: () => void;
  region: Region | null;
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('fr-FR').format(num);
};

const RegionModal: React.FC<RegionModalProps> = ({ open, onClose, region }) => {
  if (!region) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="span">
            {region.name}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>
                Informations générales
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Code
                  </Typography>
                  <Typography variant="body1">
                    {region.code}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Capitale
                  </Typography>
                  <Typography variant="body1">
                    {region.capital}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>
                Données démographiques
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Population totale
                  </Typography>
                  <Typography variant="h6">
                    {formatNumber(region.population)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Population masculine
                  </Typography>
                  <Typography variant="body1">
                    {formatNumber(region.male_population)}
                    <Typography component="span" variant="body2" color="text.secondary">
                      {` (${region.male_percentage}%)`}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Population féminine
                  </Typography>
                  <Typography variant="body1">
                    {formatNumber(region.female_population)}
                    <Typography component="span" variant="body2" color="text.secondary">
                      {` (${region.female_percentage}%)`}
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default RegionModal;
