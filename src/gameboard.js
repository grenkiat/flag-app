import React, {Component} from 'react';
import shuffle from 'shuffle-array';
import Flag from './flag.js';
import Choices from './choices.js';
import Answer from './answer.js';

class Gameboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      options: [],
      correctOption: undefined,
      questionState: undefined    //0: nothing, 1: correct, 2: wrong
    }

    this.__guess = this.__guess.bind(this); 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePlayAgain = this.handlePlayAgain(this);
  }

  componentDidMount() {
    console.log("after mounting component")
    fetch("https://restcountries.eu/rest/v2/all")
    .then(data => data.json())
    .then(data => {
      //Get 4 options and a correct option
      const correctOption = Math.floor(Math.random() * data.length);
      const options = this.__getOptions(correctOption, data);
      const countries = data;
      //set state
      this.setState({
        countries,
        options,
        correctOption,
        questionState: 0
      });
    })
    .catch(console.warn)
  }

  __guess(guess) {
    let show;
    console.log("__guess!");
    let questionState = guess === this.state.correctOption ? 1 : 2;
    this.setState({questionState});
  }

  __getOptions(correctOption, countries) {
    const options = [];
    options[0] = correctOption;
    let i = 0, tries = 0, nxt_opt = 0;
    while(i < 3 && tries < 20) {      //get the remaining three options and push into array
      nxt_opt = Math.floor(Math.random() * countries.length);
      if(!(options.indexOf(nxt_opt) !== -1)) {      //if the option is not repeated
        options[i+1] = nxt_opt;
        i++;
      } else {      //choose another option
        console.log(tries + "take!");
        tries++;
      }
    }
    return shuffle(options);        //shuffle the options
  }

  handleSubmit(e) {
    if(!e) { e.preventDefault(); }
    this.__guess(this.state.userChoice);
  }

  handleChange(e) {
      console.log("handleChange!");
      console.log(e);
      this.setState({userChoice: Number(e.target.value)});
  }

  handlePlayAgain(e) {
    console.log("handlePlayAgain!");
  }

  render() {
    const { countries, options, correctOption, questionState } = this.state;
    let opt_countries;
    if(countries[0] != null) {
      opt_countries = options.map((option) => {
        const country = {
          name: countries[option].name,
          index: option
        }
        return country;
      })
      return (
        <div>
          {this.state.questionState === 0 ? 
          <Choices options={opt_countries} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/> : 
          <Answer questionState={questionState} correctCountry={countries[correctOption]} handlePlayAgain={this.handlePlayAgain}/>
           }
          <Flag correctCountry={countries[correctOption]}/>
        </div>
      )
    }

    else {
      return null;
    }
  }
}

export default Gameboard;
