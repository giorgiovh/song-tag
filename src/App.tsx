import React, { Component } from "react"
import './App.css'
import Person from './components/Person'
import LettersComponent from './components/LettersComponent'
import DaysLeft from './components/DaysLeft'
import Header from './components/Header'
import Form from "./components/Form"
import PastSongs from "./components/PastSongs"
import { Song } from "./Song"
import { Letters, createNextLetters } from "./Letters"
import { Box } from "@mui/material"
import Database from "./data/database"
import { meetsLetterCriteria, meetsUniqueSongCriteria, capitalizeEachWord } from "./Utils"
import { userInfo } from "os"

const persons = ["Giorgio", "Aditya", "Kevin", "Hamza", "Alex"]

type MyProps = {
  logout: Function
}

interface AppState {
  personIdx: number
  letters: Letters
  daysLeft: number
  pastSongs: Song[]
}
class App extends Component<MyProps, AppState> {
  constructor(props: MyProps) {
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

  handleClick = async (song: Song) => {
    song.titleCovered = capitalizeEachWord(song.titleCovered.toLowerCase())
    song.artistCovered = capitalizeEachWord(song.artistCovered.toLowerCase())

    if (!meetsLetterCriteria(song, this.state.letters)) {
      alert("Please choose a song that starts with the alphabet letter or the last letter of the previous song")
    } else if (!meetsUniqueSongCriteria(song, this.state.pastSongs)) {
      alert("Please choose a song that has not already been covered")
    } else {
      Database.Instance.addSongToDatabase(song);
      const nextLetters = createNextLetters(song.titleCovered, this.state.letters)
      Database.Instance.updateLettersOnDatabase(nextLetters)
    }
  }


  render() {
    return (
      <Box m={2}>
        <button onClick={() => this.props.logout()}>Log out</button>
        <Header />
        <Person person={persons[this.state.personIdx % persons.length]} />
        <LettersComponent
          aplhLetter={this.state.letters.alphabetLetter}
          lastLetterOfPrevSong={this.state.letters.lastLetterOfPrevSong}
        />
        <DaysLeft daysLeft={this.state.daysLeft} />``
        <Form handleClick={this.handleClick} />
        <PastSongs pastSongs={this.state.pastSongs} />
      </Box>
    )
  }
}

export default App;
