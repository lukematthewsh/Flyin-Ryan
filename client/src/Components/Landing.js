import React from 'react'
import Arrow from '../images/Arrow-down.svg'
import About from './AboutFR'
import Header from './Header'
import Signup from '../images/signup-icon.png'
import Usericon from '../images/user-icon.png'
import { Link } from 'react-router-dom'



class Landing extends React.Component {
    render() {
        return (
            <div id="home-page">
                <Header user={this.props.user} newUser={this.props.newUser} logOut={this.logOut} />
                <div id="landing-page">
                    <div id="title">
                        <h1>Core Values Matter</h1>
                        <br></br>
                        <h3>Get Involved!</h3>
                    </div>
                    <div id="button-container">
                        <div id="inner-container">

                            <div id='signup-butt-container'>
                                <Link to={'/signup'} >
                                    <div id='signup-box-wrapper'>
                                        <div id='signup-box'><img id='signup-icon' src={Signup} alt='sign up icon' /></div>
                                        <h2 id="sign-up-button"> Sign Up</h2>
                                    </div>
                                </Link>
                            </div>

                            <div id='login-butt-container'>
                                <Link to={'/login'} >
                                    <div id='login-box-wrapper'>
                                        <div id='login-box'><img id='user-icon' src={Usericon} /></div>
                                        <div id="sign-in-button">Sign In</div>
                                    </div>
                                </Link>

                            </div>
                        </div>
                        <div id="arrow">
                            <img id='arrow-img' src={Arrow} alt='bouncing arrow' />
                        </div>
                    </div>
                </div>
                <About />
            </div>
        )
    }
}

export default Landing