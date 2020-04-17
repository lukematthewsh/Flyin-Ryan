import React from "react"
import "../Css/HelpModal.css"
import X from "../images/x.png"


export default class HelpModal extends React.Component {




    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="modal">
                <h2 id="top-close">Need a Hand
                <div onClick={this.props.closeHelp}><img id='close-button' src={X} style={{ maxWidth: "40px" }}></img> </div>
                </h2>
                <div class='content'>{this.props.help}</div>
                <p id="close-message">Click the X to close.</p>
            </div>
        )
    }

}
