import React from "react"

class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {
        return (
            <div>
                <h1>Hello, {this.props.name || this.props.email}! Welcome to your user Dashboard!</h1>
            </div>
        )
    }
}

export default Dashboard