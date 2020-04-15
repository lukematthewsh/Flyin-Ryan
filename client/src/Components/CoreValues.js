import React from 'react'
import '../Css/Dashboard.css'
import { database } from '../firebaseApp.js'
import ShareIco from '../images/share.png'
import editIco from '../images/editIco.png'
import { Link } from 'react-router-dom'
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
        console.log(prevPosts)
        prevPosts.push(content + author)

        let feedAnswers = {}
        feedAnswers[`/feed`] = prevPosts

        await database.ref().update(feedAnswers)

    }

    edit = () => { }


    render() {
        console.log(this.state.userData) 
        return (
            this.state.userData !== null ?
            <div id='core-values'>
                <h1>Your Core Values</h1>
                <br></br>
                <h4>Here you can view your Core Values! You will also be able to update/edit them here.</h4>
                <br></br>
                <div id="corevalues-content">
                    <ul id="core-values-list">
                        {this.state.userData.map(item => (
                            <div id="button-core-container" key={item}>{item}
                                <button id="edit" onClick={this.edit}> <img src={editIco} style={{ maxWidth: "15px" }} /></button>
                                <button onClick={this.share}><img id="share" src={ShareIco} style={{ maxWidth: "15px" }} /></button>
                            </div>
                        ))}
                    </ul>
                </div>
                <br></br>

            </div> : <Link to="/questions"><h1 style={{marginTop: 200}}>Take the Core Values Challenge!</h1></Link>
        )
    }
}

export default CoreValues