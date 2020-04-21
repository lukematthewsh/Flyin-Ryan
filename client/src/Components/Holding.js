import React from 'react'
import { firebaseApp } from '../firebaseApp'

class Holding extends React.Component {

    render() {
        return(
            <h1>
                A link to verify your email has been sent to the email address you provided. Please click the link in the email to complete sign up!
            </h1>
        )
    }
}

export default Holding