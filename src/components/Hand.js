import React, { Component } from 'react';
import '../App.css';
import Card from './Card'
import Wager from './Wager'
import axios from 'axios';
import Actions from './Actions'

class Hand extends Component {

  constructor(props) {
    super(props);
    this.state = {
        hardValue: 0,
        softValue: 0,
        aceCount: 0,
        canHit: true,
        isBusted: false,
        hasBlackJack: false,
        cards: [],
    }
  }

  calculateAceCount = (cards) => {
      console.log(cards);
      let count = 0;
      cards.forEach((card) => {
          if (card.split('')[0] === 'A'){
              count++;
          }
      });
      console.log('ace count from calculateAceCount: ', count);
      return count;
  };

  getCardValue = (card) => {
    console.log(card.split('')[0]);
    var newAceCount = 0;
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
        val = 11;
        break;
      default:
        val = parseInt(card.split('')[0], 10);
    }
    return val;
  };

  softVal(val) {
    let sum = val;
    let aceCount = this.state.aceCount
    while(sum > 21 && aceCount > 0) {
      sum = sum - 10;
      aceCount--;
      console.log(sum, aceCount);
    }
    if (aceCount > 0 && val < 21){
        sum = val-10;
    }
    console.log(sum);
     return sum;
  }

  calculateValue = () => {
    let hand = this.props.cards.cards ? this.props.cards.cards : this.props.cards;
    let sum = 0;
    hand.forEach((card) => {
      sum += this.getCardValue(card)
    });
    this.setState({
      hardValue: sum
    });
    let tempAces = this.calculateAceCount(hand)
    this.setState({
        aceCount: tempAces,
    }, () =>{
        if(this.state.aceCount > 0) {
            let temp = this.softVal(sum);
            this.setState({
                softValue: temp
            });
        }
    });


  };

  cardComponents = [];

  componentWillMount(){
      console.log(this.props);
      let cardRay = this.props.cards.cards;
      this.setState({
          cards: cardRay
      })
      let cardTotal = <div className="card-total">Total: {this.state.hardValue}</div>;
  }


  componentDidMount(){
      this.cardComponents = this.state.cards.map((card, index) => {
          this.getCardValue(card);
          let urlStr = `https://deckofcardsapi.com/static/img/${card}.png`
          return <Card value={card} key={index} url={urlStr} />
      });
      this.calculateValue();

  }

  componentDidMount(){
      console.log(this.props.playerId);
  }

  hit(){
      // axios.get('https://cp-blackjack.herokuapp.com/')
  }

  render() {


    return (

      <div>
      <div className="hand-wrapper">
        {
          this.props.isHandDealt ?
          this.cardComponents :
          <Wager wager={this.props.wager} modifyWager={this.props.modifyWager} />
        }
        <Actions hit={this.hit}/>
      </div>
          {
              this.props.isHandDealt ?
                  <div className="card-total">Total: {this.state.hardValue} {this.state.softValue > 0 ? ', soft (' + this.state.softValue + ')': ''}</div> :
                  ''
          }
      </div>
    );
  }
}

export default Hand;
