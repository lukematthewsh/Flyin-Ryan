import React from 'react'
import '../Css/modal.css'
import Goog from '../images/googlesvg.png'
import FRFlogo from '../images/flyinLogo.svg'
import { Link } from 'react-router-dom'
import PasswordModal from './PasswordModal'
import { firebaseApp } from '../firebaseApp'

class LogIn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            passwordReset: false
        }
    }

    showModal = (event) => {
        this.setState({
            passwordReset: true
        })
    }

    closeModal = (event) => {
        this.setState({
            passwordReset: false
        })
    }

    passResetHandler = () => {
        let email = document.getElementById('pass-res-email').value

        firebaseApp.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert('Email Sent! Please follow the link in the email to complete password reset.')
        })
        .catch((err) => {
            let errMess = err.message
            alert(errMess)
        })
    }

    render() {
        console.log(firebaseApp.auth().currentUser)
        return (
            <div>
                {!this.state.passwordReset ?
                <div id='modalWrapper'>
                    <Link to={'/'}> <img id="flyin-modal" src={FRFlogo} /> </Link>
                    <h1 className="title">Log In</h1>
                    <form id='sign-in-out' onSubmit={(event) => { event.preventDefault() }}>
                        <div id='modal-form'>
                            <div>
                                <input id="email" className='text-line' type="email" name='email' placeholder='Email' />
                            </div>
                            <div>
                                <input id="password" className='text-line' type='password' name='password' placeholder='Password' />
                            </div>
                        </div>
                        <div id='modal-buttons'>
                            <Link onClick={this.props.loginHandler} to='/dashboard'><button id='signIn-button' type='submit'>Sign In</button></Link>
                            <div onClick={this.showModal}>Forgot Password?</div>
                            <Link id="google-signin" to='/dashboard' onClick={this.props.googleHandler} style={{ textDecoration: 'none' }}><img id="google-img" src={Goog} />Sign in with Google</Link>
                            <Link id="google-signin" to='/dashboard' onClick={this.props.facebookHandler}><img id="google-img" src={Goog} />Sign in with Facebook</Link>
                        </div>
                    </form>
                </div> : <PasswordModal passResetHandler={this.passResetHandler} close={this.closeModal} />}
            </div>
        )
    }
}

export default LogIn