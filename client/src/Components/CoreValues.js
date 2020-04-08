import React from 'react'
import '../Css/Dashboard.css'

class CoreValues extends React.Component {

    constructor(props) {
        super(props)

    }


    render() {
        return (
            <div id = 'core-values'>
                <h1>Your Core Values</h1>
                <br></br>
                <h3>This where the user's core values will be displayed. They will also be able to update/edit them here.</h3>
            </div>
        )
    }
}

export default CoreValues