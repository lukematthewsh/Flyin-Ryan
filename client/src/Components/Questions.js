import React from 'react'
import '../Css/Questions.css'
import data from './data.js'
import QuestionCard from './QuestionCard.js'

class Questions extends React.Component {
    constructor(props) {
        super (props)

        this.state = {
            questions: data.questions,
            question: data.questions[0]
        }
    }

    nextQuestion = () => {
        const newIndex = this.state.question.index+1;
        this.setState({
            question: data.questions[newIndex]
        })
    }

    prevQuestion = () => {
        const newIndex = this.state.question.index-1;
        this.setState({
            question: data.questions[newIndex]
        })
    }

    render() {
        return(
            <div id='question-container'>
                <button
                    onClick={this.nextQuestion}
                    disabled={this.state.question.index === data.questions.length-1}
                    >Next</button>
                <button 
                    onClick={this.prevQuestion}
                    disabled={this.state.question.index === 0}
                    >Prev</button>

                <QuestionCard question={this.state.question} />
            </div>
        )
    }
}

export default Questions
