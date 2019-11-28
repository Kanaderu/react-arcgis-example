import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const group_name = 'test';
const client = new WebSocket('ws://10.0.2.2:8088/ws/vehicles/' + group_name + '/');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'noname',
      isConnected: false,
      location: {
        timestamp: null,
        coords: {
          speed: null,
          heading: null,
          accuracy: null,
          altitude: null,
          longitude: null,
          latitude: null,
        }
      }
    };
    this.positionCallback = this.positionCallback.bind(this)
  }

  positionCallback(position) {
    this.setState({
      location: position
    });

    this.state.isConnected && client.send(JSON.stringify({
      message: this.state.name,
      lat: this.state.location.coords.latitude,
      lon: this.state.location.coords.longitude,
    }));
  }

  UNSAFE_componentWillMount() {
    client.onopen = () => {
      console.log('Websocket Client Connected');
      this.setState({
        isConnected: true
      })
    };

    client.onclose = () => {
      console.log('Websocket closed unexpectedly');
      this.setState({
        isConnected: false
      })
    };

    /*
    // handle incoming messages
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      this.setState({
        msgLog: this.state.msgLog + dataFromServer.message + '\n',
        latLog: dataFromServer.lat,
        lonLog: dataFromServer.lon,
      });
    };
    */

    try {
      // Instead of navigator.geolocation, just use Geolocation.
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      /*
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log(granted)
      */
      if (true) {
        Geolocation.getCurrentPosition(
          this.positionCallback,
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { distanceFilter: 20, enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        Geolocation.watchPosition(
          this.positionCallback,
          (error) => {
            console.log(error.code, error.message);
          },
          { distanceFilter: 20, enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>Timestamp: {this.state.location.timestamp}</Text>
        <Text style={styles.instructions}>Speed: {this.state.location.coords.speed}</Text>
        <Text style={styles.instructions}>Heading: {this.state.location.coords.heading}</Text>
        <Text style={styles.instructions}>Accuracy: {this.state.location.coords.accuracy}</Text>
        <Text style={styles.instructions}>Altitude: {this.state.location.coords.altitude}</Text>
        <Text style={styles.instructions}>Longitude: {this.state.location.coords.longitude}</Text>
        <Text style={styles.instructions}>Latitude: {this.state.location.coords.latitude}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
