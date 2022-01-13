import React, { Component } from "react";
import './App.css';
import Person from './components/Person'
import Letters from './components/Letters'
import DaysLeft from './components/DaysLeft'
import Header from './components/Header'
import Form from "./components/Form"
import PastSongs from "./components/PastSongs";

const persons = ["Giorgio", "Aditya", "Kevin", "Hamza", "Alex"]
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
class App extends Component {
  constructor() {
    super();

    this.state = {
      personIdx: 0,
      alphLetterIdx: 0,
      daysLeft: 2,
      pastSongs: [{ titleCovered: "Gigolo Aunt", artistCovered: "Syd Barrett" }, { titleCovered: "Superstition", artistCovered: "Stevie Wonder" }],
      titleCovered: "Hello",
      artistCovered: "Oasis",
    }
  }

  incPersonIdx = () => {
    this.setState({
      personIdx: this.state.personIdx + 1
    })
  }

  incAlphLetterIdx = () => {
    this.setState({
      alphLetterIdx: this.state.alphLetterIdx + 1
    })
  }

  moveTurn = () => {
    this.incPersonIdx();
    // if initial of song submitted === alphabet[this.state.alphLetterIdx], then incAlphLetterIdx
    this.incAlphLetterIdx();
    // else if initial of song submitted === lastLetterOfSong, then inc lastLetterOfSong
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <>
        <Header />
        <Person person={persons[this.state.personIdx % persons.length]} />
        <Letters letter={alphabet[this.state.alphLetterIdx % alphabet.length]} />
        <DaysLeft daysLeft={this.state.daysLeft} />
        <Form moveTurn={this.moveTurn} titleCovered={this.state.titleCovered} artistCovered={this.state.artistCovered} handleChange={this.handleChange}/>
        <PastSongs pastSongs={this.state.pastSongs}/>
      </>
    )
  }
}

export default App;
