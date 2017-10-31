import React, { Component } from 'react';
import '../App.css';
import Card from './Card'
import Wager from './Wager'

class Hand extends Component {

  constructor(props) {
    super(props);
    this.state={
      wager: 10
    };
    this.modifyWager = this.modifyWager.bind(this);
  }

  modifyWager(amt){
    console.log(this.props);
    var newWager = Math.max(5, this.state.wager + amt);
    this.setState({
      wager: newWager
    });
    console.log(this.state.wager);
  }

  componentDidMount(){
  }

  render() {
    console.log(this.props.cards.cards)
    let cards = this.props.cards.cards.map((card, index) => {
          let urlStr = `https://deckofcardsapi.com/static/img/${card}.png`
          return <Card value={card} key={index} url={urlStr} />
        });

    return (
      <div className="hand-wrapper">
        {this.props.isHandDealt ? cards : <Wager wager={this.state.wager} modifyWager={this.modifyWager} />}
      </div>
    );
  }
}

export default Hand;
