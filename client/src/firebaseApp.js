import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'


const credentials = {
    apiKey: "AIzaSyAIivJHZIf8S0tS4vASoZXGeLaPN2pJ-58",
    authDomain: "flyin-ryan-database.firebaseapp.com",
    databaseURL: "https://flyin-ryan-database.firebaseio.com",
    projectId: "flyin-ryan-database",
    storageBucket: "flyin-ryan-database.appspot.com",
    messagingSenderId: "58276712825",
    appId: "1:58276712825:web:22d8e1b5a8bbc4fa371fa8",
    measurementId: "G-MZ83BH5QMY"
  }


const firebaseApp = !firebase.apps.length ? firebase.initializeApp(credentials) : firebase.app()


const database = firebaseApp.database()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()
const auth = firebase.auth

export { firebaseApp, database, auth, googleProvider, facebookProvider }