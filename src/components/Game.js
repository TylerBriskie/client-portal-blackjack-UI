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
        areHandsDealt: false,
        dealer: {},
        activePlayer: 1
    };
    this.addPlayer = this.addPlayer.bind(this);
    this.dealInitialCards = this.dealInitialCards.bind(this);
    this.changeActivePlayer = this.changeActivePlayer.bind(this);
  }

  tempDealer = {
    id: 0,
    name: 'Dealer',
    hand: []
  }

  addPlayer(player) {
    let newPlayersArray = this.state.players.slice();
    newPlayersArray.push(player);
    this.setState({
      players: newPlayersArray
    });
  }

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
        // console.log(response)
        var tempPlayers = this.state.players.slice();
        for (var i = 0; i < tempPlayers.length; i++){
            tempPlayers[i].hands.push(response.data[i].hand)
        }
        this.tempDealer.hand = response.data[i].hand;

        this.setState({
            areHandsDealt: true,
            players: tempPlayers,
            dealer: this.tempDealer
        });
      })
      .catch(function (error) {
          console.log(error);
      })
  }

  componentWillMount(){
    axios.get('https://cp-blackjack.herokuapp.com/resetHand/')
      .then((res) => {
        // console.log(res);
      })
      .catch(function(err){
          console.log(err);
      })
  }

  changeActivePlayer() {

    let tempActive = this.state.activePlayer;
    console.log(this.state.activePlayer);
    if(tempActive === this.state.players.length) {
      tempActive = 0;
    }else {
      tempActive++;
    }
    this.setState({
      activePlayer: tempActive
    }, () => {
      console.log(this.state.activePlayer);
    });
    console.log(this.state.activePlayer);
  }

  componentDidMount() {
    this.players = this.state.players.map((player, index) => <Player player={player} key={index} isHandDealt={this.state.areHandsDealt} activePlayer={this.state.activePlayer} changeActivePlayer={this.changeActivePlayer}/>)
  }

  render() {
      // console.log(this.state.players[0]);
      this.players = this.state.players.map((player, index) => <Player player={player} key={index} isHandDealt={this.state.areHandsDealt} activePlayer={this.state.activePlayer} changeActivePlayer={this.changeActivePlayer}/>)
      return (
      <div className="game-wrapper">
        <div className="new-player-form-wrapper">
            {!this.state.areHandsDealt ? <NewPlayerForm addPlayer={this.addPlayer}/> : '' }
        </div>
        <div className="dealer-wrapper">
            {console.log(this.state.dealer)}
            <Dealer isHandDealt={this.state.areHandsDealt} dealer={this.state.dealer} />
        </div>
        <div className="players-wrapper">
          {this.players}
        </div>
        {this.state.players.length > 0 && !this.state.areHandsDealt ?
        <button id="deal-cards-button" className="success-button" onClick={this.dealInitialCards}>Place Your Bets</button>
        : <div></div>}
      </div>
    );
  }
}

export default Game;
