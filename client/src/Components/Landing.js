import React from 'react'
import Arrow from '../images/Arrow-down.svg'
import About from './AboutFR'
import Header from './Header'
import Signup from '../images/signup-icon.png'
import Usericon from '../images/user-icon.png'
import facebook from '../images/facebook.png'
import { Link } from 'react-router-dom'
import { FacebookShareButton } from "react-share"


class Landing extends React.Component {
    render() {
        return (
            <div id="home-page">
                <Header user={this.props.user} logOut={this.props.logOut} admin={this.props.admin} />
                <div id="landing-page">
                    <div id="title">
                        <h1>Core Values Matter</h1>
                        <br></br>
                        <h3>Take the Challenge!</h3>
                    </div>
                    {this.props.user
                        ? null
                        : <div id="button-container">
                            <div id="inner-container">

                                <div id='signup-butt-container'>
                                    <Link id='sign-up-link' style={{ textDecoration: 'none' }} to={'/signup'}>
                                        <div id='signup-box-wrapper'>
                                            <div id='signup-box'><img id='signup-icon' src={Signup} alt='sign up icon' /></div>
                                            <div id="sign-up-landing-button"> Sign Up</div>
                                        </div>
                                    </Link>
                                </div>

                                <div id='login-butt-container'>
                                    <Link id='sign-in-link' style={{ textDecoration: 'none' }} to={'/login'} >
                                        <div id='login-box-wrapper'>
                                            <div id='login-box'><img id='user-icon' src={Usericon} alt="user icon" /></div>
                                            <div id="sign-in-landing-button">Sign In</div>
                                        </div>
                                    </Link>

                                </div>

                            </div>
                            <div id="arrow">
                                <img id='arrow-img' src={Arrow} alt='bouncing arrow' />
                            </div>
                        </div>
                    }
                </div>
                <About user={this.props.user} />
            </div>
        )
    }
}

export default Landing