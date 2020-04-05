import React from 'react'
import '../Css/modal.css'
import Goog from '../images/googlesvg.png'
class Modal extends React.Component {

    render() {
        if (this.props.modalContent === 'signIn') {
            return (
                <div id='modalWrapper'>

                    <h1 className="title">Log In</h1>

                    <p>Welcome back! Login to access the Flyin Ryan App!</p>
                    <div id="google-signin" onClick={this.props.googleHandler}><img id="google-img" src={Goog} />Sign in with Google</div>
                    <p>- Or -</p>
                    <form id='sign-in-out' onSubmit={this.props.loginHandler}>
                        <p>Email:</p>
                        <input type="email" name='email' placeholder='Email' />
                        <p>Password:</p>
                        <input type='password' name='password' placeholder='Password' />
                        <input id='signIn-button' type='submit' />
                    </form>
                    <div id='modal-button' onClick={this.props.closeHandler}>Exit</div>
                </div>
            )
        } else if (this.props.modalContent === 'signUp') {
            return (
                <div id='modalWrapper'>

                    <h1 className='title'>Sign Up</h1>

                    <p>Welcome! Sign up to access the Flyin Ryan App!</p>

                    <div id="google-signin" onClick={this.props.googleHandler}><img id="google-img" src={Goog} />Sign up with Google</div>
                    <p>- Or -</p>
                    <form id='sign-in-out' onSubmit={this.props.signupHandler}>
                        <p>Email:</p>
                        <input type="email" name='email' placeholder='Email' />
                        <p>Password:</p>
                        <input type='password' name='password' placeholder='Password' />
                        <input id='signIn-button' type='submit' />
                    </form>
                    <div id='modal-button' onClick={this.props.closeHandler}>Exit</div>
                </div>
            )
        }
    }
}

export default Modal