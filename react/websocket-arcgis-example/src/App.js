import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import Point from './Point';
import { Map } from '@esri/react-arcgis';
import { loadModules } from 'esri-loader';

const group_name = 'test';
const client = new W3CWebSocket('ws://127.0.0.1:8088/ws/vehicles/' + group_name + '/');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: {},
    }
  }

  UNSAFE_componentWillMount() {
    client.onopen = () => {
      console.log('Websocket Client Connected');
    };

    client.onclose = () => {
      console.log('Websocket closed unexpectedly');
    };

    client.onmessage = (message) => {
      const data = JSON.parse(message.data);

      loadModules(['esri/Graphic']).then(([Graphic]) => {
        // create a point
        const point = {
          type: "point", // autocasts as new Point()
            x: data.lon,
            y: data.lat,
        };

        // Add the geometry and symbol to a new graphic
        const graphic = Graphic({
          geometry: point,
          //symbol: fillSymbol
        });

        this.setState((prevState, props) => {
          // update oldGraphic if `graphic` in the previous state exists
          const prevLoc = prevState.locations[`${data.message}`];
          const oldGraphic = (prevLoc && prevLoc.graphic) ? prevLoc.graphic : null;

          const newState = { ...prevState };
          newState.locations[`${data.message}`] = {
            lat: data.lat,
            lon: data.lon,
            oldGraphic: oldGraphic,
            graphic: graphic
          };
          return newState;
        });
      }).catch((err) => console.error(err));
    }
  }

  render() {
    return (
      <div className="App">
        <Map
          class="full-screen-map"
          style={{ width: '100%', height: '100vh' }}
          mapProperties={{
            basemap: 'streets-navigation-vector'
          }}
          viewProperties={{
            center: [-84.1745444, 39.7346451],
            zoom: 14
          }}
        >
          <Point locations={this.state.locations} />
        </Map>
      </div>
    );
  }
}

export default App;
