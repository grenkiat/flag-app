import React, { Component } from 'react';

class Flag extends Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <div className="flag">
                <img src={this.props.correctCountry.flag}/>
            </div>
        )
    
    }
}

export default Flag;