import React, { Component } from 'react';
import '../App.css';

class Wager extends Component {

  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="wager-wrapper">
        <button className="wager-button" onClick={() => this.props.modifyWager(-5)}>-</button>
        <span className="wager-amount">{this.props.wager}</span>
        <button className="wager-button" onClick={() => this.props.modifyWager(5)}>+</button>
      </div>
    );
  }
}

export default Wager;
