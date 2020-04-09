import React from 'react'
import '../Css/Dashboard.css'
import { database } from '../firebaseApp.js'


class CoreValues extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            userData: null,

        }

    }
    getCoreValues = (uid) => {
        database.ref('users/' + this.state.user.uid + '/11/answer').once("value", snap => {

            this.setState({
                userData: snap.val()
            })
        })
    }
    componentDidMount() {
        this.getCoreValues();
     }
    
     componentWillUnmount() { 
       window.removeEventListener('load', this.getCoreValues)  
     }
    
    render() {
        return (
            <div id='core-values'>
                <h1>Your Core Values</h1>
                <div id = "corevalues-content">{this.state.userData}</div>
                <br></br>
                <h3>This where the user's core values will be displayed. They will also be able to update/edit them here.</h3>
            </div>
        )
    }
}

export default CoreValues