import React, { Component } from 'react';
import logo from './Assets/logo.png';
import './App.css';
import Game from './components/Game';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Jack</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Game />
      </div>
    );
  }
}

export default App;
