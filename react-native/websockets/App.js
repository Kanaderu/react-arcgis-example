import React, { Component } from 'react';
import { Platform, StyleSheet, Button, Text, TextInput, View } from 'react-native';

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
      msg: "",
      lat: 0,
      lon: 0,
      msgLog: "",
      latLog: 0,
      lonLog: 0,
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
      const dataFromServer = JSON.parse(message.data);
      this.setState({
        msgLog: this.state.msgLog + dataFromServer.message + '\n',
        latLog: dataFromServer.lat,
        lonLog: dataFromServer.lon,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    client.send(JSON.stringify({
      message: this.state.msg,
      lat: parseFloat(this.state.lat),
      lon: parseFloat(this.state.lon),
    }));
  };

  handleChange = (name) => (event, value) => {
    this.setState({
      [name]: event.nativeEvent.text
    });
    console.log(this.state);
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput multiline={true} value={this.state.msg}/>
        <TextInput multiline={false} value={this.state.lat.toString()}/>
        <TextInput multiline={false} value={this.state.lon.toString()}/>
        <TextInput multiline={false} editable onChange={this.handleChange('msg')}/>
        <TextInput keyboardType={`numeric`} multiline={false} editable onChange={this.handleChange('lat')}/>
        <TextInput keyboardType={`numeric`} multiline={false} editable onChange={this.handleChange('lon')}/>

        <Button onPress={this.handleSubmit} title="Submit" />

        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
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
