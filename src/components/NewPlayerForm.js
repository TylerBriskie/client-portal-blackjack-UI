import React, { Component } from 'react';
import '../App.css';

class NewPlayerForm extends Component {

  constructor(props) {
    super(props);
    this.state= {};
    this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  idIndex = 1;

  tempPlayer = {
    id: this.idIndex,
    name: '',
    hands: [],
    wager: 10,
    bankroll: 90,
  };

  tempName = '';

  handlePlayerNameChange(event) {
    this.tempName = event.target.value;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.tempPlayer.name = this.tempName;
    (() => this.props.addPlayer(this.tempPlayer))();
    this.idIndex++;
    this.tempPlayer = {
      id: this.idIndex,
      name: '',
      hands: [],
      wager: 10,
      bankroll: 90,
    };
    document.getElementById("new-player-form").reset();
  }

  render() {
    console.log(this.props);
    return (
      <form id='new-player-form' onSubmit={this.handleSubmit}>
        <label name="player-name">
          Player Name
        </label>
        <input className="player-name-input"
          type="text"
          placeholder = "Enter Player Name"
          onChange={this.handlePlayerNameChange}/>
        <br />
        <input className="submit-btn" type="submit" value="Submit" />
      </form>
    );
  }
}

export default NewPlayerForm;
