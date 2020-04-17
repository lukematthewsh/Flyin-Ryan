import React from 'react'
import '../Css/modal.css'
import Goog from '../images/googlesvg.png'
import FRFlogo from '../images/flyinLogo.svg'
import { Link } from 'react-router-dom'
import facebook from '../images/facebook.png'

import { firebaseApp } from '../firebaseApp'

class LogIn extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(firebaseApp.auth().currentUser)
        return (
            <div id='modalWrapper'>
                <Link to={'/'}> <img id="flyin-modal" src={FRFlogo} /> </Link>
                <div>
                <h1 className="title">Log In</h1>
                <div id = 'title-underline'></div>
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
                        <Link onClick={this.props.loginHandler} to='/dashboard'><button id='signIn-button' type='submit'>Sign In</button></Link>
                        <Link id="google-signin" to='/dashboard' onClick={this.props.googleHandler} style={{ textDecoration: 'none' }}><img id="google-img" src={Goog} />Sign in with Google</Link>
                        <Link id="facebook-signin" to='/dashboard' onClick={this.props.facebookHandler}style={{ textDecoration: 'none' }}><img id="facebook-img" src={facebook}/>Sign in with Facebook</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default LogIn