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
      modal: null
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

  modalHandler = (event) => {
    if(event.target.id === 'sign-up-button'){
      console.log('you clicked on the sign up button')
      this.setState({
        modal: 'signUp'
      })
    } else if (event.target.id === 'sign-in-button'){
      console.log('you clicked on the sign in button')
      this.setState({
        modal: 'signIn'
      })
    }
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
        <Landing modalHandler={this.modalHandler}/>
        {this.state.modal ? <Modal signupHandler={this.signupHandler} modalContent={this.state.modal} closeHandler={this.closeHandler} loginHandler={this.loginHandler} googleHandler={this.googleHandler} logOut={this.logOut} /> : null}
        <div id='header'>
          <div id='dropdown'>

          </div>
        </div>
        <div id="homeImage">
          <div id="logo">
          </div>
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
