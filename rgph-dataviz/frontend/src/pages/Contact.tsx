import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Contact: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Logique d'envoi du formulaire à implémenter
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ height: '100%', border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <LocationOnIcon color="primary" />
                <div>
                  <Typography variant="h6" gutterBottom>
                    Adresse
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Office National de la Statistique<br />
                    Nouakchott, Mauritanie
                  </Typography>
                </div>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <EmailIcon color="primary" />
                <div>
                  <Typography variant="h6" gutterBottom>
                    Email
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    contact@ons.mr
                  </Typography>
                </div>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PhoneIcon color="primary" />
                <div>
                  <Typography variant="h6" gutterBottom>
                    Téléphone
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    +222 45 25 50 31
                  </Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              border: '1px solid', 
              borderColor: 'divider'
            }}
          >
            <Typography variant="h5" gutterBottom>
              Envoyez-nous un message
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Pour toute question ou suggestion concernant la plateforme RGPH DataViz,
              n'hésitez pas à nous contacter via ce formulaire.
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nom"
                    variant="outlined"
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Sujet"
                    variant="outlined"
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      mt: 2,
                      px: 4,
                      py: 1,
                    }}
                  >
                    Envoyer le message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              border: '1px solid', 
              borderColor: 'divider',
              bgcolor: 'primary.main',
              color: 'primary.contrastText'
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Horaires d'ouverture
            </Typography>
            <Typography variant="body2">
              Du dimanche au jeudi : 8h00 - 17h00<br />
              Vendredi et samedi : Fermé
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
