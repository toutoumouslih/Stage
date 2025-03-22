import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';
import { GeoJSONData, GeoJSONFeature } from '../types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/map.css';

const InteractiveMap: React.FC = () => {
  const [regions, setRegions] = useState<GeoJSONData | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/regions/geojson/')
      .then(response => response.json())
      .then(data => {
        const adjustedData = {
          ...data,
          features: data.features.map((feature: GeoJSONFeature) => {
            const name = feature.properties.name;
            let adjustedCenter: [number, number];

            switch (name) {
              case 'Tiris Zemmour':
                adjustedCenter = [25.2, -8];
                break;
              case 'Dakhlet Nouadhibou':
                adjustedCenter = [21, -17];
                break;
              case 'Adrar':
                adjustedCenter = [20, -13];
                break;
              case 'Inchiri':
                adjustedCenter = [20, -15];
                break;
              case 'Tagant':
                adjustedCenter = [18.5, -11.5];
                break;
              case 'Trarza':
                adjustedCenter = [17.5, -15];
                break;
              case 'Brakna':
                adjustedCenter = [17, -13.5];
                break;
              case 'Hodh Chargui':
                adjustedCenter = [16.5, -7];
                break;
              case 'Hodh El Gharbi':
                adjustedCenter = [16.5, -9.5];
                break;
              case 'Assaba':
                adjustedCenter = [16.5, -11.5];
                break;
              case 'Gorgol':
                adjustedCenter = [16, -13];
                break;
              case 'Guidimakha':
                adjustedCenter = [15.5, -12.5];
                break;
              case 'Nouakchott-Nord':
                adjustedCenter = [18.1, -15.95];
                break;
              case 'Nouakchott-Ouest':
                adjustedCenter = [18.1, -15.98];
                break;
              case 'Nouakchott-Sud':
                adjustedCenter = [18.1, -15.92];
                break;
              default:
                adjustedCenter = feature.properties.center;
            }

            return {
              ...feature,
              properties: {
                ...feature.properties,
                center: adjustedCenter
              }
            };
          })
        };
        setRegions(adjustedData);
      })
      .catch(error => console.error('Error fetching regions:', error));
  }, []);

  const mapStyle = {
    height: '100vh',
    width: '100%'
  };

  const onEachRegion = (feature: GeoJSON.Feature, layer: L.GeoJSON) => {
    const name = feature.properties?.name;
    const center = feature.properties?.center as [number, number];
    
    if (center && map) {
      const markerHtml = `
        <div class="region-marker">
          <div class="marker-icon"></div>
          <div class="marker-label">${name}</div>
        </div>
      `;

      const icon = L.divIcon({
        className: 'custom-marker',
        html: markerHtml,
        iconSize: [120, 40],
        iconAnchor: [60, 20]
      });

      L.marker(center, {
        icon: icon,
        interactive: false
      }).addTo(map);
    }

    if (layer.setStyle) {
      layer.setStyle({
        opacity: 0,
        fillOpacity: 0
      });
    }
  };

  return (
    <MapContainer
      center={[21, -12]}
      zoom={5}
      style={mapStyle}
      zoomControl={true}
      zoomAnimation={true}
      ref={setMap}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {regions && (
        <GeoJSON
          data={regions}
          onEachFeature={onEachRegion}
        />
      )}
    </MapContainer>
  );
};

export default InteractiveMap;
