import React from 'react'
import X from "../images/x.png"
import "../Css/ShareModal.css"
import { database } from '../firebaseApp.js'


class AddModal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div id="share-modal">
                <h2>Add a Core Value</h2>
                <br></br>
                <br></br>
                <div onClick={this.props.closeAddModal}><img id='close-button' src={X} style={{ maxWidth: "40px" }}></img></div>
                <textarea id='add-value-text' placeholder="Enter a New Core Value Here!" ></textarea>

                <div id="share-to-feed" onClick={this.props.addValue}>Add</div>


            </div>
        )
    }
}

export default AddModal