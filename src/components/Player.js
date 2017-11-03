import React, { Component } from 'react';
import Hand from './Hand';
import Wager from './Wager';
import '../App.css';

class Player extends Component {

  constructor(props) {
    super();

    this.state= {
      isDealer: false,
      // wager: 10,
      // bankRoll: 90
    }
    this.modifyWager = this.modifyWager.bind(this);
  }

  modifyWager(amt){
    this.props.modifyWager(amt, this.props.player.id);

}

  render() {

    console.log(this.props);

    let hands = this.props.player.hands.map((hand, index) =>
      <Hand isHandDealt = {this.props.isHandDealt} isDealer={false} playerId={this.props.player.id} cards={hand} wager={this.state.wager} activePlayer={this.props.activePlayer} changeActivePlayer={this.props.changeActivePlayer} key={index}/>
    );
    return (
      <div className={"player-wrapper " + ((this.props.activePlayer === this.props.player.id) && this.props.isHandDealt ? 'active-player' : '')}>
        <div className="player-info">
          <h3>{this.props.player.name}</h3>
          <h3>${this.props.player.bankroll}</h3 >
        </div>

        {hands.length > 0 ? hands : <Wager modifyWager={this.modifyWager} wager={this.props.player.wager}/>}
      </div>
    );
  }
}

export default Player;
