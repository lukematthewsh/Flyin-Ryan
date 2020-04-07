import React from 'react'
import '../Css/Questions.css'
import data from './QuestionsData.js'
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
        const {question} = this.state;
        return(
            <div id='question-container'>
                <QuestionCard question={question} />
                <button
                    onClick={this.nextQuestion}
                    disabled={question.index === data.questions.length-1}
                    >Next</button>
                <button 
                    onClick={this.prevQuestion}
                    disabled={question.index === 0}
                    >Prev</button>
                
            </div>
        )
    }
}

export default Questions
