import React from 'react'
import { database } from '../firebaseApp.js'

class Feed extends React.Component{
    constructor(props) {
        super(props);
        

        this.state = {
            feed: [],
            user: this.props.user,
            postsArray:[],
            
        }
    }
    async componentDidMount() {
        let feedData = await database.ref(`/feed`).once('value').then(function (snapshot) {
            let postsLists = snapshot.val()

            return postsLists
        })
        this.setState({
            feed: feedData
        })
    }
    

    render(){
        return(
            <div id = "feed-display">
                <h1>User Feed</h1>
                <div id = "rasta-border-feed"></div>
                <h3>Check out other users awesome Core Values!</h3>
                <br></br>
                <ul id="blog-list">
                        {this.state.feed.reverse().map(item => (
                            <div id="button-feed-container" key={item}>
                            <div id="value-feed">{item}</div>
                            </div>
                        ))}
                    </ul>
            </div>
        )
    }
}

export default Feed