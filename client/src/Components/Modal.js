import React from 'react'
import '../Css/modal.css'

class Modal extends React.Component {
    render() {
        return (
            <div id='modalWrapper'>
                <div id='mondal-button'onClick={this.props.closeHandler}>Exit</div>
            </div>
        )
    }
}

export default Modal