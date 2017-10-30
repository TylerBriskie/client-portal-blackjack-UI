import React, { Component } from 'react';
import '../App.css';
import Card from './Card'
import Wager from './Wager'

class Hand extends Component {

  constructor(props) {
    super(props);
    this.state={
      wager: 10
    }
    this.modifyWager = this.modifyWager.bind(this);
  }

  modifyWager(amt){
    var newWager = Math.max(5, this.state.wager + amt);
    this.setState({
      wager: newWager
    })
    console.log(this.state.wager);
  }

  componentDidMount(){
    console.log(this.props);
  }

  render() {
    console.log(this.props.cards)
    let cards = this.props.cards.map((card, index) =>
      <Card value={card} key={index}/>
    )

    return (
      <div className="hand-wrapper">
        {this.props.isHandDealt ? cards : <Wager wager={this.state.wager} modifyWager={this.modifyWager} />}
      </div>
    );
  }
}

export default Hand;
