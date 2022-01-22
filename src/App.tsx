import React, { Component } from "react";
import './App.css';
import Person from './components/Person'
import Letters from './components/Letters'
import DaysLeft from './components/DaysLeft'
import Header from './components/Header'
import Form from "./components/Form"
import PastSongs from "./components/PastSongs";
import { Song } from "./Song"

const persons = ["Giorgio", "Aditya", "Kevin", "Hamza", "Alex"]
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

interface AppState {
  personIdx: number
  alphLetterIdx: number
  lastLetterOfPrevSong?: string
  daysLeft: number
  pastSongs: Song[]
}
class App extends Component<{}, AppState> {
  constructor(props = {}) {
    super(props);

    this.state = {
      personIdx: 0,
      alphLetterIdx: 0,
      lastLetterOfPrevSong: "",
      daysLeft: 2,
      pastSongs: []
    }
  }

  incPersonIdx() {
    this.setState({
      personIdx: this.state.personIdx + 1
    })
  }

  incAlphLetterIdx() {
    this.setState({
      alphLetterIdx: this.state.alphLetterIdx + 1
    })
  }

  setLastLetterOfPrevSong() {
    let prevTitle = this.state.pastSongs.length
      ? this.state.pastSongs[this.state.pastSongs.length - 1]['titleCovered']
      : undefined;

    let lastLetterOfPrevTitle = prevTitle
      ? prevTitle[prevTitle.length - 1].toUpperCase()
      : undefined;

    this.setState({ lastLetterOfPrevSong: lastLetterOfPrevTitle });
  }

  checkIfShouldMoveAlphLetter() {
    let newSongInitial = this.state.pastSongs.at(-1)?.titleCovered[0].toUpperCase();
    let currAlphLetter = alphabet[this.state.alphLetterIdx];
    if (newSongInitial === currAlphLetter) {
      this.incAlphLetterIdx();
    }
  }

  determineLetters() {
    this.setLastLetterOfPrevSong();
    this.checkIfShouldMoveAlphLetter();
  }

  addSong = (song: Song, callBack?: Function) => {
    this.setState(state => ({
      pastSongs: [...state.pastSongs, song]
    }), () => {
      if (callBack) {
        callBack()
      }
    })
  }

  handleClick = (song: Song) => {
    this.addSong(song, () => this.determineLetters());
    this.incPersonIdx();
  }

  render() {
    return (
      <>
        <Header />
        <Person person={persons[this.state.personIdx % persons.length]} />
        <Letters aplhLetter={alphabet[this.state.alphLetterIdx % alphabet.length]} lastLetterOfPrevSong={this.state.lastLetterOfPrevSong}/>
        <DaysLeft daysLeft={this.state.daysLeft} />
        <Form handleClick={this.handleClick}/>
        <PastSongs pastSongs={this.state.pastSongs}/>
      </>
    )
  }
}

export default App;
