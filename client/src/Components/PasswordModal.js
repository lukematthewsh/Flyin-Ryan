import React from 'react'
import X from "../images/x.png"
import "../Css/PasswordModal.css"



class PasswordModal extends React.Component {
    constructor(props) {
        super(props)

    }
    

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div id='password-modal-content'>
                
                    <div id="reset-title">
                        Password Reset
                        <div onClick={this.props.closeReset}><img id='close-button' src={X} style={{ maxWidth: "40px" }}></img>
                        </div>
                </div>

                <div id = 'reset-message'>Please Enter the E-mail with which your account is registered. You will receive an email with a link to reset your password.</div>
                <form id = 'reset-form' onSubmit={this.props.passResetHandler} >
                    <input id='pass-res-email' className = "reset-text-line" type='email' name='email' placeholder='Email' />
                    <input id ="reset-submit" type='submit' />
                </form>
            </div>
        )
    }
}

export default PasswordModal