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
            <div>
              <DealerHand cards={this.props.dealer.hand.cards}/>
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
