import * as React from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapComponent({ latitude, longitude, zoom = 12 }) {
  if (!latitude || !longitude) {
    return <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p>Data lokasi tidak tersedia</p>
    </div>;
  }
  
  return (
    <div style={{ height: '500px' }}>
      <Map
        initialViewState={{
          longitude: parseFloat(longitude),
          latitude: parseFloat(latitude),
          zoom: zoom
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        mapLib={import('maplibre-gl')}
      >
        <Marker longitude={parseFloat(longitude)} latitude={parseFloat(latitude)} color="red" />
      </Map>
    </div>
  );
}
