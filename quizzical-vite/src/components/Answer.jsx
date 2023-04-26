import React from "react"

export default function Answer(props) {
    let selected = props.isChosen ? "chosen" : ""
    
    let answerClass = (
        props.requestedToCheck && !props.isChosen && !props.isCorrect ? "not-selected" :
        props.requestedToCheck && props.isChosen && !props.isCorrect ? "incorrect" :
        props.requestedToCheck && props.isCorrect ? "correct" : ""
    )
        
    return (
        <button 
            className={`answer-btn ${selected} ${answerClass}`}
            onClick={() => props.handleAnswerClick(props.id)}
            {...(props.isDisabled ? {disabled: true} : "")}
        >
            {props.text}
        </button>
    )
}
