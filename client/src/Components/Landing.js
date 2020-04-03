import React from 'react'
import FRFlogo from '../images/flyinLogo.svg'
import Arrow from '../images/Arrow-down.svg'


class Landing extends React.Component {
    render() {
        return (
            
            <div id="landing-page">
                <div id="title">
                <h1>Core Values Matter</h1>
                <br></br>
                <h3>Get Involved!</h3>
                </div>
                <div id="button-container">
                    <div id="inner-container">
                        <div id="sign-up-button">Sign Up</div>
                        <div id="sign-in-button">Sign In</div>
                    </div>
                    <div id="arrow"><img id='arrow-img' src={Arrow} alt='bouncing arrow' /></div>
                </div>
            </div>
        )
    }
}

export default Landing