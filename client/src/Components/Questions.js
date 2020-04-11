import React, { useReducer } from 'react'
import '../Css/Questions.css'
import data from './QuestionsData.js'
import QuestionCard from './QuestionCard.js'
import { database, auth } from '../firebaseApp.js'
import Progress from './ProgressBar'
import styled from 'styled-components'


const ProgressBarContainer = styled.div`
width: 300px;
margin-top: 11vh;
`;

class Questions extends React.Component {
    constructor(props) {
        super(props)

        this.textAnswers = React.createRef()

        this.state = {
            question: data.questions[0],
            category: data.questions[0].folder,
            userAnswers: null,
            selectedAnswer: null,
            percentage: 5.263,
    
        }
    }

    enterText = (event) => {
        this.setState({ userAnswers: event.target.value })
    }

    nextQuestion = async () => {
        const newIndex = this.state.question.index + 1;
        let userAnswers = {}
        userAnswers[`/users/${this.props.user.uid}/${this.state.question.folder}`] = { question: this.state.question.inquery, answer: this.state.userAnswers }


        if (this.state.userAnswers) {
            await database.ref().update(userAnswers)
        }
        this.setState({
            percentage: this.state.percentage + 5.623,
            question: data.questions[newIndex],
            category: data.questions[newIndex].folder,
            userAnswers: null
        })

        if (this.state.category.includes('Core Value Questions')) {
            if (this.textAnswers.current) {
                this.textAnswers.current.value = null
            }

            this.checkForAnswer(newIndex)
        }
    }

    prevQuestion = async () => {
        const newIndex = this.state.question.index - 1;
        let userAnswers = {}
        userAnswers[`/users/${this.props.user.uid}/${this.state.question.folder}`] = { question: this.state.question.inquery, answer: this.state.userAnswers }

        if (this.state.userAnswers) {
            await database.ref().update(userAnswers)
        }
        this.setState({
            percentage: this.state.percentage - 5.263,
            question: data.questions[newIndex],
            category: data.questions[newIndex].folder,
            userAnswers: null
        })

        if (this.state.category.includes('Core Value Questions')) {
            if (this.textAnswers.current) {
                this.textAnswers.current.value = null
            }

            this.checkForAnswer(newIndex)
        }
    }

    selected = (event) => {
        this.setState({
            selectedAnswer: event.target.id,
            userAnswers: event.target.id
        })
        console.log(this.state.selectedAnswer)
    }

    canBeSubmitted = () => {
        if (this.textAnswers.current) {
            return this.textAnswers.current.value.length > 0
        } else { return false }
    }

    checkForAnswer = () => {
        let uid = auth().currentUser.uid;
        let textAnswers = this.textAnswers
        let _this = this
        console.log(uid)
        return database.ref('/users/' + uid).once('value').then(function (snapshot) {
            let currentUserAnswers = snapshot.val()
            console.log(currentUserAnswers)

            if (currentUserAnswers[_this.state.question.folder]) {
                if (currentUserAnswers[_this.state.question.folder].answer) {
                    textAnswers.current.value = currentUserAnswers[_this.state.question.folder].answer
                    _this.setState({
                        userAnswers: textAnswers.value
                    })
                }
            }
        })

    }

    render() {
        const { question } = this.state;
        const category = this.state.category
        let answerStyle
        let headerText
        if (!category.includes('Core Value Questions')) {
            headerText = 'Demographic Questions'
            answerStyle = question.options.map(option => {
                return <QuestionOption handler={this.selected} id={option} selected={this.state.selectedAnswer} option={option} />
            })
        } else if (category.includes('Core Value Questions')) {
            headerText = 'Core Value Questions'
            answerStyle = <div id="textinput">
                <textarea id="textAnswers" placeholder="Write response here..." ref={this.textAnswers} onChange={this.enterText} cols="25" rows="6"></textarea>
            </div>
        }


        // const isEnabled = this.canBeSubmitted();
        return (

            <div id="questions-wrapper">
                <ProgressBarContainer>
                    <div id='questionTitle'>{headerText}</div>
                   <Progress percentage={this.state.percentage} />
                </ProgressBarContainer>
                
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
                            disabled={question.index === data.questions.length - 1 /*|| !isEnabled*/}
                        >Next</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Questions

function QuestionOption(props) {
    return <div id={props.option} onClick={props.handler} className={props.selected === props.option ? 'selected answerOption' : 'unselected answerOption'}>{props.option}</div>
}