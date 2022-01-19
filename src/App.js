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

  formRef = React.createRef();

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
      : null;

    let lastLetterOfPrevTitle = prevTitle
      ? prevTitle[prevTitle.length - 1].toUpperCase()
      : null;

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

  addSong = e => {
    e.preventDefault();
    if(!this.formRef.current.checkValidity()) return;
    this.setState(state => ({
      pastSongs: [...state.pastSongs, state.newSong],
      newSong: {titleCovered: "", artistCovered: ""},
      formInvalid: true
    }))
  }

  handleClick = e => {
    this.addSong(e);
    this.incPersonIdx();
    this.determineLetters();
    console.log(
      'lastLetterOfPrevSong', 
      this.state.pastSongs[this.state.pastSongs.length - 1]['titleCovered'][this.state.pastSongs[this.state.pastSongs.length - 1]['titleCovered'].length - 1].toUpperCase()
    )
  }

  handleChange = e => {
    const newSong = {...this.state.newSong};
    newSong[e.target.name] = e.target.value;
    this.setState({ 
      newSong,
      formInvalid: !this.formRef.current.checkValidity() 
    })
  }

  render() {
    return (
      <>
        <Header />
        <Person person={persons[this.state.personIdx % persons.length]} />
        <Letters aplhLetter={alphabet[this.state.alphLetterIdx % alphabet.length]} lastLetterOfPrevSong={this.state.lastLetterOfPrevSong}/>
        <DaysLeft daysLeft={this.state.daysLeft} />
        <Form 
          titleCovered={this.state.newSong.titleCovered} artistCovered={this.state.newSong.artistCovered} handleChange={this.handleChange}
          handleClick={this.handleClick}
          formRef={this.formRef}
          formInvalid={this.state.formInvalid}
        />
        <PastSongs pastSongs={this.state.pastSongs}/>
      </>
    )
  }
}

export default App;
