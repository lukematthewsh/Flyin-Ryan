import React from 'react'
import ReactPlayer from 'react-player'
import '../Css/AboutFR.css'
import coaster from '../images/frcoaster.png'
class About extends React.Component {

    render() {
        return (
            <div id="about-page">
                <h1>Promote Core Values</h1>
                <h2>Core Values Matter</h2>
                <p>Core Values Matter – These three words are the mantra for the Flyin Ryan Hawks Foundation.</p>
                <img id = "core-values" src = {coaster}/>
                <div className='player-wrapper'>
                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=YDM0M69UGQA"
                        className='react-player'
                        width='100%'
                        height='100%'
                     />
                </div>


            </div>
        )
    }
}
export default About