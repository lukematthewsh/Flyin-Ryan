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
import PlusSign from '../images/Plus Sign.jpg'


class CoreValues extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            showAdd: false,
            user: this.props.user,
            content: [],
            userData: [],
            author: this.props.user.displayName
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

    closeAddModal = (event) => {
        this.setState({
            showAdd: !this.state.showAdd
        })
    }

    closeShareModal = (e) => {
        this.setState({
            show: !this.state.show
        }
        )

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


    edit = () => { }


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
                    <h1>Your Core Values</h1>
                    <div id="rasta-border-core"></div>
                    <h4>It appears you havent filled out you core values yet! Click below to start!</h4>
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
                        <h1>Your Core Values</h1>
                        <div id="rasta-border-core"></div>
                        <h3>Here you can view your Core Values! You can add, delete, edit or share you core values to the feed!</h3>
                        <br></br>
                       
                            <div id="core-values-list">
                                {this.state.userData.map(item => (
                                    <div id="button-core-container" key={item}>
                                        <h5 id="value">{item}</h5>
                                        <div id="core-tools"> 
                                        <div id="edit" onClick={this.edit}> <img src={editIco} style={{ maxWidth: "15px" }} /></div>
                                        <div onClick={this.openShareModal}><img id="share" src={ShareIco} style={{ maxWidth: "15px" }} /></div>
                                       </div>
                                    </div>
                                ))}
                            </div>
                    
                        <br></br>
                        <div id='plus'><img onClick={this.openAddModal} id='plus-sign' src={PlusSign} alt='plus-sign' /></div>

                    </div> : <Link to="/questions"><h1 style={{ marginTop: 200 }}>Take the Core Values Challenge!</h1></Link>
            )
        }
    }
}

export default CoreValues