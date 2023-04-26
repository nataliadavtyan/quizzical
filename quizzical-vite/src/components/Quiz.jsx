import React from "react"
import Answer from "./Answer"

export default function Quiz(props) {   
    
    let answers = props.answers.map(answer => {
        return (
            <Answer 
                key={answer.id}
                id={answer.id}
                text={answer.text}
                isChosen={answer.isChosen}
                isCorrect={answer.isCorrect}
                handleAnswerClick={props.handleAnswerClick}
                requestedToCheck={props.requestedToCheck}
                isDisabled={props.isDisabled}
            />
        )
    })
    
    return (
         <div className="question-container">
            <h3 className="question">{props.question}</h3>
            <div className="answers-container">
                {answers}
            </div>
        </div>
    )
}
