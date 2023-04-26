import React from "react"

export default function Score(props) {
    return (
        <div className="bottom-container">
            {props.requestedToCheck ? 
                <div>
                    <p>You scored {props.correctAnswersNum}/5 correct answers</p>
                    <button className="score-btn" onClick={props.playAgain}>Play again</button>
                </div> 
                :
                <div>
                    <button className="score-btn" onClick={props.checkAnswers}>
                    Check answers</button>
                </div>
            }
        </div>
    )
}
