import React from 'react'
import '../Css/Dashboard.css'
import { database } from '../firebaseApp.js'

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
                <h1>Your Info:</h1>
                <div id = "rasta-border-goals"></div>
                <br></br>
                <h4>{this.state.userData}</h4>
                </div>
                )
            }
        }
        
export default Goals