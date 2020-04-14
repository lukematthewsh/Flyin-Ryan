import React from 'react'
import '../Css/Dashboard.css'
import { database } from '../firebaseApp.js'


class CoreValues extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            userData: [],

        }

    }


    
    async componentDidMount() {
        let answers = await database.ref(`/users/${this.state.user.uid}/Key Core Values`).once('value').then(function (snapshot) {
            let currentUserAnswers = snapshot.val()
    
            return currentUserAnswers
        })
        answers.forEach((answer) => {
            this.setState({
                userData: answer
            })
        })
       

    }



    componentWillUnmount() {
        window.removeEventListener('load', this.getCoreValues)
    }

    render() {
        return (
            <div id='core-values'>
                <h1>Your Core Values</h1>
                <div id="corevalues-content">{this.state.userData}</div>
                <br></br>
                <h3>This where the user's core values will be displayed. They will also be able to update/edit them here.</h3>
            </div>
        )
    }
}

export default CoreValues