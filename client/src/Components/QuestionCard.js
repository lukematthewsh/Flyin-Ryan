import React from 'react'

function QuestionCard({ question }) {
    const {inquery} = question
    return (
        <div>
            <div>
                <span>
                    {inquery}
                </span>
            </div>
        </div>
    )
}

export default QuestionCard