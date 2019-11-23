import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const group_name = 'test'
const client = new W3CWebSocket('ws://127.0.0.1:8088/ws/vehicles/' + group_name + '/');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        inputMsg: "",
        inputLat: 0,
        inputLon: 0,
        msg: "",
        lat: 0,
        lon: 0,
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
      console.log("Message!");
      console.log(message);
      const dataFromServer = JSON.parse(message.data);
      console.log(dataFromServer);
      this.setState({
          msg: this.state.msg + dataFromServer.message + '\n',
          lat: dataFromServer.lat,
          lon: dataFromServer.lon,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting!');
    client.send(JSON.stringify({
      message: this.state.inputMsg,
      lat: this.state.inputLat,
      lon: this.state.inputLon,
    }));
  }

  handleChange = (event) => {
    console.log(event.target.id);
    this.setState({
        [event.target.name]: event.target.value
    });
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
          <label>
            Essay:
          </label><br />
          <textarea value={this.state.msg} readOnly /><br />
          <input type="number" readOnly value={this.state.lat} /><br />
          <input type="number" readOnly value={this.state.lon} /><br />
          <br />
        <form onSubmit={this.handleSubmit}>
          <input name="inputMsg" type="text" onChange={this.handleChange} /><br />
          <input name="inputLat" type="number" onChange={this.handleChange} /><br />
          <input name="inputLon" type="number" onChange={this.handleChange} /><br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
