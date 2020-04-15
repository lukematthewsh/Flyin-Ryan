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
                    <p>“Before his death in 2011 in a Freeride World Tour event, “Flyin” Ryan Hawks wrote his 14 Core Principles for Living.
                    </p>
                    <br></br>
                    <p>These Core Values gave him a compass that guided his decision making in sports, in school, in relationships and in his daily life.
                    </p>
                    <br></br>
                    <p>People with an established set of self-composed Core Values have a reference point for making decisions, big and small.”
                    </p>
                    <br></br>
                    <br></br>

                </div>
                <div className='player-wrapper'>
                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=xTkeYOcdz0g"
                        className='react-player'
                        width='100%'
                        height='100%'
                        z-index='.1'
                    />
                </div>
                <br></br>
                <div id='meet-ryan'>
                    <h2>Meet Ryan Hawks</h2>
                    <div id='rasta-border'></div>
                    <br></br>
                    <p>Ryan Hawks was a dynamic human being, with a passion and love for the mountains and skiing. He lived a fulfilling life, dominated by fun, adventure, and determination. Although he lived only 25 short years, he lived every minute of his life.</p>
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
                    <br></br>
                    <br></br>
                    <div className='player-wrapper'>
                        <ReactPlayer
                            url="https://www.youtube.com/watch?v=YDM0M69UGQA"
                            className='react-player'
                            width='100%'
                            height='100%'
                            z-index='.1'
                        />
                    </div>
                    <br></br>
                    <br></br>
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
                    <p>Through this app, we will help you learn more about yourself and create your own personal set of Core Values.</p>
                    <br></br>
                    <p>Getting started is easy. You can work at your own pace, returning as often as you like to make updates.</p>
                    <br></br>
                    <p>There is no time limit or right speed for discovering the things that are important to you, that
                    help define you. As you grow and learn more about yourself, you can return here to update and reflect on the work you’ve done.</p>
                    <br></br>
                    <p>Sign up below to begin!</p>
                    <br></br>
                    <div id='bottom-signup'>
                        <Link style={{ textDecoration: 'none' }} to={'/signup'} ><div id="sign-up-bottom-button" >Sign Up</div> </Link>
                    </div>
                </div>
            </div >
        )
    }
}
export default About