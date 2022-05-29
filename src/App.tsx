import React, { Component } from "react";
import './App.css';
import Person from './components/Person'
import LettersComponent from './components/LettersComponent'
import DaysLeft from './components/DaysLeft'
import Header from './components/Header'
import Form from "./components/Form"
import PastSongs from "./components/PastSongs";
import { Song } from "./Song"
import { Letters } from "./Letters"
import { Box } from "@mui/material"
import Database from "./data/database";

const persons = ["Giorgio", "Aditya", "Kevin", "Hamza", "Alex"]

interface AppState {
  personIdx: number
  letters: Letters
  daysLeft: number
  pastSongs: Song[]
}
class App extends Component<{}, AppState> {
  constructor(props = {}) {
    super(props);

    this.state = {
      personIdx: 0,
      letters: {
        alphabetLetter: "A",
        lastLetterOfPrevSong: undefined
      },
      daysLeft: 2,
      pastSongs: []
    }
  }

  componentDidMount() {
    Database.Instance.setSongsUpdateListener((songs) => {
      this.setState({
        pastSongs: songs
      })
    });

    Database.Instance.setLettersUpdateListener((letters) => {
      this.setState({
        letters: letters
      })
    })
  }

  incPersonIdx() {
    this.setState({
      personIdx: this.state.personIdx + 1
    })
  }

  updateLetters = async (letters: Letters) => {
    Database.Instance.updateLettersOnDatabase(letters)
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

  handleClick = async (song: Song) => {
    await this.addSong(song);
  }

  render() {
    return (
      <Box m={2}>
        <Header />
        <Person person={persons[this.state.personIdx % persons.length]} />
        <LettersComponent
          aplhLetter={this.state.letters.alphabetLetter}
          lastLetterOfPrevSong={this.state.letters.lastLetterOfPrevSong}
        />
        <DaysLeft daysLeft={this.state.daysLeft} />
        <Form handleClick={this.handleClick} />
        <PastSongs pastSongs={this.state.pastSongs} />
      </Box>
    )
  }
}

export default App;
