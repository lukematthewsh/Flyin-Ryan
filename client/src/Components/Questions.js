import React, { useReducer } from 'react'
import '../Css/Questions.css'
import data from './QuestionsData.js'
import QuestionCard from './QuestionCard.js'
import { database, auth } from '../firebaseApp.js'

class Questions extends React.Component {
    constructor(props) {
        super(props)

        this.textAnswers = React.createRef()

        this.state = {
            question: data.questions[0],
            category: data.questions[0].folder,
            userAnswers: null,
            selectedAnswer: null
        }
    }

    enterText = (event) => {
        this.setState({ userAnswers: event.target.value })
    }

    nextQuestion = () => {
        const newIndex = this.state.question.index + 1;
        let userAnswers = {}
        userAnswers[`/users/${this.props.user.uid}/${this.state.question.folder}`] = { question: this.state.question.inquery, answer: this.state.userAnswers }


        database.ref().update(userAnswers)
        this.setState({
            question: data.questions[newIndex],
            category: data.questions[newIndex].folder,
            userAnswers: null
        })
        console.log(this.state.category)

        this.textAnswers.current.value = ""

        this.checkForAnswer(newIndex)
    }

    prevQuestion = () => {
        const newIndex = this.state.question.index - 1;
        let userAnswers = {}
        userAnswers[`/users/${this.props.user.uid}/${this.state.question.index}`] = { question: this.state.question.inquery, answer: this.state.userAnswers }

        database.ref().update(userAnswers)
        this.setState({
            question: data.questions[newIndex],
            category: data.questions[newIndex].folder,
        })
    }

    selected = (event) => {
        this.setState({
            selectedAnswer: event.target.id
        })
        console.log(this.state.selectedAnswer)
    }

    canBeSubmitted = () => {
        if (this.textAnswers.current) {
            return this.textAnswers.current.value.length > 0
        } else { return false }
    }

    checkForAnswer = (index) => {
        let uid = auth().currentUser.uid;
        let textAnswers = this.textAnswers.current
        let _this = this
        return database.ref('/users/' + uid).once('value').then(function (snapshot) {
            let currentUserAnswers = snapshot.val()

            if (currentUserAnswers && currentUserAnswers[index]) {

                textAnswers.value = currentUserAnswers[index].answer
                _this.setState({
                    userAnswers: textAnswers.value
                })
            }
        })

    }

    render() {
        const { question } = this.state;
        const category = this.state.category
        let answerStyle
        if (!category.includes('Core Value Questions')) {
            answerStyle = question.options.map(option => {
                return <QuestionOption handler={this.selected} id={option} selected={this.state.selectedAnswer} option={option} />
            })
        } else if (category.includes('Core Value Questions')) {
            answerStyle = <div id="textinput">
                <textarea id="textAnswers" placeholder="Write response here..." ref={this.textAnswers} onChange={this.enterText} cols="40" rows="10"></textarea>
            </div>
        }


        const isEnabled = this.canBeSubmitted();
        return (
            <div id="questions-wrapper">
                <div id='question-container'>
                    <div id="questions">
                        <QuestionCard question={question} />
                    </div>
                </div>

                <div id="question-button-container">
                    <div id='answerStyleWrapper'>
                        {answerStyle}
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
                            disabled={question.index === data.questions.length - 1 || !isEnabled}
                        >Next</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Questions

function QuestionOption(props) {
    return <div id={props.option} onClick={props.handler} className={props.selected === props.option ? 'selected' : 'unselected'}>{props.option}</div>
}