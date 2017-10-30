import React, { Component } from 'react';
import '../App.css';

class Player extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="player-wrapper">
        <span>{this.props.player.name}</span>
        <span>{this.props.player.bankroll}</span>
      </div>
    );
  }
}

export default Player;
