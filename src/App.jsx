import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

function App() {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    fetch('/data/data.geojson')
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data))
      .catch((error) => console.error('Error loading GeoJSON', error));
  }, []);

  return (
    <div>
      <Map
        initialViewState={{
          longitude: 73.0479,
          latitude: 33.6844,
          zoom: 14
        }}
        style={{ width: '100%', height: '100vh' }}
        mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
      >
        {geoJsonData &&
          geoJsonData.features.map((feature, index) => (
            <Marker
              key={index}
              longitude={feature.geometry.coordinates[0]}
              latitude={feature.geometry.coordinates[1]}
              anchor="bottom"
              onClick={() => setSelectedMarker(feature)}
            >
              <img style={{ width: '20px' }} src="/pin.png" alt="Marker" />
            </Marker>
          ))}

        {selectedMarker && (
          <Popup
            latitude={selectedMarker.geometry.coordinates[1]}
            longitude={selectedMarker.geometry.coordinates[0]}
            closeButton={false}
            closeOnClick={false}
            onClose={() => setSelectedMarker(null)}
            anchor="bottom"
          >
            <div style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
              <h3>
                City Name:   PESHAWAR
                <br/>
                Weather:  14 C
                <br/>
                Rain:   30%
                {/* {selectedMarker.properties.name} */}
              </h3>
              <p>{selectedMarker.properties.description}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default App;
