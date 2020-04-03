import React from 'react'
import FRFlogo from '../images/flyinLogo.svg'
import Arrow from '../images/Arrow-down.svg'

class Landing extends React.Component {
    render() {
        return (
            <div id="landing-page">
                <div id="flyin-logo"><img id='flying-img' src={FRFlogo} alt="Flyin Ryan Logo" />
                <br></br>
               
                </div>
                <div id="button-container">
                    <div id="inner-container">
                        <div id="sign-up-button" onClick={this.props.modal}>Sign Up</div>
                        <div id="sign-in-button" onClick={this.props.modal}>Sign In</div>
                    </div>
                    <div id="arrow"><img id='arrow-img' src={Arrow} alt='bouncing arrow' /></div>
                </div>
            </div>
        )
    }
}

export default Landing