import React from 'react'
import '../Css/Dashboard.css'

class Goals extends React.Component {

    constructor(props) {
        super(props)

    }


    render() {
        return (
            <div id = 'goals'>
                <h1>Your Goals:</h1>
                <br></br>
                <h3>This where the user's goals will be displayed. They will also be able to update/edit them here.</h3>
            </div>
        )
    }
}

export default Goals