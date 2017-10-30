import React, { Component } from 'react';
import '../App.css';
import Card from './Card'
import Wager from './Wager'

class Hand extends Component {

  constructor(props) {
    super(props);
    this.state={
      wager: 10
    }
  }

  increaseWager(){
    this.setState(prevState => {
      wager: prevState.wager + 5
    })
  }

  decreaseWager(){
    this.setState(prevState => {
      wager: Math.max(0, prevState.wager - 5)
    })
  }

  componentDidMount(){
    console.log(this.props);
  }

  render() {
    console.log(this.props.cards)
    let cards = this.props.cards.map((card, index) =>
      <Card value={card} key={index}/>
    )

    return (
      <div className="hand-wrapper">
        {this.props.isHandDealt ? cards : <Wager />}
      </div>
    );
  }
}

export default Hand;
