import React from "react"
import '../Css/Dashboard.css'
import CoreValues from './CoreValues.js'
import Goals from './Goals.js'

class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            user: this.props.user,
            isCV: true
        }
    }

    toggleContent = (event) => {

        if(event.target.id === "g-link") {
            this.setState({
                isCV: false
            })
        } else if(event.target.id === "cv-link") {
            this.setState({
                isCV: true
            })
        }
    }


    render() {
        return (
            <div>
                <div id="dashboard-wrapper">
                    <div id="user-greeting">
                        <img id="dash-pic" src={this.state.user.photoURL} alt="User Photo" />
                        <div id="dash-name">{this.state.user.displayName || this.state.user.email}</div>
                    </div>
                    <div id="dash-links">
                        <div id="cv-link" onClick={this.toggleContent}>My Core Values</div>
                        <div id="g-link" onClick={this.toggleContent}>My Goals</div>
                    </div>
                </div>
                <div id="dash-content">
                    {this.state.isCV ? <CoreValues /> : <Goals />}
                </div>
            </div>
        )
    }
}

export default Dashboard