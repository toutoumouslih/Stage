import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Layout from './components/Layout';
import Map from './components/Map';
import RegionDetails from './components/RegionDetails';
import About from './pages/About';
import Contact from './pages/Contact';

const MapPage: React.FC = () => {
    const [selectedRegionId, setSelectedRegionId] = React.useState<number | null>(null);

    const handleRegionClick = (regionId: number) => {
        setSelectedRegionId(regionId);
    };

    const handleCloseDetails = () => {
        setSelectedRegionId(null);
    };

    return (
        <>
            <Map onRegionClick={handleRegionClick} />
            {selectedRegionId && (
                <RegionDetails
                    open={true}
                    regionId={selectedRegionId}
                    onClose={handleCloseDetails}
                />
            )}
        </>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<MapPage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    );
};

export default App;
