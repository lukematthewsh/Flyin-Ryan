import React from 'react'

function QuestionCard(props) {
    return(
        <div id='questionCardContainer'>
            <div id='questionCard'>
                {props.question}

            </div>
        </div>
    )
}

export default QuestionCard