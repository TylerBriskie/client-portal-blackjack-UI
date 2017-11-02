import React, { Component } from 'react';
import '../App.css';
import Card from './Card';
import axios from 'axios';

class DealerHand extends Component {

    constructor(props) {
        super();
        this.state = {
            hardValue: 0,
            softValue: 0,
            aceCount: 0,
            isBusted: false,
            hasBlackJack: false,
            cards: [],
            isHittable: false
        };
        this.hit = this.hit.bind(this);
    }

    cardComponent = [];

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
        }, () => {
          if (hand.length === 2 && this.state.hardValue === 21){
              this.setState({
                  hasBlackJack: true
              })
          }
        });
        let tempAces = this.calculateAceCount(hand)
        this.setState({
            aceCount: tempAces,
        }, () =>{
          console.log('hello', this.props.activePlayer);
          let temp = this.softVal(sum);
          this.setState({
              softValue: temp
          }, () => {
            if (this.state.softValue < 22 ){
              this.setState({
                isHittable: true
              });
            }
            if (this.state.softValue >= 22 && this.props.activePlayer === 0 ){
              this.setState({
                isHittable: false
              });
            }
            if (this.state.softValue > 21){
              this.setState({
                  isBusted: true
              })
            }
          });

        });
    };

    componentWillMount(){
      let cardRay = this.props.cards;
      this.setState({
          cards: cardRay
      });
    }

    reRenderCards(){
      this.calculateValue();
      this.cardComponents = this.state.cards.map((card, index) => {
        this.getCardValue(card);
        let urlStr = (index === 0 && (this.props.activePlayer !== 0) ? 'http://www.wopc.co.uk/images/subjects/delarue/animal-grab-back.jpg' : `https://deckofcardsapi.com/static/img/${card}.png`);
        return <Card value={card} key={index} url={urlStr} />
      });
    }

    componentDidMount(){
        console.log('rerenderer');
        this.reRenderCards();
    }

    hit(){
      axios.get(`https://cp-blackjack.herokuapp.com/hit/0/`).then((res)=> {
        this.setState({
            cards: res.data[res.data.length - 1].hand.cards
        }, ()=>{
            this.reRenderCards();
            this.calculateValue();

        });
      }).catch(err => {
          console.log(err);
      })
    }

    myFunc() {
      console.log('myFunc');
      if (this.state.isHittable && this.props.activePlayer === 0){
        console.log();
        this.hit();
      }
    }


    render() {
      this.myFunc();

      this.cardComponents = this.state.cards.map((card, index) => {
        this.getCardValue(card);
        let urlStr = (index === 0 && (this.props.activePlayer !== 0) ? 'http://www.wopc.co.uk/images/subjects/delarue/animal-grab-back.jpg' : `https://deckofcardsapi.com/static/img/${card}.png`);
        return <Card value={card} key={index} url={urlStr} />
      });

        if(this.props.activePlayer === 0) {
          return (
              <div>
                  <div className="hand-wrapper">
                    {this.cardComponents}
                  </div>
                  <div className="card-total">
                    Total: {this.state.hardValue} {this.state.softValue !== this.state.hardValue ? ', soft (' + this.state.softValue + ')': ''}
                  </div>
              </div>
          );
      } else {
        return (
          <div className="hand-wrapper">
            {this.cardComponents}
          </div>
        )
      }
    }
}

export default DealerHand;
