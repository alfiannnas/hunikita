import * as React from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapComponent({ latitude, longitude, zoom = 12, isEditable = false, onLocationSelect }) {
  // Parse koordinat dengan aman
  const parseCoordinate = (value) => {
    if (typeof value === 'string') {
      return parseFloat(value);
    }
    return value;
  };

  const [marker, setMarker] = React.useState({
    latitude: parseCoordinate(latitude),
    longitude: parseCoordinate(longitude)
  });

  // Effect untuk update marker ketika props berubah
  React.useEffect(() => {
    const lat = parseCoordinate(latitude);
    const lng = parseCoordinate(longitude);
    
    if (lat && lng) {
      setMarker({
        latitude: lat,
        longitude: lng
      });
    }
  }, [latitude, longitude]);

  // Jika dalam mode view dan tidak ada koordinat valid
  if (!isEditable && (!marker.latitude || !marker.longitude)) {
    return (
      <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Data lokasi tidak tersedia</p>
      </div>
    );
  }

  // Set default koordinat untuk mode edit jika tidak ada koordinat
  if (isEditable && (!marker.latitude || !marker.longitude)) {
    marker.latitude = -6.2088;  // Default ke Jakarta
    marker.longitude = 106.8456;
  }

  const handleMapClick = (event) => {
    if (!isEditable) return;
    
    const { lng, lat } = event.lngLat;
    setMarker({
      longitude: lng,
      latitude: lat
    });
    if (onLocationSelect) {
      onLocationSelect(lat, lng);
    }
  };

  const handleMarkerDrag = (event) => {
    if (!isEditable) return;

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat
    });
    if (onLocationSelect) {
      onLocationSelect(event.lngLat.lat, event.lngLat.lng);
    }
  };
  
  return (
    <div style={{ height: '500px' }}>
      <Map
        initialViewState={{
          longitude: marker.longitude,
          latitude: marker.latitude,
          zoom: zoom
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        mapLib={import('maplibre-gl')}
        onClick={handleMapClick}
      >
        <Marker 
          longitude={marker.longitude} 
          latitude={marker.latitude} 
          color="red"
          draggable={isEditable}
          onDragEnd={handleMarkerDrag}
        />
      </Map>
    </div>
  );
}
