import React, { useReducer } from 'react'
import '../Css/Questions.css'
import data from './QuestionsData.js'
import QuestionCard from './QuestionCard.js'
import { database, auth } from '../firebaseApp.js'
import Progress from './ProgressBar'
import styled from 'styled-components'
import backButton from '../images/arrow-invert.png'
import { Link } from 'react-router-dom'
import helpButton from '../images/help.svg'
import HelpModal from './helpModal';

const ProgressBarContainer = styled.div`
width: 300px;
`;


class Questions extends React.Component {
    constructor(props) {
        super(props)

        this.textAnswers = React.createRef()

        this.state = {
            question: data.questions[0],
            category: data.questions[0].folder,
            help: data.questions[0].help,
            userAnswers: '',
            selectedAnswer: '',
            percentage: 7.692,
            cvArray: [],
            show: false
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
            percentage: this.state.percentage + 7.692,
            question: data.questions[newIndex],
            category: data.questions[newIndex].folder,
            help: data.questions[newIndex].help,
            userAnswers: ''
        })

        if (this.state.category.includes('Core Value Questions')) {
            if (this.textAnswers.current) {
                this.textAnswers.current.value = null
            }

        }
        this.checkForAnswer(newIndex)
    }

    prevQuestion = async () => {
        const newIndex = this.state.question.index - 1;
        let userAnswers = {}
        userAnswers[`/users/${this.props.user.uid}/${this.state.question.folder}`] = { question: this.state.question.inquery, answer: this.state.userAnswers }

        if (this.state.userAnswers) {
            await database.ref().update(userAnswers)
        }
        this.setState({
            percentage: this.state.percentage - 7.692,
            question: data.questions[newIndex],
            category: data.questions[newIndex].folder,
            userAnswers: ''
        })

        if (this.state.category.includes('Core Value Questions')) {
            if (this.textAnswers.current) {
                this.textAnswers.current.value = null
            }
        }
        this.checkForAnswer(newIndex)
    }

    async componentDidMount() {
        this.checkForAnswer()
        let cvAnswers = await database.ref(`/users/${this.props.user.uid}/Key Core Values`).once('value').then(function (snapshot) {
            let currentUserAnswers = snapshot.val()
            return currentUserAnswers
        })
        if (cvAnswers) {
            this.setState({
                cvArray: cvAnswers || ''
            })
        }
    }

    cvSubmit = async () => {
        let cvArray = this.state.cvArray
        let newCVArray = cvArray.concat([this.state.userAnswers])
        this.setState({
            userAnswers: '',
            cvArray: newCVArray
        })
        if (this.textAnswers.current) {
            this.textAnswers.current.value = null
        }
    }

    removeCV = (event) => {
        let cvArray = this.state.cvArray
        let removeTarget = event.target.textContent
        let targetIndex = cvArray.indexOf(removeTarget)
        cvArray.splice(targetIndex, 1)
        this.setState({
            cvArray: cvArray
        })
    }

    questionsFinish = async () => {
        let userAnswers = {}

        userAnswers[`/users/${this.props.user.uid}/${this.state.question.folder}`] = this.state.cvArray

        await database.ref().update(userAnswers)
    }

    selected = (event) => {
        this.setState({
            selectedAnswer: event.target.id,
            userAnswers: event.target.id
        })
    }

    canBeSubmitted = () => {
        if (this.state.userAnswers) {
            return true
        } else { return false }
    }

    checkForAnswer = () => {
        let uid = auth().currentUser.uid;
        let textAnswers = this.textAnswers
        let _this = this
        return database.ref('/users/' + uid).once('value').then(function (snapshot) {
            let currentUserAnswers = snapshot.val()
            if (currentUserAnswers) {
                if (currentUserAnswers[_this.state.category] && !_this.state.category.includes('Core Value Questions')) {
                    if (currentUserAnswers[_this.state.category].answer) {
                        let prevAnswer = currentUserAnswers[_this.state.question.folder].answer
                        _this.setState({
                            userAnswers: prevAnswer,
                            selectedAnswer: prevAnswer
                        })
                    }
                } else if (currentUserAnswers[_this.state.question.folder]) {
                    if (currentUserAnswers[_this.state.question.folder].answer) {
                        textAnswers.current.value = currentUserAnswers[_this.state.question.folder].answer
                        _this.setState({
                            userAnswers: textAnswers.current.value
                        })
                    }
                }
            }
        })

    }
    openHelp = (e) => {
        this.setState({
            show: !this.state.show
        })  
    }
    closeHelp = (e)=>{
        this.setState({
            show: !this.state.show
        })
    }
    render() {
        const { question } = this.state;
        const category = this.state.category
        const cvArray = this.state.cvArray
        const isEnabled = this.canBeSubmitted();
        let answerStyle
        let headerText
        let nextButton
        let reviewAnswer
        if (!category.includes('Core Value Questions') && !category.includes('Key')) {
            headerText = 'Demographic Questions'
            answerStyle = question.options.map(option => {
                return <QuestionOption handler={this.selected} key={option} id={option} selected={this.state.selectedAnswer} option={option} />
            })
            nextButton = <button
                id="nextButton"
                onClick={this.nextQuestion}
                disabled={!isEnabled}
            >Next</button>
        } else if (category.includes('Core Value Questions')) {
            headerText = 'Core Value Questions'
            answerStyle = <div id="textinput">
                <textarea id="textAnswers" placeholder="Write response here..." ref={this.textAnswers} onChange={this.enterText} cols="25" rows="6"></textarea>
            </div>
            nextButton = <button
                id="nextButton"
                onClick={this.nextQuestion}
                disabled={!this.state.userAnswers || !isEnabled}
            >Next</button>
        } else if (category.includes('Key Core')) {
            headerText = 'My Core Values: Time to Start Writing'
            answerStyle = <div id="finalTextinput">
                <textarea id="finalTextAnswers" placeholder="Please enter one Value at a time." ref={this.textAnswers} value={this.state.userAnswers} onChange={this.enterText} cols="37" rows="5"></textarea>
                <button
                    id='cvSubmit'
                    onClick={this.cvSubmit}
                >Submit</button>
            </div>
            reviewAnswer =
                <div id='reviewCV'>
                    {this.state.cvArray.map((answer) => (
                        <div onClick={this.removeCV}>{answer}</div>
                    ))}
                </div>
            nextButton = <Link to='/dashboard' id="nextButton"><button onClick={this.questionsFinish} id='finishButton'
            >Finish</button> </Link>
        }

        return (

            <div id="questions-wrapper">
                <div id='buttonWrapper'>
                    <img id='backButton'
                        onClick={question.index !== 0 ? this.prevQuestion : null}
                        src={backButton}
                        alt='back button' />
                    <img id='helpButton'
                        onClick={this.openHelp}
                        src = {helpButton}
                        alt= 'help button' />
                </div>
                <HelpModal show ={this.state.show} help={this.state.help} closeHelp={this.closeHelp}/>
                <ProgressBarContainer>
                    <div id='questionTitleWrapper'>
                        <div id='questionTitle'>{headerText}</div>
                    </div>
                    <Progress percentage={this.state.percentage} />
                </ProgressBarContainer>

                <div id='question-container'>
                    <div id="questions">
                        <QuestionCard question={question} category={this.state.category} />
                    </div>
                </div>

                <div id="question-button-container">
                    <div id='answerStyleWrapper'>
                        {answerStyle}
                        {reviewAnswer}
                    </div>
                    <div id="question-inner-container">
                        {nextButton}
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