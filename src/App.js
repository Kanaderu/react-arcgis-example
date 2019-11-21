import React from 'react';
import { Map } from '@esri/react-arcgis';
import Point from './Point';

function App() {
  return (
    <div className="App">
        <Map
            class="full-screen-map"
            style={{ width: '100%', height: '100vh' }}
            mapProperties={{
                basemap: 'streets-navigation-vector'
            }}
            viewProperties={{
                center: [-84.1745444, 39.7346451 ],
                zoom: 14
            }}
        >
        <Point lat={39.7346451} lon={-84.175444} />
        <Point lat={39.7336451} lon={-84.175444} />
        </Map>
    </div>
  );
}

export default App;
