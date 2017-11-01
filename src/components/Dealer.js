import React, { Component } from 'react';
import Hand from './Hand';
import '../App.css';
import Player from './Player';


class Dealer extends Component {

    constructor(props) {
        super(props);

        this.state= {
            isDealer: true
        }
    }

    dealerHand = [];
    componentWillMount(){
        this.dealerHand = this.props.cards ? this.props.cards : ['AS', 'KS']
    }

    render() {
    console.log(this.props);
    console.log(this.dealerHand);
        return (
            <div>
                <Hand isHandDealt={this.props.isHandDealt} isDealer={true} playerId={0} cards={this.dealerHand} />
            </div>
        );
    }
}

export default Dealer;
