import React from 'react'
import ReactPlayer from 'react-player'
import '../Css/AboutFR.css'
import FRHeadShot from '../images/headshot.jpg'
import snowFace from '../images/snow-face.png'
import fallLine from '../images/fall-line.jpg'
import { Link } from 'react-router-dom'



class About extends React.Component {

    render() {
        return (
            <div id="about-page">
                <div id="about-text">
                    <h1>What are Core Values?</h1>
                    <div id='rasta-border'></div>
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
                        z-index='.1'
                    />
                </div>
                <div id='meet-ryan'>
                    <h2>Meet Ryan Hawks</h2>
                    <div id='rasta-border'></div>
                    <br></br>
                    <p>Ryan Hawks was a dynamic human being, with a passion and love for the mountains and skiing. He lived a fulfilling life, which was dominated by fun, adventure, and determination. Although he lived only 25 short years, he lived every minute of his life.</p>
                    <br></br>
                    <img id='ryan-headshot' src={FRHeadShot} />
                    <br></br>
                    <p>Not long after his death, the following list was discovered on Ryan’s computer. These Core Values reflect the way he lived his life; they were his guiding principles for decision making, relationships and all aspects of his life.</p>
                    <br></br>
                    <p>Ryan’s Core Values statement provided much of the inspiration that drives the mission of the Flyin Ryan Hawks Foundation to help people discover and enumerate their own core values. These are the values by which he lived:</p>
                    <br></br>
                    <br></br>
                    <h2>Ryan's Core Values</h2>
                    <div id='rasta-border'></div>
                    <div id='img-container-fall'>
                        <img id='fall-line' src={fallLine} />
                        <ul>
                            <li>Live every day, all day</li>
                            <li>Never stop exploring life</li>
                            <li>Never lose my adventuresome spirit</li>
                            <li>Be the best friend I can be</li>
                            <li>Be the best brother, son, uncle I can be</li>
                            <li>Play like I am 13</li>
                            <li>Look out for others</li>
                        </ul>
                    </div>
                    <div id='img-container-face'>
                        <ul>
                            <li>Look out for myself</li>
                            <li>Look out for our surroundings</li>
                            <li>Be self-sufficient</li>
                            <li>Don’t be afraid to ask for help</li>
                            <li>Work hard</li>
                            <li>Live easy</li>
                            <li>Live simply</li>
                        </ul>
                        <img id='snow-face' src={snowFace} />
                    </div>
                </div>
                <div id="signup-text">
                    <h2>Take the Flyin Ryan Core Values Challenge</h2>
                    <div id='rasta-border'></div>
                    <br></br>
                    <p>The goal of this application is to make the core values challenge more accesible! If you're interested keep following allong and we will help you get started.</p>
                    <br></br>
                    <p>Sign up bellow and start filling out your core values!</p>
                    <br></br>
                    <p>Once signed up you can return anytime to update your account!</p>
                    <div id='bottom-signup'>
                        <p>Get started:</p>
                        <Link to={'/signup'} ><div id="sign-up-bottom-button" >Sign Up</div> </Link>
                    </div>
                </div>
            </div >
        )
    }
}
export default About