import React from 'react'
import '../Css/modal.css'
import Goog from '../images/googlesvg.png'
import FRFlogo from '../images/flyinLogo.svg'
import { Link } from 'react-router-dom'
import facebook from '../images/facebook.png'
import lock from '../images/lock.svg'
import PasswordModal from './PasswordModal'
import { firebaseApp } from '../firebaseApp'

class LogIn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false
        }
    }

    openReset = (e) => {
        this.setState({
            show: !this.state.show
        })
    }
    closeReset = (e) => {
        this.setState({
            show: !this.state.show
        })
    }

    passResetHandler = (event) => {
        event.preventDefault()
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

        return (
            <div>
                <div id='modalWrapper'>
                    <PasswordModal show={this.state.show} closeReset={this.closeReset} passResetHandler={this.passResetHandler} />
                    <Link to={'/'}> <img id="flyin-modal" src={FRFlogo} /> </Link>
                    <div>
                        <h1 className="title">Log In</h1>
                        <div id='title-underline'></div>
                    </div>
                    <form id='sign-in-out' onSubmit={(event) => { event.preventDefault() }}>
                        <div id='modal-form'>
                            <div>
                                <input id="email" className='text-line' type="email" name='email' placeholder='Email' />
                                <div id='text-line-underline'></div>
                            </div>
                            <div>
                                <input id="password" className='text-line' type='password' name='password' placeholder='Password' />
                                <div id='text-line-underline'></div>
                            </div>
                        </div>
                        <div id='modal-buttons'>
                            <Link onClick={this.props.loginHandler} to='/dashboard' style={{ textDecoration: 'none' }}><div id='signIn-button' type='submit'>Sign In</div></Link>
                            <Link to='/dashboard' onClick={this.props.googleHandler} style={{ textDecoration: 'none' }}><div id="google-signin" ><img id="google-img" src={Goog} /> Sign in with Google</div></Link>
                            <Link to='/dashboard' onClick={this.props.facebookHandler} style={{ textDecoration: 'none' }}><div id="facebook-signin"><img id="facebook-img" src={facebook} />Sign in with Facebook</div></Link>
                            <div id="forgot-password" onClick={this.openReset}><img src={lock} style={{ maxWidth: "15px" }} /> Forgot Password?</div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default LogIn