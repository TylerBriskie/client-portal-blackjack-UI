import React, { Component } from 'react';
import Hand from './Hand';
import Wager from './Wager';
import '../App.css';

class Player extends Component {

  constructor(props) {
    super();

    this.state= {
      isDealer: false,
      wager: 10,
      bankRoll: 90
    }
    this.modifyWager = this.modifyWager.bind(this);
  }

  modifyWager(amt){
    if(amt <= this.state.bankRoll && (this.state.wager + amt > 0)) {
      var newWager = Math.max(5, this.state.wager + amt);
      var newBankRoll = this.state.bankRoll - amt;
      this.setState({
        wager: newWager,
        bankRoll: newBankRoll
      });
    }

  }

  render() {

    console.log(this.props.player);

    let hands = this.props.player.hands.map((hand, index) =>
      <Hand isHandDealt = {this.props.isHandDealt} playerId={this.props.player.id} cards={hand} wager={this.state.wager} key={index}/>
    );
    return (
      <div className="player-wrapper">
        <div className="player-info">
          <h3>{this.props.player.name}</h3>
          <h3>${this.state.bankRoll}</h3 >
        </div>
        {hands.length > 0 ? hands : <Wager modifyWager={this.modifyWager} wager={this.state.wager}/>}
      </div>
    );
  }
}

export default Player;
