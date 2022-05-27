export interface LettersDataType {
    alphabetLetter: string
    lastLetterOfPrevSong: string
}

const createNextLetters = (songTitle: string, letters: LettersDataType) => {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    const newLastLetterOfPrevSong = songTitle.at(-1)!
    const songTitleInitial = songTitle.at(0)!

    var newAlphabetLetter = letters.alphabetLetter
    if (songTitleInitial === letters.alphabetLetter) {
        newAlphabetLetter = alphabet[alphabet.indexOf(songTitleInitial) + 1]
    }
    
    const nextLetters: LettersDataType = {
        alphabetLetter: newAlphabetLetter,
        lastLetterOfPrevSong: newLastLetterOfPrevSong
    }
}