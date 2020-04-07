import React from 'react';
import '../Css/App.css';
import Landing from "./Landing.js"
import { firebaseApp, database, googleProvider } from '../firebaseApp'
import Header from './Header'
import Modal from './Modal.js'
import Dashboard from './Dashboard'
import Questions from './Questions';



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
        this.setState({
          user: firebaseApp.auth().currentUser,
          modal: false
        })
      }
    })
  }

  signupHandler = async (event) => {
    event.preventDefault()

    let password = event.target.password.value
    let email = event.target.email.value

    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
      })
      .catch((error) => {
        let errorCode = error.code
        let errorMessage = error.message
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      })


    firebaseApp.auth().onAuthStateChanged(async (user) => {

      if (user) {
        this.setState({
          newUser: firebaseApp.auth().currentUser,
        })
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
        this.setState({ user: firebaseApp.auth().currentUser, modal: false })
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
          <Dashboard user={this.state.user} />
          : this.state.newUser ?
            <Questions />
            : <Landing modalHandler={this.modalHandler} />}
        {this.state.modal ? <Modal signupHandler={this.signupHandler} modalContent={this.state.modal} closeHandler={this.closeHandler} loginHandler={this.loginHandler} googleHandler={this.googleHandler} logOut={this.logOut} /> : null}
      </div>
    )
  }
}

export default App;
