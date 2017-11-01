import React, { Component } from 'react';

import '../App.css';

class Actions extends Component {

    constructor(props) {
        super();
        this.state={
            isHittable: true,
        }
    }

    componentDidMount(){
        console.log(this.props.isHittable);
        this.setState({
            isHittable: this.props.isHittable
        })
    }

    render() {
        return(
            <div className="actions-wrapper">
                {this.state.isHittable ? <button className="hit-button" onClick={()=>this.props.hit()}>Hit</button> : ''}
                <button className="stay-button">Stay</button>
            </div>
            )
    }
}

export default Actions;
