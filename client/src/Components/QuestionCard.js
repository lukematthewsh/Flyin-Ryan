import React from 'react'

function QuestionCard({ question }) {
    const { inquiry } = question
    return (
        <div>
            {inquiry}
        </div>
    )
}

export default QuestionCard