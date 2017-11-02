import React, { Component } from 'react';
import DealerHand from './DealerHand';
import '../App.css';

class Dealer extends Component {

    constructor(props) {
        super(props);
        this.state= {}
    }

    render()  {
      if(this.props.dealer.hand) {
        return (
            <div className={"player-wrapper " + ((this.props.activePlayer === 0) && this.props.isHandDealt ? 'active-player' : '')}>

              <DealerHand cards={this.props.dealer.hand.cards} activePlayer={this.props.activePlayer} changeActivePlayer={this.props.changeActivePlayer}/>
                <h3>Dealer</h3>
            </div>
        );
      }

      return (
          <div>
          </div>
      );
    }
}

export default Dealer;
