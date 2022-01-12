import React, { Component } from "react";
import './App.css';
import Person from './components/Person'
class App extends Component {
  constructor() {
    super();

    this.state = {
      person: "Giorgio",
      letters: "H or T",
      daysLeft: 2
    }
  }

  render() {
    return (
      <Person person={this.state.person}></Person>
    )
  }
}

export default App;
