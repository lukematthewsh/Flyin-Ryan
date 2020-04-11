import React from 'react'

function QuestionCard({ question }) {
    const { inquery } = question
    return (
        <div>
            {inquery}
        </div>
    )
}

export default QuestionCard