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

interface Song {
  titleCovered: string
  artistCovered: string
}
interface AppState {
  personIdx: number
  alphLetterIdx: number
  lastLetterOfPrevSong?: string
  daysLeft: number
  pastSongs: Song[]
  newSong: Song
  formInvalid: boolean
}
class App extends Component<{}, AppState> {
  constructor(props = {}) {
    super(props);

    this.state = {
      personIdx: 0,
      alphLetterIdx: 0,
      lastLetterOfPrevSong: "",
      daysLeft: 2,
      pastSongs: [],
      newSong: {
        titleCovered: "",
        artistCovered: "",
      },
      formInvalid: true
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
    let newSongInitial = this.state.newSong['titleCovered'][0].toUpperCase();
    let currAlphLetter = alphabet[this.state.alphLetterIdx];
    if (newSongInitial === currAlphLetter) {
      this.incAlphLetterIdx();
    }
  }

  determineLetters() {
    this.setLastLetterOfPrevSong();
    this.checkIfShouldMoveAlphLetter();
  }

  addSong = () => {
    this.setState(state => ({
      pastSongs: [...state.pastSongs, state.newSong],
      newSong: {titleCovered: "", artistCovered: ""},
      formInvalid: true
    }))
  }

  handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.addSong();
    this.incPersonIdx();
    this.determineLetters();
    console.log(
      'lastLetterOfPrevSong', 
      this.state.pastSongs[this.state.pastSongs.length - 1]['titleCovered'][this.state.pastSongs[this.state.pastSongs.length - 1]['titleCovered'].length - 1].toUpperCase()
    )
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSong = {...this.state.newSong};

    // newSong[e.target.name] = e.target.value;

    switch (e.target.name) {
      case "titleCovered":
        newSong.titleCovered = e.target.value;
        break;
    
      case "artistCovered":
        newSong.artistCovered = e.target.value;
        break;

      default:
        break;
    }

    this.setState({ 
      newSong
    })
  }

  render() {
    return (
      <>
        <Header />
        <Person person={persons[this.state.personIdx % persons.length]} />
        <Letters aplhLetter={alphabet[this.state.alphLetterIdx % alphabet.length]} lastLetterOfPrevSong={this.state.lastLetterOfPrevSong}/>
        <DaysLeft daysLeft={this.state.daysLeft} />
        <Form onSubmit={undefined}/>
        <PastSongs pastSongs={this.state.pastSongs}/>
      </>
    )
  }
}

export default App;
