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
      user: firebaseApp.auth().currentUser,
      database: null,
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
         user: firebaseApp.auth().currentUser,
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
    return (
      <div id='app'>
        {/* <Switch>
          <Route exact path='/' render={() => <Landing user={this.state.user} logOut={this.logOut} />} />
          <Route path='/dashboard' render={() => (firebaseApp.auth().currentUser ? <Dashboard user={this.state.user} logOut={this.logOut}/> : <Redirect to='/login' />)} />
          <Route path='/questions' render={() => (firebaseApp.auth().currentUser ? <Questions user={this.state.user} /> : <Redirect to='/signup' />)} />
          <Route path='/signup' render={() => (!firebaseApp.auth().currentUser ?  <Signup 
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
        </Switch> */}
        
        <Questions />

      </div>
    )
  }
}

export default App;
