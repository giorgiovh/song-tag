import React, { Component } from "react";
import './App.css';
import Person from './components/Person'
import Letters from './components/Letters'
import DaysLeft from './components/DaysLeft'
import Header from './components/Header'
import Form from "./components/Form"
import PastSongs from "./components/PastSongs";
import { Song } from "./Song"
import { LettersDataType } from "./Letters"
import { Box } from "@mui/material"
import Database from "./data/database";

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

  componentDidMount() {
    Database.Instance.setUpdateListener((songs) => {
      this.setState({
        pastSongs: songs
      })
    });
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
      ? prevTitle.at(-1)?.toUpperCase()
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

  capitalizeEachWord(name: string) {
    let splitName = name.split(" ")
    for (let i = 0; i < splitName.length; i++) {
      splitName[i] = splitName[i][0].toLocaleUpperCase() + splitName[i].substr(1)
    }
    return splitName.join(" ")
  }

  addSong = async (newSong: Song, callBack?: Function) => {
    // Capitalize the title and artist covered
    newSong.titleCovered = this.capitalizeEachWord(newSong.titleCovered)
    newSong.artistCovered = this.capitalizeEachWord(newSong.artistCovered)

    // Check if song has already been added
    let songAlreadyCovered = this.state.pastSongs.filter((pastSong) => {
      return newSong.artistCovered === pastSong.artistCovered && newSong.titleCovered === pastSong.titleCovered
    })

    if (songAlreadyCovered.length > 0) {
      alert("This song has already been added. Please choose a different song")
    } else {
      Database.Instance.addSongToDatabase(newSong);
      this.setState(state => ({
        pastSongs: [...state.pastSongs, newSong]
      }), () => {
        if (callBack) {
          callBack()
        }
      })
    }
  }

  updateLetters = async (letters: LettersDataType) => {
    this.determineLetters()
    Database.Instance.updateLettersOnDatabase("letters", {alphabetLetter: letters.alphabetLetter, lastLetterOfPrevSong: letters.lastLetterOfPrevSong})
  }
  
  handleClick = (song: Song) => {
    // this.addSong(song, () => this.determineLetters());
    this.addSong(song, () => this.updateLetters({alphabetLetter: "X", lastLetterOfPrevSong: "Y"}));
    this.incPersonIdx();
  }


  render() {
    return (
      <Box m={2}>
        <Header />
        <Person person={persons[this.state.personIdx % persons.length]} />
        <Letters aplhLetter={alphabet[this.state.alphLetterIdx % alphabet.length]} lastLetterOfPrevSong={this.state.lastLetterOfPrevSong} />
        <DaysLeft daysLeft={this.state.daysLeft} />
        <Form handleClick={this.handleClick} />
        <PastSongs pastSongs={this.state.pastSongs} />
      </Box>
    )
  }
}

export default App;
