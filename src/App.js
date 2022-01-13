import React, { Component } from "react";
import './App.css';
import Person from './components/Person'

const persons = ["Giorgio", "Aditya", "Kevin", "Hamza", "Alex"]
class App extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      letters: "H or T",
      daysLeft: 2
    }
  }

  increaseIndex = () => {
    this.setState({index: this.state.index + 1})
  }

  render() {
    return (
      <>
        <Person person={persons[this.state.index]}></Person>
        <button onClick={this.increaseIndex}>Submit Song</button>
      </>
    )
  }
}

export default App;
