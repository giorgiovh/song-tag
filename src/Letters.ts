export interface Letters {
    alphabetLetter: string
    lastLetterOfPrevSong?: string
}

export const createNextLetters = (songTitle: string, letters: Letters) => {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    const updatedLastLetter = songTitle.at(-1)!
    const songTitleInitial = songTitle.at(0)!

    var updatedAlphabetLetter = letters.alphabetLetter
    if (songTitleInitial.toLowerCase() === letters.alphabetLetter.toLowerCase()) {
        updatedAlphabetLetter = alphabet[alphabet.indexOf(songTitleInitial) + 1]
    }

    const nextLetters: Letters = {
        alphabetLetter: updatedAlphabetLetter.toUpperCase(),
        lastLetterOfPrevSong: updatedLastLetter.toUpperCase()
    }

    return nextLetters
}