import React from 'react'
import '../Css/Admin.css'
import { database } from '../firebaseApp.js'
import { Link } from 'react-router-dom'
import FRFlogo from '../images/flyinLogo.svg'


class Admin extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this.props.user,
            content: 'questionsInfo',
            userData: [],
            editModal: false,
            currentUserEdit: null,
            adminEdit: null,
            currentUID: null,
            questionsData: null,
        }
    }

    async componentDidMount() {
        this.pullDB()
    }

    pullDB = async () => {
        let questObjs = await database.ref('/data').once('value').then(function (snapshot) {
            let response = snapshot.val()
            return response
        })

        let userObjs = await database.ref(`/users`).once('value').then(function (snapshot) {
            let response = snapshot.val()
            return response
        })
        this.setState({
            userData: userObjs,
            questionsData: questObjs
        })
    }

    adminEdit = async (user) => {
        let userObj = await database.ref(`/users/${user}`).once('value').then(function (snapshot) {
            let response = snapshot.val()
            return response
        })
        this.setState({
            editModal: "values",
            currentUserEdit: userObj,
            currentUID: user,
        })

    }

    questionEdit = (quest) => {
        this.setState({
            editModal: "questions",
            folder: quest.folder,
            help: quest.help,
            index: quest.index,
            inquiry: quest.inquiry,
            options: quest.options
        })

    }

    closeEdit = () => {
        this.setState({
            editModal: false,
            currentUID: null,
        })
        this.pullDB()
    }

    enterText = (event, value) => {
        this.setState({
            adminEdit: event.target.value,
            updateButton: value
        })
    }

    updateValue = async (e, value) => {
        e.preventDefault()
        let cvArray = this.state.currentUserEdit['Key Core Values']
        let indexNumber = cvArray.indexOf(value)
        let targetValue = cvArray.splice(cvArray.indexOf(value), 1)

        targetValue = this.state.adminEdit
        cvArray.splice(indexNumber, 0, targetValue)

        let update = {}
        update[`/users/${this.state.currentUID}/Key Core Values`] = cvArray

        if (this.state.adminEdit) {
            await database.ref().update(update)
        }
        // THIS SET STATE IS IMPORTANT TO LEAVE EVEN IF EMPTY!
        this.setState({
            adminEdit: null
        })
    }

    updateQuestion = async (e, index) => {
        e.preventDefault()
        let currentIndex = index
        let newQuestions = this.state.adminEdit
        let update = {}
        update[`/data/questions/${currentIndex}/inquiry`] = newQuestions

        await database.ref().update(update)

        this.setState({
            inquiry: newQuestions,
            adminEdit: null
        })
    }

    updateHelp = async (e, index) => {
        e.preventDefault()
        let currentIndex = index

        let newHelp = this.state.adminEdit
        let update = {}
        update[`/data/questions/${currentIndex}/help`] = newHelp
        await database.ref().update(update)

        this.setState({
            help: newHelp,
            adminEdit: null
        })
    }

    // updateOptions = async (e, index) => {
    //     e.preventDefault()
    //     let currentIndex = index
    //     let newOption = this.state.adminEdit
    // }


    questionsHandler = () => {
        if (this.state.questionsData) {
            let quests = this.state.questionsData.questions.map((quest) => {
                let inquiry = quest.inquiry
                let help = quest.help
                let folder = quest.folder
                let index = quest.index
                let options
                let optionArray = []
                if (quest.options) {
                    options = quest.options
                    let jsxOption = options.map(option => {
                        return <div key={option} className='adminOption'>
                            - {option}
                        </div>
                    })
                    optionArray.push(jsxOption)
                }
                return <div id="admin-questions">
                    <div className='adminQuestionsNumber'>
                        <span className='adminQuestionTitle'>Number:</span> {index + 1}
                    </div>
                    <div>
                        <span className='adminQuestionTitle'>Title:</span> {folder}
                    </div>
                    <div>
                        <span className='adminQuestionTitle'>Question:</span> {inquiry}
                    </div>
                    <div>
                        <span className='adminQuestionTitle'>Help:</span> {help !== "''" ? help : 'N/A'}
                    </div>
                    <div>
                        <span className='adminQuestionTitle'>Options:</span>
                    </div>
                    <div>
                        {options
                            ? optionArray.map(option => {
                                return <div key={option}>{option}</div>
                            })
                            : <div className="adminOption">N/A</div>}
                    </div>
                    <br></br>
                    <div id='question' onClick={() => { this.questionEdit(quest) }}>
                        <div className="editButtonWrapper">
                            <div className='adminEditButton'>Edit</div>
                        </div>
                    </div>
                    <br></br><br></br>
                </div>
            })
            return <div>{quests}</div>
        }
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
                            {/* <div id='name' >
                            <span className="adminQuestionTitle">Name:</span>  {name
                                ? name : <div>N/A</div>}
                        </div> */}
                            <div id='age'>
                                <span className="adminQuestionTitle">Age:</span>  {age ? age : <div>N/A</div>}
                            </div>
                            <span className="adminQuestionTitle">Values:</span>  {value
                                ? value.map(value => {
                                    return <div id='coreValueDiv' key={value}>- {value}</div>
                                })
                                : <div>N/A</div>}

                            <br></br>
                            <div id="values" className='editButtonWrapper' onClick={() => { this.adminEdit(user) }}>
                                <div className='adminEditButton'>Edit</div>
                            </div>
                        </div>
                        <br></br><br></br><br></br>
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
            let modalContent;

            // if (this.state.content.includes('general')) {
            //     adminContent =
            //         <div id='admin-content'>

            //             Okay we need.
            //             a way to

            //             A way to upgrade other users to be admin.

            //             edit questions
            //             edit Help bubbles in questions

            //             a way to delete or edit user responses
            //             a way to delete user responses in the feed (?)


            //             <form id='admin-Upgrade' onSubmit={(event) => { event.preventDefault() }}>
            //                 <input id="email" type="email" name='email' placeholder='Email' />
            //                 <button id='adminUpgrade' onClick={this.upgrade}>Upgrade</button>
            //             </form>
            //         </div>
            // } else 
            if (this.state.content.includes('questions')) {
                adminContent =
                    <div id='admin-content'>
                        {this.questionsHandler()}
                    </div>
            } else if (this.state.content.includes('user')) {
                adminContent =
                    <div id='admin-content'>
                        <div id="admin-corevalues-content">
                            <ul id="admin-core-values-list">
                                {this.cvHandler()}
                            </ul>
                        </div>
                    </div>
            }

            if (this.state.editModal === "values") {
                modalContent = this.state.editModal
                    ? <div id='adminEditWrapper'>
                        <div id='adminEditModal'>
                            <div id='adminModalHeader'>
                                {/* <div>Name: {this.state.currentUserEdit.Name
                                ? this.state.currentUserEdit.Name.Name
                                : 'N/A'}</div> */}
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
                                        return <form onSubmit={(e) => { this.updateValue(e, value) }}>
                                            <div id="adminEditValue">
                                                {value}
                                            </div>
                                            <div id="adminTextinput">
                                                <textarea id="adminTextAnswers" defaultValue={value} onChange={(e) => this.enterText(e, value)} cols="25" rows="6"></textarea>
                                            </div>
                                            <input type='submit' value="Update" disabled={this.state.updateButton !== value} />
                                        </form>
                                    })
                                    : <div id="emptyWrapper"><div className="emptyValues">It seems to be a bit empty in here</div></div>}
                            </div>
                        </div>
                    </div>
                    : null
            } else if (this.state.editModal === "questions") {
                modalContent = this.state.editModal
                    ? <div id='adminEditWrapper'>
                        <div id='adminEditModal'>
                            <div id='adminModalHeader'>
                                <div>#{this.state.index + 1} </div>
                                <div>Title: {this.state.folder}</div>
                                <div onClick={this.closeEdit} id='closeAdminButton'>
                                    X
                            </div>
                            </div>
                            <div id='adminModalContent'>
                                <form onSubmit={(e) => { this.updateQuestion(e, this.state.index) }}>
                                    <div>
                                        <span id="adminModalCVTitle">Question:</span> {this.state.inquiry}
                                    </div>
                                    <div id="adminTextinput">
                                        <textarea id="adminTextAnswers" defaultValue={this.state.inquiry} onChange={(e) => this.enterText(e, this.state.inquiry)} cols="50" rows="6"></textarea>
                                    </div>
                                    <input type='submit' value="Update" disabled={this.state.updateButton !== this.state.inquiry} />
                                </form>
                                <div>
                                    {this.state.help !== "''"
                                        ? <form onSubmit={(e) => { this.updateHelp(e, this.state.index) }}>
                                            <div>
                                                <span id="adminModalCVTitle">Help:</span> {this.state.help}
                                            </div>
                                            <div id="adminTextinput">
                                                <textarea id="adminTextAnswers" defaultValue={this.state.help} onChange={(e) => this.enterText(e, this.state.help)} cols="50" rows="6"></textarea>
                                            </div>
                                            <input type='submit' value="Update" disabled={this.state.updateButton !== this.state.help} />
                                        </form>
                                        : null}
                                </div>
                                <div>
                                    {this.state.options
                                        ? <div>
                                            <span id="adminModalQuestTitle">Options:</span> {this.state.options.map(option => { return <div className='admin-options'>{option}</div> })}
                                        </div>
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }

            return (
                <div id="admin-wrapper">
                    <div id="admin-container">
                        {modalContent}
                        <div id="admin-header">
                            <div id='flyin-admin-wrapper'>
                                <Link to={'/'}> <img id="flyin-admin" src={FRFlogo} /> </Link>
                            </div>
                            <span id="admin-title">Welcome to The Admin Page</span>
                        </div>
                        <div id="admin-midSection">
                            <div id='admin-sidebarWrapper'>
                                <div id="admin-sidebar">
                                    {/* <span id="generalInfo" onClick={this.contentHandler}>General Information</span> */}
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
