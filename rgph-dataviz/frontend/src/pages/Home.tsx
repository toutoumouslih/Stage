import React from 'react';
import Map from '../components/Map';
import RegionDetails from '../components/RegionDetails';

const Home: React.FC = () => {
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

export default Home; 