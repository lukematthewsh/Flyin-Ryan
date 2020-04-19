import React from 'react'
import '../Css/Dashboard.css'
import { database } from '../firebaseApp.js'
import ShareIco from '../images/share.png'
import editIco from '../images/editIco.png'
import { Link } from 'react-router-dom'
import shareFacebook from 'share-facebook'
import facebook from '../images/facebook.png'
import ShareModal from './ShareModal.js'


class CoreValues extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show:  false,
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
    openShareModal = (event) =>{
        this.setState({
            show: !this.state.show,
            content: (event.target.parentNode.parentNode.textContent)
        }
        )

    }
    closeShareModal = (e) =>{
        this.setState({
            show: !this.state.show
        }
        )

    }


    edit = () => { }


    facebook = () => {
        let test = shareFacebook({
            href: 'http://localhost:3000/dashboard',
            redirect_uri: 'https://www.google.com',
            app_id: '2367781363516455'
          })
          console.log(test)
    }

    render() {

        if (this.state.userData === null){
            return(
                <div id = "core-values">
                <h1>Your Core Values</h1>
                <div id = "rasta-border-core"></div>
                <h4>It appears you havent filled out you core values yet! Click below to start!</h4>
                <Link to = {"/questions"} style={{ textDecoration: 'none' }}><div id="get-started" >Get Started</div></Link>
                </div>
            )
        }
        else{ 
        return (
            
            this.state.userData !== null ?
            <div id='core-values'>
                <ShareModal  show={this.state.show}  closeShareModal={this.closeShareModal} content ={this.state.content} author ={this.state.author}/>
                <h1>Your Core Values</h1>
                <div id = "rasta-border-core"></div>
                <h4>Here you can view your Core Values! You will also be able to update/edit them here.</h4>
                <br></br>
                <div id="corevalues-content">
                    <ul id="core-values-list">
                        {this.state.userData.map(item => (
                            <div id="button-core-container" key={item}>
                                <h5 id = "value">{item}</h5>
                                <div id="edit" onClick={this.edit}> <img src={editIco} style={{ maxWidth: "15px" }} /></div>
                                <div onClick={this.openShareModal}><img id="share" src={ShareIco} style={{ maxWidth: "15px" }} /></div>
                                <div onClick={this.facebook}><img id="facebook-img" src={facebook} /></div>
                            </div>
                        ))}
                    </ul>
                </div>
                <br></br>

            </div> : <Link to="/questions"><h1 style={{marginTop: 200}}>Take the Core Values Challenge!</h1></Link>
        )
    }
}
}

export default CoreValues