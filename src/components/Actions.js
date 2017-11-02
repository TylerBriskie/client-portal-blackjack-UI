import React, { Component } from 'react';

import '../App.css';

class Actions extends Component {

    constructor(props) {
      super();
      this.state={
          isHittable: true,
      }
    }

    render() {
      return(
        <div className="actions-wrapper">
            {this.props.isHittable ? <button className="hit-button" onClick={()=>this.props.hit()}>Hit</button> : ''}
            <button className="stay-button" onClick={()=>this.props.stay()}>Stay</button>
        </div>
        )
    }
}

export default Actions;
