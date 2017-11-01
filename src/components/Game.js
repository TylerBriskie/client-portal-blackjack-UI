import React, { Component } from 'react';
import '../App.css';
import NewPlayerForm from './NewPlayerForm';
import Player from './Player';
import Dealer from './Dealer';
import axios from 'axios';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
        players: [],
        deckCount: 1,
        areHandsDealt: false
    };

      this.addPlayer = this.addPlayer.bind(this);
    this.dealInitialCards = this.dealInitialCards.bind(this);
  }

  addPlayer(player) {
    let newPlayersArray = this.state.players.slice();
    newPlayersArray.push(player);
    this.setState({
      players: newPlayersArray
    });
  }

  dealerHand = [];

  dealInitialCards(){
      var payload = [];
      for (var i=0; i<this.state.players.length; i++){
          payload.push({
              "id": this.state.players[i].id,
              "name": this.state.players[i].name,
              "firstBetAmount": this.state.players[i].wager,
          })
      }

      axios.post('https://cp-blackjack.herokuapp.com/setup/', payload)
        .then((response) => {
          console.log(response)
            var tempPlayers = this.state.players.slice();
            for (var i = 0; i < tempPlayers.length; i++){
                tempPlayers[i].hands.push(response.data[i].hand)
              }
            this.dealerHand.cards = response.data[i].hand.cards;
            this.setState({
                areHandsDealt: true,
                players: tempPlayers
            });
        })
        .catch(function (error) {
            console.log(error);
        })
  }

  componentWillMount(){
      axios.get('https://cp-blackjack.herokuapp.com/resetHand/')
          .then((res) => {
            console.log(res);
          })
          .catch(function(err){
              console.log(err);
          })

  }

  render() {

      let players = this.state.players.map((player, index) => <Player player={player} key={index} isHandDealt={this.state.areHandsDealt}/>);
      return (
      <div className="game-wrapper">
        <div className="new-player-form-wrapper">
            {!this.state.areHandsDealt ? <NewPlayerForm addPlayer={this.addPlayer}/> : '' }
        </div>
        <div className="dealer-wrapper">
            <Dealer isDealer={true} isHandDealt={this.state.areHandsDealt} cards={this.dealerHand} />
        </div>
        <div className="players-wrapper">
          {players}
        </div>
        {this.state.players.length > 0 && !this.state.areHandsDealt ?
        <button id="deal-cards-button" className="success-button" onClick={this.dealInitialCards}>Place Your Bets</button>
        : <div></div>}
      </div>
    );
  }
}

export default Game;
