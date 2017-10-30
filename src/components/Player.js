import React, { Component } from 'react';
import Hand from './Hand';
import '../App.css';

class Player extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    console.log(this.props.player.hands);
    let hands = this.props.player.hands.map((hand, index) =>
      <Hand isHandDealt = {this.props.isHandDealt} cards={hand} wager={10} key={index}/>
    )
    console.log(hands);
    return (
      <div className="player-wrapper">
        <div className="player-info">
          <h3>{this.props.player.name}</h3>
          <h3>${this.props.player.bankroll}</h3 >
        </div>

        {hands}
      </div>
    );
  }
}

export default Player;
