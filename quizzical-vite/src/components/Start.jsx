import React from "react"

export default function Start(props) {
    return (
        <div className="start-page">
            <h1>Quizzical</h1>
            <p>Can you score 5/5 on this general knowledge quiz?</p>
            <button className="start-page-btn" onClick={props.newQuiz}>Start quiz</button>
        </div>
    )
}
