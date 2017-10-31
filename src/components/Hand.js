import React, { Component } from 'react';
import '../App.css';
import Card from './Card'
import Wager from './Wager'

class Hand extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hardValue: 0,
      softValue: 0,
      aceCount: 0,
      canHit: true,
      isBusted: false,
      hasBlackJack: false
    }
  }

  getCardValue = (card) => {
    console.log(card.split('')[0]);
    let newAceCount = this.state.aceCount;
    let val;
    switch(card.split('')[0]){
      case 'Q':
        val = 10;
        break;
      case 'K':
        val = 10;
        break;
      case 'J':
        val = 10;
        break;
      case '0':
        val = 10;
        break;
      case 'A':
        newAceCount++;
        val = 11;
        break;
      default:
        val = parseInt(card.split('')[0]);
    }
    this.setState({
      aceCount: newAceCount
    });
    return val;
  }

  softVal(val) {
    let sum = val;
    let aceCount = this.state.aceCount
    while(sum > 21 && aceCount > 0) {
      sum = sum - 10;
      aceCount--;
      console.log(sum, aceCount);
    }
     return sum;
  }

  calculateValue = () => {
    let hand = this.props.cards.cards ? this.props.cards.cards : this.props.cards;
    console.log(hand);
    let sum = 0;
    hand.forEach((card) => {
      sum += this.getCardValue(card)
    });
    this.setState({
      hardValue: sum
    });
    console.log(this.state.aceCount, 'ACECOUNT');
    if(this.state.aceCount > 0) {
      this.setState({
        softValue: this.softVal(sum)
      });
    }

  }

  componentDidMount(){
    this.calculateValue();
  }

  render() {
    console.log(this.state);
    let cardRay = this.props.cards.cards ? this.props.cards.cards : ['AD', '0S'];
    let cards = cardRay.map((card, index) => {
          this.getCardValue(card);
          let urlStr = `https://deckofcardsapi.com/static/img/${card}.png`
          return <Card value={card} key={index} url={urlStr} />
        });
    let cardTotal = <div className="card-total">{this.state.hardValue}</div>;

    return (

      <div>
      <div className="hand-wrapper">
        {console.log(this.props)}

        {this.props.isHandDealt ?
          cards :
          <Wager wager={this.props.wager} modifyWager={this.props.modifyWager} />
        }

      </div>
        Total: {this.state.hardValue > 0 ?
        this.state.hardValue :
        ''
      }
      </div>
    );
  }
}

export default Hand;
