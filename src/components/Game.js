import React, { Component } from 'react';
import '../App.css';
import NewPlayerForm from './NewPlayerForm';
import Player from './Player';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      players: [],
      deckCount: 1,
      areHandsDealt: true
    };
    this.addPlayer = this.addPlayer.bind(this);
  }

  componentDidMount() {}

  addPlayer(player) {
    let newPlayersArray = this.state.players.slice();
    newPlayersArray.push(player);
    this.setState({
      players: newPlayersArray
    });
  }

  dealInitialCards(){
    console.log("dealing cards...")
  }

  render() {
    let players = this.state.players.map((player, index) => <Player player={player} key={index} isHandDealt={this.state.areHandsDealt}/>);
    console.log(players);

    return (
      <div className="game-wrapper">
        <div className="new-player-form-wrapper {1===1 ? 'pink' : 'blue'}">
          <NewPlayerForm addPlayer={this.addPlayer}/>
        </div>

        <p>Dealer</p>
        <div className="players-wrapper">
          {players}
        </div>
        <button className="success-button" onClick={this.dealInitialCards}>Place Your Bets</button>
      </div>
    );
  }
}

export default Game;
