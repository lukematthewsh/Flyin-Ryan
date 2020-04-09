import React from 'react'
import '../Css/Dashboard.css'
import { database } from '../firebaseApp.js'


class MoreValues extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            userData: null,
            question: [],
            answers: []
        }

    }

    getValues = (uid) => {

        database.ref('users/' + this.state.user.uid + '/4/answer').once("value", snap => {
            this.setState({
                userData: snap.val()
            })
        })
}
    componentDidMount() {
        this.getValues()
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.getValues)
    }


    render() {
        return (
            <div id='more-values'>
                <h1>Your Stuff</h1>
                <div id="more-content">{this.state.userData}</div>
                <br></br>
                <h3>This  They will also be able to update/edit them here.</h3>
            </div>
        )
    }
}

export default MoreValues