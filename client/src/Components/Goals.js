import React from 'react'
import '../Css/Dashboard.css'

class Goals extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            user: this.props.user,
            userData: "This will be profile info"
        }
    }



    render() {
        return (
            <div id='goals'>
                
                <h1>Your Info</h1>
        
                <div id = "rasta-border-goals"></div>
                <h3>{this.state.userData}</h3>
                </div>
                )
            }
        }
        
export default Goals