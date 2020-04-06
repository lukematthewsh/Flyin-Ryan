import React from "react"
import '../Css/Dashboard.css'

class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {
        return (
            <div id="dashboard-wrapper">
                <div id="user-greeting">
                    <img id="dash-pic" src={this.props.userData.photoURL} alt="User Photo" />
                    <div id="dash-name">{this.props.userData.displayName || this.props.userData.email}</div>
                </div>
            </div>
        )
    }
}

export default Dashboard