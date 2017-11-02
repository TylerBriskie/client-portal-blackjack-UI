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
    }

    render()  {
      console.log(this.props);
      return (
          <div>
              <Hand isHandDealt={this.props.isHandDealt} isDealer={true} playerId={0} cards={this.props.cards.cards} />
          </div>
      );
    }
}

export default Dealer;
