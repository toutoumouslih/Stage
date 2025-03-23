import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import TableChartIcon from '@mui/icons-material/TableChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  '& img': {
    height: '40px',
  },
}));

const StyledLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontWeight: 600,
  letterSpacing: '0.5px',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const NavLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: '#666',
  padding: theme.spacing(2, 1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  position: 'relative',
  fontFamily: theme.typography.button.fontFamily,
  fontSize: theme.typography.button.fontSize,
  fontWeight: 500,
  '&.active': {
    color: theme.palette.primary.main,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '2px',
      backgroundColor: theme.palette.primary.main,
    },
  },
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const MainContent = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: theme.spacing(8),
  minHeight: 'calc(100vh - 180px)', // Account for header and footer
}));

const Footer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: 'auto',
  background: '#f8f9fa',
  borderRadius: 0,
}));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          <LogoContainer>
            <StyledLink to="/">
              <img src="/logo-mauritania.png" alt="Logo Mauritanie" />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                RGPH DataViz
              </Typography>
            </StyledLink>
          </LogoContainer>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <NavLink
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
            >
              <HomeIcon sx={{ mr: 1 }} />
              Accueil
            </NavLink>
            <NavLink
              to="/tables"
              className={location.pathname === '/tables' ? 'active' : ''}
            >
              <TableChartIcon sx={{ mr: 1 }} />
              Tableaux
            </NavLink>
            <NavLink
              to="/visualizations"
              className={location.pathname === '/visualizations' ? 'active' : ''}
            >
              <BarChartIcon sx={{ mr: 1 }} />
              Visualisations
            </NavLink>
            <NavLink
              to="/about"
              className={location.pathname === '/about' ? 'active' : ''}
            >
              <InfoIcon sx={{ mr: 1 }} />
              À propos
            </NavLink>
            <NavLink
              to="/contact"
              className={location.pathname === '/contact' ? 'active' : ''}
            >
              <ContactMailIcon sx={{ mr: 1 }} />
              Contact
            </NavLink>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <MainContent maxWidth={false}>
        {children}
      </MainContent>

      <Footer elevation={0}>
        <Container>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              © {new Date().getFullYear()} RGPH DataViz - Office National de la Statistique
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Données du Recensement Général de la Population et de l'Habitat
            </Typography>
          </Box>
        </Container>
      </Footer>
    </Box>
  );
};

export default Layout;
