import React from 'react';
import '../Css/Contact.css';
import Header from './Header';
import Mailer from './Mailer.js';
import TwitterIcon from '../Icons/twitter.png';
import FaceIcon from '../Icons/facebook.png';
import InstaIcon from '../Icons/instagram.png';

class Contact extends React.Component {

    render() {
        return (
            <div id="contact-page">
                <Header />
                <div id="contact-newsletter">
                    <h2 id="subscribe">Subscribe!</h2>
                    <div id='rasta-border'></div>
                    <Mailer />
                </div>
                <br></br>
                <div id="contact-contact">
                    <h2>Contact</h2>
                    <div id='rasta-border'></div>
                    <br></br>
                    <p>info@flyinryanhawks.org</p>
                    <br></br>
                    <p>1(802)391-0759</p>
                </div>
                <br></br>
                <div id="contact-connect">
                    <h2>Connect</h2>
                    <div id='rasta-border'></div>
                    <div id="contact-social-media">
                    <div className='icon'>
                        <a href="https://www.instagram.com/flyinryanhawks/">
                            <img className='logo-blip' src={InstaIcon} alt="instagram" /></a>
                    </div>
                    <div className='icon'>
                        <a href="https://www.facebook.com/flyinryanhawks/">
                            <img className='logo-blip' src={FaceIcon} alt="facebook" /></a>
                    </div>
                    <div className='icon'>
                        <a href="https://twitter.com/flyinryanhawks/">
                            <img className='logo-blip' src={TwitterIcon} alt="twitter" /></a>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact