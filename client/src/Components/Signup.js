import React from 'react'
import '../Css/modal.css'
import Goog from '../images/googlesvg.png'
import FRFlogo from '../images/flyinLogo.svg'
import { Link } from 'react-router-dom'

import { firebaseApp } from '../firebaseApp'

class Signup extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
            return (
                <div id='modalWrapper'>
                    <Link  to = {'/'}> <img id="flyin-modal" src={FRFlogo}/></Link>
                    <h1 className='title'>Sign Up</h1>
                    <form id='sign-in-out' onSubmit={(event) => {event.preventDefault()}}>
                        <div id="modal-form">
                            <div>
                                <input id='up-name' className='text-line' type='text' name='firstName' placeholder='Full Name'></input>
                            </div>
                            <div>
                                <input id='up-email' className='text-line' type="email" name='email' placeholder='Email' />
                            </div>
                            <div>
                                <input id='up-password' className='text-line' type='password' name='password' placeholder='Password' />
                            </div>
                        </div>
                        <div id='modal-buttons'>
                            <Link onClick={this.props.signupHandler} to={'/questions'}><button id='signIn-button' type='submit'>Sign Up</button></Link>
                            <Link id="google-signin" to={'/questions'} onClick={this.props.googleHandler}><img id="google-img" src={Goog} />Sign up with Google</Link>
                        </div>
                    </form>
                </div>
            )
    }
}

export default Signup