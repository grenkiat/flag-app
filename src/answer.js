import React, { Component } from 'react';

const Answer = props => {
    const {questionState, correctCountry, handlePlayAgain} = props;
    if(questionState === 1) {
        return (
        <form className="correct-answer" onSubmit={handlePlayAgain}>
            Your answer is correct!
            <Button />
        </form>
        )
    } else {
        return (
        <form className="wrong-answer" onSubmit={handlePlayAgain}>
            {`Your answer is incorrect! The correct country is ${correctCountry.name}`}
            <Button />   
        </form>)
    }
}

const style = {
    margin: '10px',
    padding: '5px'
}

class Button extends Component {
    render() {
        return (
            <input type="submit" onSubmit={() => {}} value="Play again!" style={style}/>
        )
    }
}


export default Answer;