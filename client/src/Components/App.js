import React from 'react';
import '../Css/App.css';
import Landing from "./Landing.js"
import { firebaseApp, database, googleProvider } from '../firebaseApp'
import Header from './Header'
import Modal from './Modal.js'
import Dashboard from './Dashboard'
import Questions from './Questions';
import About from './AboutFR'

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
          modal: false
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
          newUser: firebaseApp.auth().currentUser,
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
        this.setState({ user: firebaseApp.auth().currentUser, modal: false })
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
    if (event.target.id === 'sign-up-button') {
      console.log('you clicked on the sign up button')
      this.setState({
        modal: 'signUp'
      })
    } else if (event.target.id === 'sign-in-button') {
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
        <Header user={this.state.user} logOut={this.logOut} />
        {this.state.user ?
          <Dashboard name={this.state.user.displayName} email={this.state.user.email} />
          : this.state.newUser ?
            <Questions />
            : <Landing modalHandler={this.modalHandler} />}
        {this.state.modal ? <Modal signupHandler={this.signupHandler} modalContent={this.state.modal} closeHandler={this.closeHandler} loginHandler={this.loginHandler} googleHandler={this.googleHandler} logOut={this.logOut} /> : null}
        <About/>
      </div>
    )
  }
}

export default App;
