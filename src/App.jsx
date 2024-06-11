import React, { useState, useEffect } from 'react';
import Map, { Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import opencage from 'opencage-api-client';

const OPENCAGE_API_KEY = 'fc5b7bf06eaa453abaf2723490660ab3'; // Replace with your OpenCage API key

function App() {
  const [cityName, setCityName] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

  const handleMapClick = (event) => {
    const { lngLat } = event;
    const { lng: longitude, lat: latitude } = lngLat;

    opencage
      .geocode({ key: OPENCAGE_API_KEY, q: `${latitude},${longitude}` })
      .then((response) => {
        const { results } = response;
        if (results && results.length > 0) {
          const city = results[0].components.city || results[0].components.town || results[0].components.village || 'Unknown location';
          setCityName(city);
          setPopupInfo({ longitude, latitude, city });
        }
      })
      .catch((error) => {
        console.error('Error with geocoding:', error);
      });
  };

  return (
    <div>
      <Map
        initialViewState={{
          longitude: 73.0479,
          latitude: 33.6844,
          zoom: 14,
        }}
        style={{ width: '100%', height: '100vh' }}
        mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        onClick={handleMapClick}
      >
        {popupInfo && (
          <Popup
            latitude={popupInfo.latitude}
            longitude={popupInfo.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
            anchor="bottom"
          >
            <div style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
              <h3>
                City Name: {popupInfo.city}
              </h3>
              <p>
                Coordinates: {popupInfo.latitude.toFixed(4)}, {popupInfo.longitude.toFixed(4)}
              </p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default App;
