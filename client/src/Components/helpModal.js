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
              <div id="top-close">
                  <h2>Need a Hand</h2>
                <div onClick={this.props.closeHelp}>
                    <img id='close-button' src={X} style={{ maxWidth: "40px" }}alt = "close X"/>
                </div>
                </div>
                <div class='content'>{this.props.help}</div>
                <p id="close-message">Click the X to close.</p>
            </div>
        )
    }

}
