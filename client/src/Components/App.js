import React from 'react';
import '../Css/App.css';
import Landing from "./Landing.js";
import { firebaseApp, database, googleProvider, facebookProvider } from '../firebaseApp';
import { Switch, Route, Redirect } from 'react-router-dom';
import Signup from './Signup.js';
import Dashboard from './Dashboard';
import Questions from './Questions';
import Login from './Login';
import Admin from './Admin'



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
      .then(async () => {
        await firebaseApp.auth().currentUser.updateProfile({
          displayName: name
        })
      })
      .then(() => {
        firebaseApp.auth().currentUser.sendEmailVerification()
          .then(() => {
            alert("We have sent you a verification email. You must verify your email before you can log in to Flyin' Ryan Core Values!")
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
      user: firebaseApp.auth().currentUser,
      admin: null
    })
    alert('Signed Out')
  }

  facebookHandler = async () => {
    await firebaseApp.auth().signInWithPopup(facebookProvider)
      .then((result) => {
        let token = result.credential.accessToken
        let user = result.user
        console.log(user)
        console.log(token)
        this.setState({
          user: firebaseApp.auth().currentUser
        })
      })
      .catch((err) => {
        let errMess = err.message
        alert(errMess)
      })
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

  async componentDidUpdate() {
    if (firebaseApp.auth().currentUser && !this.state.admin) {
      let isAdmin = await database.ref(`/users/${this.state.user.uid}/Admin`).once('value').then(function (snapshot) {
        return snapshot.val()
      })
      if (isAdmin) {
        this.setState({
          admin: isAdmin
        })
      }
    }
  }


  render() {
    // console.log(this.state.user)
    return (
      <div id='app'>
       <Switch>
          <Route exact path='/' render={() => <Landing user={this.state.user} logOut={this.logOut} admin={this.state.admin}/>} />
          <Route path='/dashboard' render={() => (firebaseApp.auth().currentUser ? <Dashboard user={this.state.user} logOut={this.logOut} admin={this.state.admin} /> : <Redirect to='/login' />)} />
          <Route path='/admin' render={() => (this.state.admin ? <Admin user={this.state.user}/> : <Redirect to='/' />)} />
          <Route path='/questions' render={() => (this.state.user 
            ? <Questions user={this.state.user} /> 
            : <Login modalContent={this.state.modal}
              signupHandler={this.signupHandler}
              closeHandler={this.closeHandler}
              pageUpdate={this.pageUpdate}
              currentPath={this.state.currentPath}
              loginHandler={this.loginHandler}
              googleHandler={this.googleHandler}
              logOut={this.logOut} />)} />
          <Route path='/signup' render={() => (!firebaseApp.auth().currentUser 
            ? <Signup
              facebookHandler={this.facebookHandler}
              modalContent={this.state.modal}
              signupHandler={this.signupHandler}
              closeHandler={this.closeHandler}
              pageUpdate={this.pageUpdate}
              currentPath={this.state.currentPath}
              loginHandler={this.loginHandler}
              googleHandler={this.googleHandler}
              logOut={this.logOut} /> 
            : <Redirect to='/questions' />)} />
          <Route path='/login' render={() => (!firebaseApp.auth().currentUser 
            ? <Login
              facebookHandler={this.facebookHandler}
              modalContent={this.state.modal}
              signupHandler={this.signupHandler}
              closeHandler={this.closeHandler}
              pageUpdate={this.pageUpdate}
              currentPath={this.state.currentPath}
              loginHandler={this.loginHandler}
              googleHandler={this.googleHandler}
              logOut={this.logOut} /> 
            : <Redirect to='/dashboard' />)} />
        </Switch>

        {/* <Admin users={this.state.user}/> */}
      </div>
    )
  }
}

export default App;
