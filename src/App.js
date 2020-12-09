import React, {Component} from 'react';
import './App.css';
import Gameboard from './gameboard.js';
import worldImg from './world.jpg';

class App extends Component {
  constructor(props) {
    super(); 
  }

  render() {
    return (
      <div className="App"> 
        <header 
          className="title-header"
          style = {{
            backgroundImage: `url(${worldImg})`
          }}>
        </header>
        <Gameboard/>
      </div>
    )
  }
}


export default App;
