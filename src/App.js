import React, { Component } from "react";
import './App.css';
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
      <div className="App">
        <h2>Person: {this.state.person}</h2>
      </div>
    )
  }
}

export default App;
