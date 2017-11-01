import React, { Component } from 'react';

import '../App.css';

class Actions extends Component {

    constructor(props) {
        super();

    }

    render() {
        return(
            <div className="actions-wrapper">
                <button className="hit-button" onClick={()=>this.props.hit()}>Hit</button>
                <button className="stay-button">Stay</button>
            </div>
            )
    }
}

export default Actions;
