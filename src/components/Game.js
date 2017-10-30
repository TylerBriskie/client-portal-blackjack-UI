import React, { Component } from 'react';
import '../App.css';
import NewPlayerForm from './NewPlayerForm';
import Player from './Player';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      players: [],
      deckCount: 1
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

  render() {
    let players = this.state.players.map((player, index) => <Player player={player} key={index}/>);
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
      </div>
    );
  }
}

export default Game;
