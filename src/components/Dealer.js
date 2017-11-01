import React, { Component } from 'react';
import Hand from './Hand';
import Wager from './Wager';
import '../App.css';

class Player extends Component {

    constructor(props) {
        super();

        this.state= {
            isDealer: true
        }
    }

    componentWillMount(){
        if (this.props.isDealer === true){
            this.setState({
                isDealer: true
            })
        }
    }

    render() {

        return (
            <div className="dealer-wrapper">
               <Hand isHandDealt={this.props.isHandDealt} isDealer={true} cards={this.props.cards} />
            </div>
        );
    }
}

export default Player;
