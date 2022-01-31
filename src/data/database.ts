import { Firestore, getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Song } from "../Song";

class Database {
    private static _instance: Database;
    private db: Firestore;

    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyDP-HqE50AzDBPuYp7m9T3uWdKNE-sZk3I",
            authDomain: "song-tag-ec68c.firebaseapp.com",
            projectId: "song-tag-ec68c",
            storageBucket: "song-tag-ec68c.appspot.com",
            messagingSenderId: "925690998273",
            appId: "1:925690998273:web:3178ffcec69a2e3d8d5a00",
            measurementId: "G-9Z3XWK13S2"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);

        this.db = getFirestore(app);
    }

    public static get Instance() {
        return this._instance || (this._instance = new this())
    }

    public async addSong(song: Song) {
        try {
            const docRef = await addDoc(collection(this.db, "songs"), {
                artist: song.artistCovered,
                title: song.titleCovered
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    public readUpdates(callback: (songs: Song[]) => void) {
        const unsub = onSnapshot(collection(this.db, "songs"), (doc) => {
            // this functions converts "doc" into an array that we can use
            
            var songs: Song[] = [];

            doc.forEach((doc) => {
                const song: Song = { artistCovered: doc.data().artist, titleCovered: doc.data().title }
                songs.push(song)
            })

            // the callback is used so we can set the state from App
            callback(songs);
        })
    }
}

export default Database

