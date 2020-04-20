import React from 'react'
import X from "../images/x.png"
import "../Css/ShareModal.css"
import { database } from '../firebaseApp.js'

class ShareModal extends React.Component{
    constructor(props){
        super(props)
    }
    share = async (event) => {
        let content = this.props.content
        let author = this.props.author
    
        let prevPosts = await database.ref(`/feed`).once("value").then(function (snapshot) {
            return snapshot.val() || []
        })    
        prevPosts.push(author + content)

        let feedAnswers = {}
        feedAnswers[`/feed`] = prevPosts

        await database.ref().update(feedAnswers)

    }



    render(){
        if (!this.props.show) {
            return null;
        }
        return(
            <div id = "share-modal">
                <h2>Post Confirmation</h2>
                <br></br>
                <br></br>
                <div onClick={this.props.closeShareModal}><img id='close-button' src={X} style={{ maxWidth: "40px" }}></img>
                <div id = 'preshare'>
               <div>Hey, <span id = "author-post">{this.props.author}</span>, you are about to post this value to the feed: <div id ="post-content">{this.props.content}</div></div>
               <div>If this is the value you would like to share click below!</div>
               </div>
              
               <div id ="share-to-feed" onClick= {this.share}>Share</div>
                </div>

            </div>
        )
    }
}

export default ShareModal
