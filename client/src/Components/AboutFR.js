import React from 'react'
import ReactPlayer from 'react-player'
import '../Css/AboutFR.css'
import FRHeadShot from '../images/headshot.jpg'
import snowFace from '../images/snow-face.png'
import fallLine from '../images/fall-line.jpg'
import { Link } from 'react-router-dom'
import coaster from '../images/coaster.png'
import { whitesmoke } from 'color-name';
import { FacebookShareButton } from "react-share"
import facebook from '../images/facebook.png'

class About extends React.Component {

    render() {
        return (
            <div id="full-page">
                <div id='page-wrapper'></div>

                <div id="about-page">
                    <div id="about-text">
                        <h2>What are Core Values?</h2>
                        <div id='rasta-border'></div>
                        <br></br>
                        <p>Before his death in 2011 in a Freeride World Tour event, “Flyin” Ryan Hawks wrote his 14 Core Principles for Living.
                    </p>
                        <br></br>
                        <p>These Core Values gave him a compass that guided his decision making in sports, in school, in relationships and in his daily life.
                    </p>
                        <br></br>
                        <p>People with an established set of self-composed Core Values have a reference point for making decisions, big and small.
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
                        <div id='img-container-coaster'>
                            <img id='coaster-img' src={coaster} />
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
                        {this.props.user ? null :
                            <div>
                                <br></br>
                                <p>Sign up below to begin!</p>
                                <br></br>
                            </div>
                        }


                        <div id="social-media-container">

                            <div id='bottom-signup'>
                                <FacebookShareButton style={{ textDecoration: 'none' }} url={'https://flyinryanchallenge.herokuapp.com/'} ><div id="fb-share-button" >
                                    <svg viewBox="0 0 12 12" preserveAspectRatio="xMidYMid meet">
                                        <path class="svg-icon-path" d="M9.1,0.1V2H8C7.6,2,7.3,2.1,7.1,2.3C7,2.4,6.9,2.7,6.9,3v1.4H9L8.8,6.5H6.9V12H4.7V6.5H2.9V4.4h1.8V2.8 c0-0.9,0.3-1.6,0.7-2.1C6,0.2,6.6,0,7.5,0C8.2,0,8.7,0,9.1,0.1z"></path>
                                    </svg>
                                    <span>Share</span>
                                </div>
                                </FacebookShareButton>
                            </div>
                            {this.props.user ? null :
                                <div id='bottom-signup'>
                                    <Link style={{ textDecoration: 'none' }} to={'/signup'} ><div id="sign-up-bottom-button" >Sign Up</div> </Link>
                                </div>
                            }

                        </div>

                    </div>
                </div >
                <div id='page-wrapper-right'></div>
            </div>
        )
    }
}
export default About