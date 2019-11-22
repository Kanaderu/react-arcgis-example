import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const group_name = 'test'
const client = new W3CWebSocket('ws://127.0.0.1:8088/ws/vehicles/' + group_name + '/');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  UNSAFE_componentWillMount() {
    client.onopen = () => {
      console.log('Websocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log("Message!");
      console.log(message);
      const dataFromServer = JSON.parse(message.data);
      console.log(dataFromServer);
    }
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            Essay:
          </label>
          <br />
          <textarea value={this.state.value} onChange={this.handleChange} />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
