import React from 'react'
import '../Css/Dashboard.css'
import { database } from '../firebaseApp.js'
import ShareIco from '../images/share.png'
import editIco from '../images/editIco.png'
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
        this.setState({
            userData: answers
        })
    }



    componentWillUnmount() {
        window.removeEventListener('load', this.getCoreValues)
    }

    render() {
        return (
            <div id='core-values'>
                <h1>Your Core Values</h1>
                <br></br>
                <h4>Here you can view your Core Values! You will also be able to update/edit them here.</h4>
                <br></br>
                <div id="corevalues-content">
                    <ul id = "core-values-list">
                        {this.state.userData.map(item => (
                            <li key = {item}>{item}
                            <div id = "button-core-container"> 
                            <button id = "edit"> <img src = {editIco} style = {{maxWidth: "15px"}}/></button>
                            <button><img id = "share" src = {ShareIco} style = {{maxWidth: "15px"}}/></button>
                            </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <br></br>
        
            </div>
        )
    }
}

export default CoreValues