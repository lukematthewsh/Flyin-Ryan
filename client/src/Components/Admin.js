import React from 'react'
import '../Css/Admin.css'
import { database } from '../firebaseApp.js'


class Admin extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this.props.user,
            content: 'general',
            userData: [],
        }
    }

    async componentDidMount() {
        let userObjs = await database.ref(`/users`).once('value').then(function (snapshot) {
            let currentUserAnswers = snapshot.val()
            return currentUserAnswers
        })
        this.setState({
            userData: userObjs
        })
    }



    cvHandler = () => {
        let cvhandlerArray = []
        for (let user in this.state.userData) {
            let value = this.state.userData[user]['Key Core Values']
            let age = this.state.userData[user].Age.answer
            let jsxCV = (
                <div id='admin-user-display-wrapper'>
                    <div id='admin-user-display'>
                        <div id='age'>
                            User Age: {age}
                        </div>
                    User Values: {value
                            ? value.map(value => {
                                return <div>{value}</div>
                            })
                            : <div>User hasn't filled out questions</div>}
                    </div>
                    <br></br><br></br>
                </div>)
            cvhandlerArray.push(jsxCV)
        }
        return cvhandlerArray
    }

    contentHandler = (event) => {
        this.setState({
            content: event.target.id
        })
    }

    // upgrade = () => {
    //     admin.auth().getUserByEmail('devonsmith91@gmail.com')
    //         .then(function(userRecord){
    //             console.log(userRecord)
    //         })
    // }

    render() {
        console.log(this.state.userData)
        let adminContent;

        if (this.state.content.includes('general')) {
            adminContent =
                <div id='admin-content'>
                    <form id='admin-Upgrade' onSubmit={(event) => { event.preventDefault() }}>
                        <input id="email" type="email" name='email' placeholder='Email' />
                        <button id='adminUpgrade' onClick={this.upgrade}>Upgrade</button>
                    </form>
                </div>
        } else if (this.state.content.includes('questions')) {
            adminContent =
                <div id='admin-content'>
                    Questions Content
                </div>
        } else if (this.state.content.includes('user')) {
            adminContent =
                <div id='admin-content'>
                    <div id="admin-corevalues-content">
                        <ul id="core-values-list">
                            {this.cvHandler()}
                        </ul>
                    </div>
                </div>
        }
        return (
            <div id="admin-wrapper">
                <div id="admin-container">
                    <div id="admin-header">
                        <span>Welcome to The Admin Page</span>
                    </div>
                    <div id="admin-midSection">
                        <div id='admin-sidebarWrapper'>
                            <div id="admin-sidebar">
                                <span id="generalInfo" onClick={this.contentHandler}>General Information</span>
                                <span id="questionsInfo" onClick={this.contentHandler}>Edit Question Slides</span>
                                <span id="userInfo" onClick={this.contentHandler}>View User Responses</span>
                            </div>
                        </div>
                        <div id="admin-contentWrapper">
                            {adminContent}
                        </div>
                    </div>



                Okay we need.
                a way to

                A way to upgrade other users to be admin.

                edit questions
                edit Help bubbles in questions

                a way to delete or edit user responses
                a way to delete user responses in the feed (?)


                </div>
            </div>
        )
    }

}

export default Admin;
