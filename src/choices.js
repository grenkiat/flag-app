import React, { Component } from 'react';

class Choices extends Component {
    constructor(props) {
        super();
        this.state = {
            userChoice: undefined
        }

    }

    render() {
        let opt = this.props.options.map((option) => {
            return <label key={option.index}>
                <input type="radio" value={option.index} onChange={this.props.handleChange} name="flag-choices" style={{padding: '5px'}}/>{option.name}</label>
        })
        return(
            <form className="choices" onSubmit={this.handleSubmit}>
                {opt}
                <input type="submit" value="SUBMIT!" onClick={() => this.props.handleSubmit(opt)} style={{margin: '10px', padding: '5px'}}/>
            </form>
        )
    }
}

export default Choices;
