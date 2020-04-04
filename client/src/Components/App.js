import React from 'react';
import '../Css/App.css';
import Landing from "./Landing.js"
import { firebaseApp, database, googleProvider } from '../firebaseApp'
import Header from './Header'
import Modal from './Modal.js'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: firebaseApp.auth().currentUser,
      database: null,
      modal: false
    }
  }

  loginHandler = async (event) => {
    event.preventDefault()

    let password = event.target.password.value
    let email = event.target.email.value

    event.target.password.value = ''
    event.target.email.value = ''

    firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(function (err) {
      let message = err.message
      alert(message)
    })

    firebaseApp.auth().onAuthStateChanged(async (user) => {

      if (user) {
        await this.state.database.ref('/')
          .once('value')
          .then((snapshot) => {
            let response = snapshot.val().response
            this.setState({
              greeting: response
            })
          })

        this.setState({
          user: firebaseApp.auth().currentUser,
        })
        alert('signed in!')
      }
    })
  }

  signupHandler = async (event) => {
    event.preventDefault()

    let password = event.target.password.value
    let email = event.target.email.value

    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert('signed up')
      })
      .catch((err) => {
        alert(err.message)
      })

    firebaseApp.auth().onAuthStateChanged(async (user) => {

      if (user) {
        await this.state.database.ref('/')
          .once('value')
          .then((snapshot) => {
            let response = snapshot.val().response
            this.setState({
              greeting: response
            })
          })

        this.setState({
          user: firebaseApp.auth().currentUser,
        })
        alert('signed in!')
      }
    })
  }

  logOut = async () => {
    await firebaseApp.auth().signOut()

    this.setState({
      user: firebaseApp.auth().currentUser
    })
    alert('Signed Out')
  }

  googleHandler = async () => {
    googleProvider.addScope('profile');
    googleProvider.addScope('email')

    await firebaseApp.auth().signInWithPopup(googleProvider)
      .then(() => {
        alert('signed in with google')
        this.setState({ user: firebaseApp.auth().currentUser })
      })

    await this.state.database.ref('/')
      .once('value')
      .then((snapshot) => {
        let response = snapshot.val().response
        this.setState({
          greeting: response
        })
      })
  }

  componentDidMount() {
    firebaseApp.auth().signOut()

    if (!this.state.database) {
      this.setState({
        database: database
      })
    }
  }

  modalHandler = () => {
    this.setState({
      modal: true,
    })
  }

  closeHandler = () => {
    this.setState({
      modal: false,
    })
  }



  render() {

    return (
      <div id="app">
        <Header/>
        <Landing modal={this.modalHandler}/>
        {this.state.modal ? <Modal user={this.state.user} greeting={this.state.greeting} closeHandler={this.closeHandler} loginHandler={this.loginHandler} googleHandler={this.googleHandler} logOut={this.logOut} /> : null}
        <div id='header'>
          <div id='dropdown'>

          </div>
        </div>
        <div id="homeImage">
          <div id="logo">
          </div>
          
            <form onSubmit={this.loginHandler}>
              <input type='email' name='email' />
              <input type='password' name='password' />
              <input type='submit' />
            </form>
          
          <div id='buttonWrapper'>
            <div id='signIn'>
            </div>
            <div id='signUp'>
            </div>
            <div id="learnMore">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
