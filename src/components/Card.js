import React, { Component } from 'react';
import '../App.css';

class Card extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);

    return (
      <div className="card-wrapper">
        {this.props.value}
      </div>
    );
  }
}

export default Card;
