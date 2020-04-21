import React from 'react'
import X from "../images/x.png"
import "../Css/ShareModal.css"
import { database } from '../firebaseApp.js'

class EditModal extends React.Component {
    constructor(props) {
        super(props)
    }



    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div id="share-modal">
                <h2>Edit Value</h2>
                <br></br>
                <div onClick={this.props.closeEditModal}>
                    <img id='close-button' src={X} style={{ maxWidth: "40px" }}></img>
                </div>
                <div id='preshare'>
                    <div>Hey 
                        <span id="author-post">
                            , {this.props.author}
                        </span>, please edit this core value to your liking and then click "Update".
                        
                    </div>
                </div>
                <textarea onChange={this.props.enterText} id="add-value-text">{this.props.content}</textarea>
                <div id="share-to-feed" onClick={this.props.edit}>Update</div>
            </div>
        )
    }
}

export default EditModal