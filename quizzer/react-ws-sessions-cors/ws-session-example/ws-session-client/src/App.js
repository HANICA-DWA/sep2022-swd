import React, { Component } from 'react';
import './App.css';
import { openWebSocket, getWebSocket, startLogin, startLogout } from './serverCommunication';

class App extends Component {
  constructor() {
    super()
    this.state = {
      messages: ["test message 1", "test message 2"]
    }
  }

  addMessage(msg) {
    if(typeof msg !== "string") {
      msg = JSON.stringify(msg);
    }
    this.setState( (prevState) => ( {messages: [msg].concat(prevState.messages)}));
  };

  onLogin() {
    console.log("onLogin");
    startLogin("user-"+Math.round(Math.random()*1000),"password")
      .then( msg => this.addMessage(msg) )
      .catch((err) => this.addMessage("ERROR: " + err.message));
  }

  onLogout() {
    console.log("onLogout", window.location);
    startLogout()
      .then( msg => this.addMessage(msg) )
      .catch((err) => this.addMessage("ERROR: " + err.message));
  }

  onOpenSocket() {
    console.log("onOpenSocket");
    let ws = openWebSocket();
    ws.onerror = () => this.addMessage('WebSocket error');
    ws.onopen = () => this.addMessage('WebSocket connection established');
    ws.onclose = () => this.addMessage('WebSocket connection closed');
    ws.onmessage = (msg) => this.addMessage(msg.data);
  }

  onSend() {
    const msg = "Here's a brand new number: " + (Math.round(Math.random()*1000000));
    const ws = getWebSocket();
    ws.send(msg);
  }

  render() {

    const messageLines = this.state.messages.map( msg => <div className="msgLine">{msg}</div> );

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React-Websockets-Express-Sessions demo</h1>
        </header>
        <main className="App-main">
          <button onClick={()=>this.onLogin()}>
            Simulate login
          </button>
          <button onClick={()=>this.onLogout()}>
            Simulate logout
          </button>
          <button onClick={()=>this.onOpenSocket()}>
            Open WebSocket connection
          </button>
          <button onClick={()=>this.onSend()}>
            Send Message
          </button>

          <div id="messages">{messageLines}</div>

        </main>
      </div>
    );
  }
}

export default App;
