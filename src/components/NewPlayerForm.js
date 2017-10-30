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
    bankroll: 100,
    hands: []
  };

  tempName = '';

  handlePlayerNameChange(event) {

    this.tempName = event.target.value;
    console.log(this.tempName);
  }

  handleSubmit(event) {
    console.log(event.target.value);
    event.preventDefault();
    this.tempPlayer.name = this.tempName;
    (() => this.props.addPlayer(this.tempPlayer))();
    this.idIndex++
    this.tempPlayer = {
      id: this.idIndex,
      name: '',
      bankroll: 100,
      hands: []};
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
