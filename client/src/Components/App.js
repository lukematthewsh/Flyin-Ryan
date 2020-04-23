import { firebaseApp, database, googleProvider, facebookProvider } from '../firebaseApp';
import { Switch, Route, Redirect } from 'react-router-dom';
import dbFetch from './QuestionsData'
import Questions from './Questions';
import Dashboard from './Dashboard';
import Landing from "./Landing.js";
import Signup from './Signup.js';
import Holding from './Holding'
import Contact from './Contact'
import Login from './Login';
import Admin from './Admin'
import React from 'react';
import '../Css/App.css';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      database: null,
      currentPath: undefined,
      dbInfo: null,
      verSent: false,
    }
  }

  async componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: firebaseApp.auth().currentUser
        });
      }
    });

    let dbInfo = await dbFetch()

    if (!this.state.database) {
      this.setState({
        database: database,
        questions: dbInfo
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

  loginHandler = async () => {


    let password = document.getElementById('password').value
    let email = document.getElementById('email').value


    firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(function (err) {
      let message = err.message
      alert(message)
    })

    firebaseApp.auth().onAuthStateChanged(async (user) => {

      if (user && user.emailVerified) {
        this.setState({
          user: firebaseApp.auth().currentUser,
          modal: false
        })
      } else {
        await firebaseApp.auth().signOut()
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
  }

  signupHandler = async (event) => {

    let password = document.getElementById('up-password').value
    let email = document.getElementById('up-email').value
    let name = document.getElementById('up-name').value

    let actionCodeSettings = {
      url: 'https://flyinryanchallenge.herokuapp.com/login'
    }

    await firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .then(async () => {
        let userName = {}
        userName[`/users/${firebaseApp.auth().currentUser.uid}/Name`] = { Name: name }

        await database.ref().update(userName)
        console.log(userName)
        console.log(firebaseApp.auth().currentUser.uid)

      })
      .then(async () => {
        await firebaseApp.auth().currentUser.updateProfile({
          displayName: name
        })
      })
      .then(async () => {
        await firebaseApp.auth().currentUser.sendEmailVerification(actionCodeSettings)
          .then(() => {
            this.setState({
              verSent: true
            })
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

      })



    firebaseApp.auth().onAuthStateChanged(async (user) => {

      if (user && user.emailVerified) {

        this.setState({
          user: firebaseApp.auth().currentUser,
        })
      } else {
        
        await firebaseApp.auth().signOut()

      }
    })
  }

  facebookHandler = async () => {
    await firebaseApp.auth().signInWithPopup(facebookProvider)
      .then(async () => {
        let userName = {}
        let name = firebaseApp.auth().currentUser.displayName
        userName[`/users/${firebaseApp.auth().currentUser.uid}/Name`] = { Name: name }

        await database.ref().update(userName)

      })
      .then(() => {
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
      .then(async () => {
        let userName = {}
        let name = firebaseApp.auth().currentUser.displayName
        userName[`/users/${firebaseApp.auth().currentUser.uid}/Name`] = { Name: name }

        await database.ref().update(userName)

      })
      .then(() => {
        this.setState({ user: firebaseApp.auth().currentUser, modal: false })
      })
  }

  render() {
    return (
      <div id='app'>
        <Switch>
          <Route exact path='/' render={() => <Landing user={this.state.user} logOut={this.logOut} admin={this.state.admin} />} />
          <Route path='/dashboard' render={() => (firebaseApp.auth().currentUser ? <Dashboard user={this.state.user} logOut={this.logOut} admin={this.state.admin} /> : <Redirect to='/login' />)} />
          <Route path='/admin' render={() => (this.state.admin ? <Admin user={this.state.user} /> : <Redirect to='/' />)} />
          <Route path='/questions' render={() => (this.state.user
            ? <Questions user={this.state.user} data={this.state.questions} />
            : <Redirect to='/signup' />)} />
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
          <Route path='/Contact' render={() => <Contact user={this.state.user} admin={this.state.admin} />} />
          <Route path='/verify' render={() => <Holding user={this.state.user} />} />
        </Switch>

        {/* <Admin users={this.state.user}/> */}
      </div>
    )
  }
}

export default App;
