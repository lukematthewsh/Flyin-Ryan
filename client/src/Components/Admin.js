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
            editModal: false,
            currentUserEdit: null,
            adminCVEdit: null,
            currentUID: null,
        }
    }

    async componentDidMount() {
        let userObjs = await database.ref(`/users`).once('value').then(function (snapshot) {
            let response = snapshot.val()
            return response
        })
        this.setState({
            userData: userObjs
        })
    }

    adminEdit = async (user) => {
        let userObj = await database.ref(`/users/${user}`).once('value').then(function (snapshot) {
            let response = snapshot.val()
            return response
        })
        this.setState({
            editModal: true,
            currentUserEdit: userObj,
            currentUID: user,
        })
    }

    closeEdit = () => {
        this.setState({
            editModal: false,
            currentUID: null,
        })
    }

    enterText = (event) => {
        this.setState({ adminCVEdit: event.target.value })
    }

    updateValue = async (value) => {
        let cvArray = this.state.currentUserEdit['Key Core Values']
        let indexNumber = cvArray.indexOf(value)
        let targetValue = cvArray.splice(cvArray.indexOf(value), 1)

        targetValue = this.state.adminCVEdit
        cvArray.splice(indexNumber, 0, targetValue)

        let update = {}
        update[`/users/${this.state.currentUID}/Key Core Values`] = cvArray

        if (this.state.adminCVEdit) {
            await database.ref().update(update)
        }
        // THIS SET STATE IS IMPORTANT TO LEAVE EMPTY!
        this.setState({
        })
    }

    cvHandler = () => {
        let cvhandlerArray = []
        for (let user in this.state.userData) {
            let age
            let name
            let value = this.state.userData[user]['Key Core Values']
            if (this.state.userData[user].Age) {
                age = this.state.userData[user].Age.answer
            }
            if (this.state.userData[user].Name) {
                name = this.state.userData[user].Name.Name
            }
            let jsxCV = (
                <div id='admin-user-display-wrapper'>
                    <div id='admin-user-display'>
                        <div id='name'>
                            Name: {name
                                ? name : <div>N/A</div>}
                        </div>
                        <div id='age'>
                            Age: {age ? age : <div>N/A</div>}
                        </div>
                            Values: {value
                            ? value.map(value => {
                                return <div id='coreValueDiv' key={value}>- {value}</div>
                            })
                            : <div>N/A</div>}
                    </div>
                    <br></br>
                    <div className='editButtonWrapper' onClick={() => { this.adminEdit(user) }}>
                        <div className='adminEditButton'>Edit</div>
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
        let adminContent;

        if (this.state.content.includes('general')) {
            adminContent =
                <div id='admin-content'>

                    Okay we need.
                    a way to

                    A way to upgrade other users to be admin.

                    edit questions
                    edit Help bubbles in questions

                    a way to delete or edit user responses
                    a way to delete user responses in the feed (?)


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
                {this.state.editModal
                    ? <div id='adminEditWrapper'>
                        <div id='adminEditModal'>
                            <div id='adminModalHeader'>
                                <div>Name: {this.state.currentUserEdit.Name
                                    ? this.state.currentUserEdit.Name.Name
                                    : 'N/A'}</div>
                                <div>Age: {this.state.currentUserEdit.Age
                                    ? this.state.currentUserEdit.Age.answer
                                    : 'N/A'}</div>
                                <div onClick={this.closeEdit} id='closeAdminButton'>
                                    X
                                </div>
                            </div>
                            <div id="adminModalCVTitle">
                                Core Values:
                            </div>
                            <div id="adminCVContainer">
                                {this.state.currentUserEdit['Key Core Values']
                                    ? this.state.currentUserEdit['Key Core Values'].map((value) => {
                                        return <div>
                                            <div id="adminEditValue">
                                                {value}
                                            </div>
                                            <div id="adminTextinput">
                                                <textarea id="adminTextAnswers" defaultValue={value} onChange={this.enterText} cols="25" rows="6"></textarea>
                                            </div>
                                            <div onClick={() => {this.updateValue(value) }} id='updateButtonWrapper'>
                                                <div >
                                                    Update
                                                </div>
                                            </div>
                                        </div>
                                    })
                                    : <div id="emptyWrapper"><div className="emptyValues">It seems to be a bit empty in here</div></div>}
                            </div>
                        </div>
                    </div>
                    : null}
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



                </div>
            </div>
        )
    }

}

export default Admin;
