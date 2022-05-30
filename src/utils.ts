import { Letters } from "./Letters";
import { Song } from "./Song";

export const meetsLetterCriteria = (newSong: Song, letters: Letters) => {
    const songTitleInitial = newSong.titleCovered.at(0)
    return songTitleInitial === letters.alphabetLetter || songTitleInitial === letters.lastLetterOfPrevSong
}

export const meetsUniqueSongCriteria = (newSong: Song, pastSongs: Song[]) => {
    // Check if song has already been added
    let songAlreadyCovered = pastSongs.filter((pastSong) => {
      return newSong.artistCovered === pastSong.artistCovered && newSong.titleCovered === pastSong.titleCovered
    })
  
    return songAlreadyCovered.length === 0
}

// export const meetsAllCriteria = (newSong: Song, letters: Letters, pastSongs: Song[]) => {
//     if (meetsLetterCriteria(newSong, letters) && meetsUniqueSongCriteria(newSong, pastSongs)) {
//         return true
//     }  
// }

export const capitalizeEachWord = (name: string) => {
    let words = name.split(" ")
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toLocaleUpperCase() + words[i].substr(1)
    }
    return words.join(" ")
}

