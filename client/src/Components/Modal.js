import React from 'react'
import '../Css/modal.css'
import Goog from '../images/googlesvg.png'
import FRFlogo from '../images/flyinLogo.svg'


class Modal extends React.Component {

    render() {
        if (this.props.modalContent === 'signIn') {
            return (
                <div id='modalWrapper'>
                    <img id="flyin-modal" src={FRFlogo} onClick={this.props.closeHandler} />
                    <h1 className="title">Log In</h1>
                    <form id='sign-in-out' onSubmit={this.props.loginHandler}>
                        <div id='modal-form'>
                            <div>
                                <input className='text-line' type="email" name='email' placeholder='Email' />
                            </div>
                            <div>
                                <input className='text-line' type='password' name='password' placeholder='Password' />
                            </div>
                        </div>
                        <div id='modal-buttons'>
                            <input id='signIn-button' type='submit' />
                            <div id="google-signin" onClick={this.props.googleHandler}><img id="google-img" src={Goog} />Sign in with Google</div>
                        </div>
                    </form>
                </div>
            )
        } else if (this.props.modalContent === 'signUp') {
            return (
                <div id='modalWrapper'>
                    <img id="flyin-modal" src={FRFlogo} onClick={this.props.closeHandler} />
                    <h1 className='title'>Sign Up</h1>
                
                    <form id='sign-in-out' onSubmit={this.props.signupHandler}>
                        <div id="modal-form">
                            <div>
                                <input className='text-line' type='text' name='firstName' placeholder='Full Name'></input>
                            </div>
                            <div>
                                <input className='text-line' type="email" name='email' placeholder='Email' />
                            </div>
                            <div>
                                <input className='text-line' type='password' name='password' placeholder='Password' />
                            </div>
                        </div>
                        <div id='modal-buttons'>
                            <input id='signIn-button' type='submit' />
                            <div id="google-signin" onClick={this.props.googleHandler}><img id="google-img" src={Goog} />Sign up with Google</div>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

export default Modal