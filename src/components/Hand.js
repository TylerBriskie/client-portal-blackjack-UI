import React, { Component } from 'react';
import '../App.css';
import Card from './Card'
import Wager from './Wager'
import axios from 'axios';
import Actions from './Actions'

class Hand extends Component {

  constructor(props) {
    super();
    this.state = {
        hardValue: 0,
        softValue: 0,
        aceCount: 0,
        isBusted: false,
        hasBlackJack: false,
        cards: [],
        isHittable: true,
    };
    this.hit = this.hit.bind(this);
    this.reRenderCards = this.reRenderCards.bind(this);
  }

  calculateAceCount = (cards) => {
      let count = 0;
      cards.forEach((card) => {
          if (card.split('')[0] === 'A'){
              count++;
          }
      });
      return count;
  };

  getCardValue = (card) => {
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
    }
    if (aceCount > 0 && val < 21){
        sum = val-10;
    }
     return sum;
  }

  calculateValue = () => {
    let hand = this.state.cards
    let sum = 0;
    hand.forEach((card) => {
      sum += this.getCardValue(card)
    });
    this.setState({
        hardValue: sum,
    });
    let tempAces = this.calculateAceCount(hand)
    this.setState({
        aceCount: tempAces,
    }, () =>{

        let temp = this.softVal(sum);
        this.setState({
            softValue: temp
        });

        if (this.state.softValue >= 21){
            this.setState({
                isHittable: false
            })
        }
        if (this.state.softValue > 21){
            this.setState({
                isBusted: true
            })
        }

        if (hand.length === 2 && this.state.hardValue === 21){
            this.setState({
                hasBlackJack: true
            })
        }
    });



  };

  cardComponents = [];

  componentWillMount(){
        console.log(this.props);
      let cardRay = this.props.cards.cards ? this.props.cards.cards : this.props.cards;
      console.log(cardRay, this.props.isDealer);
      this.setState({
          cards: cardRay
      });
  }

  reRenderCards(){
      this.cardComponents = this.state.cards.map((card, index) => {
          this.getCardValue(card);
          let urlStr = `https://deckofcardsapi.com/static/img/${card}.png`
          return <Card value={card} key={index} url={urlStr} />
      });
      this.calculateValue();
  }

  componentDidMount(){
      this.reRenderCards();
  }


  hit(){
       axios.get(`https://cp-blackjack.herokuapp.com/hit/${this.props.playerId}/`).then((res)=> {

           this.setState({
               cards: res.data[this.props.playerId-1].hand.cards
           }, ()=>{
               this.reRenderCards();
               this.calculateValue();

           });
       }).catch(err => {
           console.log(err);
       })
  }

  render() {
      console.log(this.state.isHittable)
      return (
      <div>
      <div className="hand-wrapper">
        {
          this.props.isHandDealt || this.props.isDealer ?
          this.cardComponents :
          <Wager wager={this.props.wager} modifyWager={this.props.modifyWager} />
        }
        {
            this.props.isDealer ? '' : <Actions isHittable={this.state.isHittable} hit={this.hit}/>
        }

      </div>
          {
              this.props.isHandDealt ?
                  <div className="card-total">Total: {this.state.hardValue} {this.state.softValue !== this.state.hardValue ? ', soft (' + this.state.softValue + ')': ''}</div> :
                  ''
          }
      </div>
    );
  }
}

export default Hand;
