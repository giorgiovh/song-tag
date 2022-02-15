import { Timestamp } from "firebase/firestore";

export interface Song {
  titleCovered: string
  artistCovered: string
  timestamp: Timestamp
}
