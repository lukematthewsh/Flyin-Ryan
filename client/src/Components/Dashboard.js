import React from "react"
import '../Css/Dashboard.css'
import CoreValues from './CoreValues.js'
import Goals from './Goals.js'
import classnames from 'classnames'
import MoreValues from './MoreValues.js'

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
                CVbutt: {
                    active: false,
                },
                Vbutt: {
                    active: false,
                }
            })
        }
    }


    render() {
        let CVclasses = classnames('cv-button', { 'cv-button-active': this.state.CVbutt.active });
        let Vclasses = classnames('v-button', { 'v-button-active': this.state.Vbutt.active });
        let Mclasses = classnames('m-button', { 'm-button-active': this.state.Mbutt.active });

        return (
            <div id='dash-page'>
                <div id="dashboard-wrapper">
                    <div id="user-greeting">
                        <img id="dash-pic" src={this.state.user.photoURL} alt="User Photo" />
                        <div id="dash-name">{this.state.user.displayName || this.state.user.email}</div>
                        <div id="dash-date">{this.state.user.creationTime}</div>
                    </div>
                    <div id="dash-links">
                        <div id="cv-link" className={CVclasses} onClick={this.toggleContent}>My Core Values</div>
                        <div id="g-link" className={Vclasses} onClick={this.toggleContent}>My Goals</div>
                        <div id="more-link" className={Mclasses} onClick={this.toggleContent}>More</div>
                    </div>
                </div>
                <div id="dash-content">
                    {this.state.isCV ? <CoreValues user={this.state.user} />
                        : this.state.isG ? <Goals user={this.state.user} /> :
                            <MoreValues user={this.state.user} />
                    }
                </div>
            </div>
        )
    }
}

export default Dashboard