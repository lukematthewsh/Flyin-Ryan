import React from 'react'
import X from "../images/x.png"

class PasswordModal extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <h1>Password Reset
                <button onClick={this.props.close}><img id='close-button' src={X} style={{ maxWidth: "40px" }}></img> </button>
                </h1>
                <div>Please Enter the E-mail with which your account is registered. You will received an email with a link to reset your password. You will then be able to login!</div>
                <form onSubmit={this.props.passResetHandler} >
                    <input id='pass-res-email' type='email' name='email' placeholder='Please Enter Your Email' />
                    <input type='submit' />
                </form>
            </div>
        )
    }
}

export default PasswordModal