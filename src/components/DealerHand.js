import React, {Component} from 'react';
import '../App.css';
import Card from './Card';
import axios from 'axios';

class DealerHand extends Component {
    isHitting = false;

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
            if (card.split('')[0] === 'A') {
                count++;
            }
        });
        return count;
    };

    getCardValue = (card) => {
        let val;
        switch (card.split('')[0]) {
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
        let aceCount = this.state.aceCount;
        while (sum > 21 && aceCount > 0) {
            sum = sum - 10;
            aceCount--;
        }
        if (aceCount > 0 && val < 21) {
            sum = val - 10;
        }
        return sum;
    }

    calculateValue = () => {
        let hand = this.state.cards;
        let tempState = this.state;
        let sum = 0;
        hand.forEach((card) => {
            sum += this.getCardValue(card)
        });
        tempState.hardValue = sum;
        tempState.softValue = this.softVal(sum);
        tempState.aceCount = this.calculateAceCount(hand);
        if (hand.length === 2 && tempState.hardValue === 21) {

            tempState.hasBlackJack = true

        }

        if (tempState.softValue < 17) {
            tempState.isHittable = true
        }
        if (tempState.softValue >= 17 && this.props.activePlayer === 0) {

            tempState.isHittable = false;
        }
        if (tempState.softValue > 21) {

            tempState.isBusted = true;
        }

        this.setState(tempState);

    };

    componentWillMount() {
        let cardRay = this.props.cards;
        this.setState({
            cards: cardRay
        });
    }

    reRenderCards() {
        this.calculateValue();
        this.cardComponents = this.state.cards.map((card, index) => {
            this.getCardValue(card);
            let urlStr = (index === 0 && (this.props.activePlayer !== 0) ? 'http://www.wopc.co.uk/images/subjects/delarue/animal-grab-back.jpg' : `https://deckofcardsapi.com/static/img/${card}.png`);
            return <Card value={card} key={index} url={urlStr}/>
        });
    }

    componentDidMount() {
        // this.reRenderCards();
    }

    hit() {
        console.log('hit request sent');
        console.log('soft Value : ', this.state.softValue)
        this.isHitting = true;
        axios.get(`https://cp-blackjack.herokuapp.com/hit/0/`).then((res) => {
            this.isHitting = false;
            console.log('hit request received');
            this.setState({
                cards: res.data[res.data.length - 1].hand.cards
            }, () => {
                this.reRenderCards();

            });
        }).catch(err => {
            console.log(err);
        })
    }

    myFunc() {
        if (this.state.isHittable && this.props.activePlayer === 0 && !this.isHitting) {
            this.hit();
        }
    }


    render() {
        if (this.state.isHittable && this.props.activePlayer === 0 && !this.isHitting) {
            this.hit();
        }

        this.cardComponents = this.state.cards.map((card, index) => {
            this.getCardValue(card);
            let urlStr = (index === 0 && (this.props.activePlayer !== 0) ? 'http://www.wopc.co.uk/images/subjects/delarue/animal-grab-back.jpg' : `https://deckofcardsapi.com/static/img/${card}.png`);
            return <Card value={card} key={index} url={urlStr}/>
        });

        if (this.props.activePlayer === 0) {
            return (
                <div>
                    <div className="hand-wrapper">
                        {this.cardComponents}
                    </div>
                    <div className="card-total">
                        Dealer
                        Has: {this.state.hardValue} {this.state.softValue !== this.state.hardValue ? ', soft (' + this.state.softValue + ')' : ''}
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
