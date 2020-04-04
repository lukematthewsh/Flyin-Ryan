import React from 'react'
import '../Css/modal.css'

class Modal extends React.Component {


    render() {
        if (this.props.modalContent === 'signIn') {
            return (
                <div id='modalWrapper'>
                    <div id='mondal-button' onClick={this.props.closeHandler}>Exit</div>
                    <h1>Please Log In</h1>
                    <form onSubmit={this.props.loginHandler}>
                        <input type="email" name='email' placeholder='Email' />
                        <input type='password' name='password' placeholder='Password' />
                        <input id='signIn-button' type='submit' />
                    </form>
                    <button onClick={this.props.logOut}>Sign Out</button>
                    <button onClick={this.props.googleHandler}>Sign in with google</button>
                </div>
            )
        } else if (this.props.modalContent === 'signUp'){
            return(
                <div id='modalWrapper'>
                    <div id='mondal-button' onClick={this.props.closeHandler}>Exit</div>
                    <h1>Please Sign Up</h1>
                    <form onSubmit={this.props.signupHandler}>
                        <input type="email" name='email' placeholder='Email' />
                        <input type='password' name='password' placeholder='Password' />
                        <input id='signIn-button' type='submit' />
                    </form>
                    <button onClick={this.props.logOut}>Sign Out</button>
                    <button onClick={this.props.googleHandler}>Sign Up with google</button>
                </div>
            )
        }
    }
}

export default Modal