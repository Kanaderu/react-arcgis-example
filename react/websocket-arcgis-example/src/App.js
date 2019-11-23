import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import Point from './Point';
import { Map } from '@esri/react-arcgis';

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
    }

    client.onclose = () => {
      console.log('Websocket closed unexpectedly');
    }

    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      this.setState((prevState, props) => {
          const newState = { ...prevState };
          newState.locations[`${data.message}`] = {
              lat: data.lat,
              lon: data.lon,
          }
          return newState;
      });
      //console.log(this.state);
    }
  }

  render() {
    var markers = Object.keys(this.state.locations).map((location, id) => {
        const lat = this.state.locations[`${location}`].lat
        const lon = this.state.locations[`${location}`].lon
        return <Point key={id} lat={lat} lon={lon} />
    });
    console.log(markers)
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
          {markers}
        </Map>
      </div>
    );
  }
}

export default App;
