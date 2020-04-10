import React from 'react';
import '../Css/App.css';
import Landing from "./Landing.js"
import { firebaseApp, database, googleProvider } from '../firebaseApp'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import Modal from './Modal.js'
import Dashboard from './Dashboard'
import Questions from './Questions';



class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      database: null,
      modal: null,
      currentPath: undefined,
    }
  }

  pageUpdate = () => {
    if(this.state.currentPath !== window.location.pathname) {
      if(window.location.pathname === "/") {
        this.setState({
          currentPath: window.location.pathname
        })
      } else if(window.location.pathname === "/signup") {
        this.setState({
          currentPath: window.location.pathname,
          modal: "signup"
        })
      }
    }
  }


  loginHandler = async (event) => {
    

    let password = document.getElementById('password').value
    let email = document.getElementById('email').value


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

    let password = document.getElementById('up-password').value
    let email = document.getElementById('up-email').value

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
          modal: false
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
    if (event.target.id === 'sign-up-button' || event.target.id === 'sign-up-bottom-button') {
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
      <div id='app'>
        {this.state.modal ? null : <Header user={this.state.user} newUser={this.state.newUser} logOut={this.logOut} />}
        <Switch>
          <Route exact path='/' render={() => <Landing modalHandler={this.modalHandler} />} />
          <Route path='/dashboard' render={() => <Dashboard user={this.state.user} />} />
          <Route path='/questions' render={() => <Questions user={this.state.newUser} />} />
          <Route path='/signup' render={() => <Modal 
          modalContent={this.state.modal} 
          signupHandler={this.signupHandler} 
          closeHandler={this.closeHandler} 
          pageUpdate={this.pageUpdate} 
          currentPath={this.state.currentPath} 
          loginHandler={this.loginHandler} 
          googleHandler={this.googleHandler} 
          logOut={this.logOut} />} />
        </Switch>
      </div>
    )
  }
}

export default App;
