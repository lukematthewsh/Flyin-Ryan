import React from 'react';
import '../Css/App.css';
import Landing from "./Landing.js";
import { firebaseApp, database, googleProvider } from '../firebaseApp';
import { Switch, Route, Redirect } from 'react-router-dom';
import Signup from './Signup.js';
import Dashboard from './Dashboard';
import Questions from './Questions';
import Login from './Login';



class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      database: null,
      currentPath: undefined,
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
    let name = document.getElementById('up-name').value

    await firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebaseApp.auth().currentUser.sendEmailVerification()
          .then(() => {
            alert('Email Sent!')
            console.log(firebaseApp.auth().currentUser)
          })
          .catch((err) => {
            let errMess = err.message
            alert(errMess)
          })
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

    await firebaseApp.auth().currentUser.updateProfile({
      displayName: name
    })

    firebaseApp.auth().onAuthStateChanged(async (user) => {

      if (user && user.emailVerified) {
        this.setState({
          user: firebaseApp.auth().currentUser,
        })
      } else {
        firebaseApp.auth().signOut()
        this.setState({
          user: null
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
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: firebaseApp.auth().currentUser
        });
      }
    });

    if (!this.state.database) {
      this.setState({
        database: database
      })
    }
  }


  render() {
    console.log(this.state.user)
    return (
      <div id='app'>
        <Switch>
          <Route exact path='/' render={() => <Landing user={this.state.user} logOut={this.logOut} />} />
          <Route path='/dashboard' render={() => (firebaseApp.auth().currentUser ? <Dashboard user={this.state.user} logOut={this.logOut} /> : <Redirect to='/login' />)} />
          <Route path='/questions' render={() => (this.state.user ? <Questions user={this.state.user} /> : <Login modalContent={this.state.modal}
            signupHandler={this.signupHandler}
            closeHandler={this.closeHandler}
            pageUpdate={this.pageUpdate}
            currentPath={this.state.currentPath}
            loginHandler={this.loginHandler}
            googleHandler={this.googleHandler}
            logOut={this.logOut} />)} />
          <Route path='/signup' render={() => (!firebaseApp.auth().currentUser ? <Signup
            modalContent={this.state.modal}
            signupHandler={this.signupHandler}
            closeHandler={this.closeHandler}
            pageUpdate={this.pageUpdate}
            currentPath={this.state.currentPath}
            loginHandler={this.loginHandler}
            googleHandler={this.googleHandler}
            logOut={this.logOut} /> : <Redirect to='/questions' />)} />
          <Route path='/login' render={() => (!firebaseApp.auth().currentUser ? <Login
            modalContent={this.state.modal}
            signupHandler={this.signupHandler}
            closeHandler={this.closeHandler}
            pageUpdate={this.pageUpdate}
            currentPath={this.state.currentPath}
            loginHandler={this.loginHandler}
            googleHandler={this.googleHandler}
            logOut={this.logOut} /> : <Redirect to='/dashboard' />)} />
        </Switch>

        {/* <Questions /> */}

      </div>
    )
  }
}

export default App;
