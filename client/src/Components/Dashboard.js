import React from "react"

class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {
        return (
            <div id ="user-greeting">
                <h1>Hello, {this.props.name || this.props.email}! Welcome to your user Dashboard!</h1>
            </div>
        )
    }
}

export default Dashboard