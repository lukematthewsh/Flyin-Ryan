import React from 'react'
import Arrow from '../images/Arrow-down.svg'
import About from './AboutFR'
import Signup from '../images/signup-icon.png'
import Usericon from '../images/user-icon.png'
import { Link } from 'react-router-dom'



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
                        
                            <div id='signup-butt-container'>
                            <Link onClick={this.props.modalHandler} to={'/signup'} >
                                <div id='signup-box'><img id='signup-icon' src={Signup} alt='sign up icon' /></div>
                                <h2 id="sign-up-button"> Sign Up</h2></Link>
                            </div>
                            <div id='login-butt-container'>
                            <div id='login-box'><img id='user-icon' src={Usericon} /></div>
                                <Link id="sign-in-button" onClick={this.props.modalHandler} to={'/signup'} >Sign In</Link>
                            </div>
                        </div>
                        <div id="arrow">
                            <img id='arrow-img' src={Arrow} alt='bouncing arrow' />
                        </div>
                    </div>
                </div>
                <About modalHandler={this.props.modalHandler} />
            </div>
        )
    }
}

export default Landing