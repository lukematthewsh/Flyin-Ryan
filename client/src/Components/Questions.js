import React, { useReducer } from 'react'
import '../Css/Questions.css'
import data from './QuestionsData.js'
import QuestionCard from './QuestionCard.js'
import {database} from '../firebaseApp.js'

class Questions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            questions: data.questions,
            question: data.questions[0],
            userAnswers: null
        }
    }

    enterText = (event) => {
        this.setState({ userAnswers: event.target.value })
    }

    nextQuestion = () => {
        const newIndex = this.state.question.index + 1;
        let userAnswers = {}
        userAnswers[`/users/${this.props.user.uid}/${this.state.question.index}`] = {question: this.state.question.inquery, answer: this.state.userAnswers}
 

        database.ref().update(userAnswers)
        this.setState({
            question: data.questions[newIndex],
            userAnswers: null
        })
    }

    prevQuestion = () => {
        const newIndex = this.state.question.index - 1;
        this.setState({
            question: data.questions[newIndex],
        })
    }

    render() {
        const { question } = this.state;
        return (
            <div id="questions-wrapper">

                <div id='question-container'>

                    <div id="questions">
                        <QuestionCard question={question} />
                    </div>
                </div>

                <div id="question-button-container">

                    <div id="textinput">
                        <textarea id="textAnswers" placeholder="Write response here..." onChange={this.enterText} cols="40" rows="10"></textarea>
                    </div>

                    <div id="question-inner-container">
                        <button
                            id="prevButton"
                            onClick={this.prevQuestion}
                            disabled={question.index === 0}
                        >Prev</button>
                        <button
                            id="nextButton"
                            onClick={this.nextQuestion}
                            disabled={question.index === data.questions.length - 1}
                        >Next</button>
                    </div>
                </div>


            </div>
        )
    }
}

export default Questions
