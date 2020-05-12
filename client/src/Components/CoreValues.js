import React from 'react'
import '../Css/Dashboard.css'
import { database } from '../firebaseApp.js'
import ShareIco from '../images/share.png'
import editIco from '../images/editIco.png'
import { Link } from 'react-router-dom'
import shareFacebook from 'share-facebook'
import facebook from '../images/facebook.png'
import ShareModal from './ShareModal.js'
import AddModal from './AddModal'
import EditModal from './EditModal'
import PlusSign from '../images/plus.png'
import X from "../images/x.png"
import RemoveModal from './RemoveModal'


class CoreValues extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            showAdd: false,
            showRem: false,
            showEdit: false,
            user: this.props.user,
            content: "",
            userData: [],
            author: this.props.user.displayName,
            deleteCV: null,
            editedVal: ''
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

    openAddModal = (event) => {
        this.setState({
            showAdd: !this.state.showAdd
        })
    }

    openShareModal = (event) => {
        this.setState({
            show: !this.state.show,
            content: (event.target.parentNode.parentNode.parentNode.textContent)
        }
        )

    }

    openRemModal = (event, index) => {
        this.setState({
            showRem: !this.state.showRem,
            content: (event.target.parentNode.parentNode.parentNode.textContent),
            deleteCV: index
        })
    }

    closeAddModal = (event) => {
        this.setState({
            showAdd: !this.state.showAdd,
        })
    }

    closeShareModal = (e) => {
        this.setState({
            show: !this.state.show
        }
        )

    }

    closeRemModal = (event) => {
        this.setState({
            showRem: !this.state.showRem,
            deleteCV: null,
        })
    }

    openEditModal = (event, index) => {
        this.setState({
            showEdit: !this.state.showEdit,
            content: (event.target.parentNode.parentNode.parentNode.textContent),
            deleteCV: index 

        })
    }

    closeEditModal = () => {
        this.setState({
            showEdit: !this.state.showEdit
        })
    }

    addValue = async () => {
        let newValue = document.getElementById('add-value-text').value
        this.state.userData.push(newValue)
        let update = {}
        update[`/users/${this.state.user.uid}/Key Core Values`] = this.state.userData
        await database.ref().update(update)
        this.setState({
            showAdd: !this.state.showAdd
        })
    }

    delete = (event) => {
        let cvArray = this.state.userData
        let cValue = this.state.content
        let indexNum = this.state.deleteCV
        cvArray.splice(indexNum, 1)
        console.log(cvArray)


        let update = {}
        update[`/users/${this.state.user.uid}/Key Core Values`] = cvArray
        database.ref().update(update)

        this.setState({
            userData: cvArray,
            showRem: !this.state.showRem
        })

    }


    edit = (event) => {
        let cvArray = this.state.userData
        let indexNum = this.state.deleteCV
        cvArray[indexNum] = this.state.editedVal

        let update = {}
        update[`/users/${this.state.user.uid}/Key Core Values`] = cvArray
        database.ref().update(update)

        this.setState({
            userData: cvArray,
            showEdit: !this.state.showEdit
        })
    }

    enterText = (event) => {
        this.setState({ editedVal: event.target.value })
    }


    facebook = () => {
        let test = shareFacebook({
            href: 'http://localhost:3000/dashboard',
            redirect_uri: 'https://www.google.com',
            app_id: '2367781363516455'
        })
    }

    render() {
        if (this.state.userData === null) {
            return (
                <div id="core-values">
                     <div id ='core-title'>
                        <h1>Your Core Values</h1> 
                    </div>
                    <div id="rasta-border-core"></div>
                    <h3>It appears you havent filled out you core values yet! Click below to start!</h3>
                    <Link to={"/questions"} style={{ textDecoration: 'none' }}><div id="get-started" >Get Started</div></Link>
                </div>
            )
        }
        else {
            return (

                this.state.userData !== null ?
                    <div id='core-values'>
                        <ShareModal show={this.state.show} closeShareModal={this.closeShareModal} content={this.state.content} author={this.state.author} />
                        <AddModal addValue={this.addValue} user={this.state.user} userData={this.state.userData} show={this.state.showAdd} closeAddModal={this.closeAddModal} author={this.state.author} />
                        <RemoveModal delete={this.delete} show={this.state.showRem} closeRemModal={this.closeRemModal} content={this.state.content} author={this.state.author} />
                        <EditModal enterText={this.enterText} edit={this.edit} show={this.state.showEdit} closeEditModal={this.closeEditModal} content={this.state.content} author={this.state.author} />
                        <div id ='core-title'>
                        <h1>Your Core Values</h1> 
                        </div>
                        <div id="rasta-border-core"></div>
                        <h3>Here you can view your Core Values! You can also add, delete, edit or share you core values to the feed!</h3>
                        <br></br>
                        <div id ="add-container"><p>Add a new value</p> <div id='plus'><img onClick={this.openAddModal} id='plus-sign' src={PlusSign} alt='plus-sign' style ={{maxHeight: "25px", maxWidth: "25px"}}/></div>
                        </div>
                        <div id="core-values-list">
                            {this.state.userData.map((item, index) => (
                                <div id="button-core-container" key={item}>
                                    <h5 id="value">{item}</h5>
                                    <div id="core-tools">
                                        <div onClick={(e) => {this.openEditModal(e, index)}}> <img id ="edit" src={editIco} style={{ maxWidth: "25px" }} /></div>
                                        <div onClick={this.openShareModal}><img id="share" src={ShareIco} style={{ maxWidth: "25px" }} /></div>
                                        <div onClick={(e) => {this.openRemModal(e, index)}}><img id='close-remove-button' src={X} style={{ maxWidth: "35px" }} /></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <br></br>
                       

                    </div> : <Link to="/questions"><h1 style={{ marginTop: 200 }}>Take the Core Values Challenge!</h1></Link>
            )
        }
    }
}

export default CoreValues