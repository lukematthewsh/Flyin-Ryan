import React from 'react'
import Arrow from '../images/Arrow-down.svg'
import About from './AboutFR'



class Landing extends React.Component {
    render() {
        return (
            <div id="home-page">
                <div id="landing-page">
                    <div id="title">
                        <h1>Core Values Matter</h1>
                        <br></br>
                        <h3>Get Involved!</h3>
                    </div>
                    <div id="button-container">
                        <div id="inner-container">
                            <div id="sign-up-button" onClick={this.props.modalHandler}>Sign Up</div>
                            <div id="sign-in-button" onClick={this.props.modalHandler}>Sign In</div>
                        </div>
                        <div id="arrow">
                            <img id='arrow-img' src={Arrow} alt='bouncing arrow' />
                        </div>
                    </div>
                </div>
            <About/>
            </div>
        )
    }
}

export default Landing