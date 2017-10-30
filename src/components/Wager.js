import React, { Component } from 'react';
import '../App.css';

class Wager extends Component {

  constructor(props) {
    super(props);
  }

  // increaseWager(){
  //   this.setState(prevState => {
  //     wager: prevState.wager + 5
  //   })
  // }
  //
  // decreaseWager(){
  //   this.setState(prevState => {
  //     wager: Math.max(0, prevState.wager - 5)
  //   })
  // }

  render() {

    return (
      <div className="wager-wrapper">
        Wager
      </div>
    );
  }
}

export default Wager;
