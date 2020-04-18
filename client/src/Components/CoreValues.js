import React from 'react'
import '../Css/Dashboard.css'
import { database } from '../firebaseApp.js'
import ShareIco from '../images/share.png'
import editIco from '../images/editIco.png'
import { Link } from 'react-router-dom'
import shareFacebook from 'share-facebook'
import facebook from '../images/facebook.png'

class CoreValues extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
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


    share = async (event) => {
        let content = (event.target.parentNode.parentNode.textContent)
        let author = this.state.user.displayName
    
        let prevPosts = await database.ref(`/feed`).once("value").then(function (snapshot) {
            return snapshot.val() || []
        })    
        prevPosts.push(author + content)

        let feedAnswers = {}
        feedAnswers[`/feed`] = prevPosts

        await database.ref().update(feedAnswers)

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
                                <div onClick={this.share}><img id="share" src={ShareIco} style={{ maxWidth: "15px" }} /></div>
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