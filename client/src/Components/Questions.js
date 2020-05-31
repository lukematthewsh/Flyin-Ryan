import React, { useReducer } from 'react'
import '../Css/Questions.css'
import data from './QuestionsData.js'
import QuestionCard from './QuestionCard.js'
import { database, firebaseApp, auth } from '../firebaseApp.js'
import Progress from './ProgressBar'
import styled from 'styled-components'
import backButton from '../images/arrow-invert.png'
import { Link } from 'react-router-dom'
import helpButton from '../images/help.svg'
import HelpModal from './helpModal';
import nextArrow from '../images/white_arrow.png'
import add from '../images/plus.png'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import BGimg from '../images/blendFR.png'

const ProgressBarContainer = styled.div`
width: 300px;
`;


class Questions extends React.Component {
    constructor(props) {
        super(props)

        this.textAnswers = React.createRef()

        this.state = {

            question: '',
            category: '',
            help: '',
            userAnswers: '',
            selectedAnswer: '',
            percentage: 7.692,
            cvArray: [],
            show: false,

        }
    }

    enterText = (event) => {
        this.setState({ userAnswers: event.target.value })
    }

    changeDate = (date) => {
        this.setState({
            userAnswers: date
        })

    }

    nextQuestion = async () => {
        const newIndex = this.state.question.index + 1;
        let userAnswers = {}
        userAnswers[`/users/${this.props.user.uid}/${this.state.question.folder}`] = { question: this.state.question.inquiry, answer: this.state.userAnswers }


        if (this.state.userAnswers) {
            await database.ref().update(userAnswers)
        }
        this.setState({
            percentage: this.state.percentage + 7.692,
            question: this.state.data.questions[newIndex],
            category: this.state.data.questions[newIndex].folder,
            help: this.state.data.questions[newIndex].help,
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
        userAnswers[`/users/${this.props.user.uid}/${this.state.question.folder}`] = { question: this.state.question.inquiry, answer: this.state.userAnswers }

        if (this.state.userAnswers) {
            await database.ref().update(userAnswers)
        }
        this.setState({
            percentage: this.state.percentage - 7.692,
            question: this.state.data.questions[newIndex],
            category: this.state.data.questions[newIndex].folder,
            help: this.state.data.questions[newIndex].help,
            userAnswers: ''
        })

        if (this.state.category.includes('Core Value Questions')) {
            if (this.textAnswers.current) {
                this.textAnswers.current.value = null
            }
        }
        this.checkForAnswer(newIndex)
    }

    goToCV = async () => {
        const newIndex = 13;
        let userAnswers = {}
        userAnswers[`/users/${this.props.user.uid}/${this.state.question.folder}`] = { question: this.state.question.inquiry, answer: this.state.userAnswers }

        if (this.state.userAnswers) {
            await database.ref().update(userAnswers)
        }
        this.setState({
            percentage: 100,
            question: this.state.data.questions[newIndex],
            category: this.state.data.questions[newIndex].folder,
            help: this.state.data.questions[newIndex].help,
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
        let cvAnswers = await database.ref(`/users/${this.props.user.uid}/Key Core Values`).once('value').then(function (snapshot) {
            let currentUserAnswers = snapshot.val()
            return currentUserAnswers
        })
        if (cvAnswers) {
            this.setState({
                cvArray: cvAnswers || '',

            })
        }
        if (this.props.data) {
            this.setState({
                data: this.props.data,
                question: this.props.data.questions[0],
                category: this.props.data.questions[0].folder,
                help: this.props.data.questions[0].help,
            })
            this.checkForAnswer()
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
        let uid = firebaseApp.auth().currentUser.uid;
        let textAnswers = this.textAnswers
        let _this = this
        return database.ref('/users/' + uid).once('value').then(function (snapshot) {
            let currentUserAnswers = snapshot.val()
            if (currentUserAnswers) {
                if (currentUserAnswers[_this.state.category]) {
                    if (currentUserAnswers[_this.state.category] === currentUserAnswers.Age) {
                        let prevAnswer = currentUserAnswers[_this.state.question.folder].answer
                        _this.setState({
                            userAnswers: new Date(prevAnswer),

                        })
                    } else if (currentUserAnswers[_this.state.category] && !_this.state.category.includes('Core Value Questions')) {
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
            }
        })

    }
    openHelp = (e) => {
        this.setState({
            show: !this.state.show
        })
    }
    closeHelp = (e) => {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        const { question } = this.state;
        const category = this.state.category
        const isEnabled = this.canBeSubmitted();
        let answerStyle
        let headerText
        let nextButton
        let reviewAnswer
        let redirectText
        let rememberThis
        if (this.state.data) {
            if (category.includes('Age') && !category.includes('Key')) {
                headerText = 'Demographic Questions'
                answerStyle = <div id='dateWrapper'>
                    <DatePicker
                        id='datePicker'
                        selected={this.state.userAnswers}
                        onChange={date => this.changeDate(date)}
                        placeholderText='MM/DD/YYYY'
                    />
                    <div id='text-line-underline'></div>
                </div>
                nextButton = <div
                    onClick={this.nextQuestion}
                    disabled={!isEnabled}
                ><img src={nextArrow} style={{ maxWidth: "45px" }} /></div>
            } else if (category.includes('Sex') && !category.includes('Key')) {
                headerText = 'Demographic Questions'
                answerStyle = question.options.map(option => {
                    return <QuestionOption handler={this.selected} key={option} id={option} selected={this.state.selectedAnswer} option={option} />
                })
                nextButton = <div
                    onClick={this.nextQuestion}
                    disabled={!isEnabled}
                ><img src={nextArrow} style={{ maxWidth: "45px" }} /></div>
            } else if (category.includes('Redirect') && !category.includes('Key')) {
                headerText = 'Lets Get Started'
                redirectText = <div>
                    <div id='redirect-text'>
                        We will now guide you through the process of determining your core values with 10 prompts designed to help you take ownership of this process. You may skip any or all of these questions by clicking the arrow button.
                    </div>
                    <br></br>
                    <div id='rememberThingsWrapper'>
                        <div id='rememberThings'>
                            <div id='rememberTitle'>Things to Remember</div>
                            <ul>
                                <li>
                                    Keep it Real: Make sure your core values relect the real you.
                                </li>
                                <li>
                                    This is potentially a lifetime journey. Take whatever time you need to compose your core values.
                                </li>
                                <li>
                                    You can add, delete, or modify any of your core values at any time. Not just in this app, but throughout your life!
                                </li>
                                <li>
                                    consider sharing your core values with the Flyin Ryan Foundation for us to post to our social media pages. Let your core values be an inspiration to others!
                                </li>
                                <li>
                                    Enjoy the process!
                                </li>
                            </ul>
                        </div>
                    </div>
                    <br></br>
                    <div id='redirectInstructionsWrapper'>
                        <div id='redirectInstructions'>
                            Hit the arrow button below if you would like to see the helpful hint questions or click <div onClick={this.goToCV}>[HERE]</div> to go straight to writing your core values.
                        </div>
                    </div>
                </div>
                nextButton = <div
                    onClick={this.nextQuestion}
                ><img src={nextArrow} style={{ maxWidth: "45px" }} /></div>
            } else if (category.includes('Core Value Questions')) {
                headerText = 'Core Value Questions'
                answerStyle = <div id="textinput">
                    <textarea id="textAnswers" placeholder="Write response here..." ref={this.textAnswers} onChange={this.enterText} cols="25" rows="6"></textarea>
                </div>
                nextButton = <div
                    onClick={this.nextQuestion}
                    disabled={!this.state.userAnswers || !isEnabled}
                ><img src={nextArrow} style={{ maxWidth: "45px" }} /></div>
            } else if (category.includes('Key Core')) {
                headerText = 'My Core Values'
                answerStyle = <div id="finalTextinput">
                    <textarea id="finalTextAnswers" placeholder="Please enter one Value at a time." ref={this.textAnswers} value={this.state.userAnswers} onChange={this.enterText} cols="37" rows="5"></textarea>
                    <div
                        onClick={this.cvSubmit}
                    ><img src={add} /></div>
                </div>
                reviewAnswer =
                    <div id='reviewCV'>
                        {this.state.cvArray.map((answer) => (
                            <div onClick={this.removeCV}>{answer}</div>
                        ))}
                    </div>
                nextButton = <Link to='/dashboard' ><div onClick={this.questionsFinish} id='finishButton'
                ><img src={nextArrow} style={{ maxWidth: "45px" }} /></div> </Link>
            }
        }
        return (

            <div id="questions-wrapper">
                <div id='buttonWrapper'>
                    {question.index !== 0 ? <img id='backButton'
                        onClick={this.prevQuestion}
                        src={backButton}
                        alt='back button' /> : <Link to="/"><img id='backButton'
                            src={backButton}
                            alt='back button' /></Link>}

                    {question.index > 2 ? <img id='helpButton'
                        onClick={this.openHelp}
                        src={helpButton}
                        alt='help button' /> : <></>}
                </div>
                <HelpModal show={this.state.show} help={this.state.help} closeHelp={this.closeHelp} />
                <ProgressBarContainer>
                    <div id='questionTitleWrapper'>
                        <div id='questionTitle'>{headerText}</div>
                    </div>
                    <Progress percentage={this.state.percentage} />
                </ProgressBarContainer>
                {this.state.category !== "Redirect"
                    ? <div>
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
                    : <div>
                        <div id='redirect-text-wrapper'>
                            <div>
                                {redirectText}
                            </div>
                        </div>
                        <div id="question-button-container-redirect">
                            <div id="question-inner-container-redirect">
                                {nextButton}
                            </div>

                        </div>
                    </div>}

            </div>
        )
    }
}

export default Questions

function QuestionOption(props) {
    return <div id={props.option} onClick={props.handler} className={props.selected === props.option ? 'selected answerOption' : 'unselected answerOption'}>{props.option}</div>
}