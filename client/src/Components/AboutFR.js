import React from 'react'
import ReactPlayer from 'react-player'
import '../Css/AboutFR.css'
import coaster from '../images/frcoaster.png'
class About extends React.Component {

    render() {
        return (
            <div id="about-page">
                <div id="about-text">
                    <h1>Promote Core Values</h1>
                    <br></br>
                    <p>Core Values Matter – These three words are the mantra for the Flyin Ryan Hawks Foundation.</p>
                    <br></br>
                    <p>The 14 Core Principles for Living, as written down by Ryan Hawks before his death, provided him with a compass to guide his decision making, whether in sports, school, relationships or other aspects of daily living.</p>
                    <br></br>
                    <p>People with an established, self-composed set of Core Values have a touchstone, a reference point for making decisions, big and small.</p>
                    <br></br>
                </div>
                <div className='player-wrapper'>
                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=YDM0M69UGQA"
                        className='react-player'
                        width='100%'
                        height='100%'
                    />
                </div>
                <div id = "signup-text">
                    <h2>Take the Flyin Ryan Core Values Challenge</h2>
                    <br></br>
                    <h3>How to get started:</h3>
                    <br></br>
                    <p>Sign up and start filling out your core values!</p>
                    <div id="sign-up-button" onClick={this.props.modalHandler}>Sign Up</div>
                </div>
                <img id="core-values" src={coaster} />


            </div>
        )
    }
}
export default About