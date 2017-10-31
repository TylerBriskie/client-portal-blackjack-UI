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
        <img className="card-image" src={this.props.url} alt="{this.props.value}"/>
      </div>
    );
  }
}

export default Card;
