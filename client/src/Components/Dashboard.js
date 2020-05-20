import React from "react"
import '../Css/Dashboard.css'
import CoreValues from './CoreValues.js'
import Goals from './Goals.js'
import Header from './Header'
import Feed from './Feed'
import classnames from 'classnames'
import MoreValues from './MoreValues.js'
import { Link } from 'react-router-dom'
import User from '../images/user-icon.png'


class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            user: this.props.user,
            isCV: true,
            isG: false,
            isM: false,
            CVbutt: {
                active: true,
            },
            Vbutt: {
                active: false,
            },
            Mbutt: {
                active: false,
            },
        }
    }

    componentDidUpdate() {
        if (this.state.user !== this.props.user) {
            this.setState({
                user: this.props.user
            })
        }
    }


    toggleContent = (event) => {


        if (event.target.id === "g-link") {
            this.setState({
                isG: true,
                isCV: false,
                isM: false,
            })
            this.setState(prevState => ({ Vbutt: { active: !prevState.Vbutt.active } }))
            this.setState({
                CVbutt: {
                    active: false,
                },
                Mbutt: {
                    active: false,
                }

            })
        } else if (event.target.id === "cv-link") {
            this.setState({
                isCV: true,
                isG: false,
                isM: false,
            })
            this.setState(prevState => ({ CVbutt: { active: !prevState.CVbutt.active } }))
            this.setState({
                Vbutt: {
                    active: false,
                },
                Mbutt: {
                    active: false,
                }
            })
        } else if (event.target.id === "more-link") {
            this.setState({
                isM: true,
                isG: false,
                isCV: false
            })
            this.setState(prevState => ({ Mbutt: { active: !prevState.Mbutt.active } }))
            this.setState({
                Vbutt: {
                    active: false,
                },
                CVbutt: {
                    active: false,
                }

            })
        }
    }
    // Hiit

    render() {
        let CVclasses = classnames('cv-button', { 'cv-button-active': this.state.CVbutt.active });
        let Vclasses = classnames('v-button', { 'v-button-active': this.state.Vbutt.active });
        let Mclasses = classnames('m-button', { 'm-button-active': this.state.Mbutt.active })
        return (
            <div id='dash-page'>
                <Header user={this.state.user} logOut={this.props.logOut} admin={this.props.admin} />
                <div id="dashboard-wrapper">
                    <div id="user-greeting">
                        <img id="dash-pic" src={this.state.user ? this.state.user.photoURL || User : ""} alt="User Photo" />
                        <div id="name-email-cont">
                            <div id="dash-name">{this.state.user ? this.state.user.displayName || this.state.user.email : "Loading"}</div>
                            <div id="dash-email">{this.state.user.email}</div>
                        </div>
                    </div>
                    <div id="dash-links">
                        <div id="more-link" className={Mclasses} onClick={this.toggleContent}>Feed</div>
                        <div id="cv-link" className={CVclasses} onClick={this.toggleContent}>My Core Values</div>
                        <div id="g-link" className={Vclasses} onClick={this.toggleContent}>Profile</div>

                    </div>
                </div>
                <div id="dash-content">
                    {this.state.isCV ? <CoreValues user={this.state.user} />
                        : this.state.isG ? <Goals user={this.state.user} /> :
                            <Feed user={this.state.user} />
                    }
                </div>
            </div>
        )
    }
}

export default Dashboard