import React, { Component } from "react";
import './App.css';
import Person from './components/Person'

const persons = ["Giorgio", "Aditya", "Kevin", "Hamza", "Alex"]
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
class App extends Component {
  constructor() {
    super();

    this.state = {
      personIdx: 0,
      letters: "H or T",
      daysLeft: 2
    }
  }

  increaseIndex = () => {
    this.setState({personIdx: this.state.personIdx + 1})
  }

  render() {
    return (
      <>
        {/* <Person person={persons[this.state.index]}></Person> */}
        <Person person={persons[this.state.personIdx % persons.length]}></Person>
        <button onClick={this.increaseIndex}>Submit Song</button>
      </>
    )
  }
}

export default App;
