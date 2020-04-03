import React from 'react'
import '../Css/modal.css'

class Modal extends React.Component {
    render() {
        return (
            <div id='modalWrapper'>
                <div id='mondal-button' onClick={this.props.closeHandler}>Exit</div>
                <form onSubmit={this.props.loginHandler}>
                    <input type="email" name='email' placeholder='Email' />
                    <input type='password' name='password' placeholder='Password' />
                    <input id='signIn-button' type='submit'/>
                </form>
                <button onClick={this.props.logOut}>Sign Out</button>
                <button onClick={this.props.googleHandler}>Sign in with google</button>
            </div>
        )
    }
}

export default Modal