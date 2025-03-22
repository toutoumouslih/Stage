import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  IconButton,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import WcIcon from '@mui/icons-material/Wc';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface RegionStats {
  name: string;
  population: number;
  malePopulation: number;
  femalePopulation: number;
  literacy: number;
  employmentRate: number;
  averageAge: number;
  households: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  stats: RegionStats | null;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    maxWidth: 800,
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 12,
  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(245,245,245,0.9) 100%)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
}));

const RegionStatsModal: React.FC<Props> = ({ open, onClose, stats }) => {
  const theme = useTheme();

  if (!stats) return null;

  const malePercentage = (stats.malePopulation / stats.population) * 100;
  const femalePercentage = (stats.femalePopulation / stats.population) * 100;

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        sx={{
          bgcolor: '#006233',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {stats.name}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StatCard elevation={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleAltIcon sx={{ fontSize: 32, color: '#006233', mr: 1 }} />
                <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
                  {stats.population.toLocaleString()}
                </Typography>
              </Box>
              <Typography variant="subtitle1" color="text.secondary">
                Population Totale
              </Typography>
            </StatCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <StatCard>
              <Box sx={{ width: '100%', mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <WcIcon sx={{ color: '#006233' }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    Répartition par Genre
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box
                    sx={{
                      flex: malePercentage,
                      bgcolor: '#3498db',
                      height: 24,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    {malePercentage.toFixed(1)}%
                  </Box>
                  <Box
                    sx={{
                      flex: femalePercentage,
                      bgcolor: '#e74c3c',
                      height: 24,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    {femalePercentage.toFixed(1)}%
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption">
                    Hommes: {stats.malePopulation.toLocaleString()}
                  </Typography>
                  <Typography variant="caption">
                    Femmes: {stats.femalePopulation.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </StatCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <StatCard>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <SchoolIcon sx={{ color: '#006233', mr: 1 }} />
                <Typography variant="h6">
                  Taux d'alphabétisation
                </Typography>
              </Box>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
                {stats.literacy}%
              </Typography>
            </StatCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <WorkIcon sx={{ color: '#006233', mr: 1 }} />
                <Typography variant="subtitle1">
                  Taux d'emploi
                </Typography>
              </Box>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
                {stats.employmentRate}%
              </Typography>
            </StatCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CalendarTodayIcon sx={{ color: '#006233', mr: 1 }} />
                <Typography variant="subtitle1">
                  Âge moyen
                </Typography>
              </Box>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
                {stats.averageAge} ans
              </Typography>
            </StatCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <HomeIcon sx={{ color: '#006233', mr: 1 }} />
                <Typography variant="subtitle1">
                  Ménages
                </Typography>
              </Box>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
                {stats.households.toLocaleString()}
              </Typography>
            </StatCard>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            bgcolor: '#006233',
            color: 'white',
            px: 4,
            py: 1,
            borderRadius: 2,
            '&:hover': {
              bgcolor: '#004d29',
            },
          }}
        >
          Fermer
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default RegionStatsModal;
