import React from "react"
import Confetti from "react-confetti"
import he from "he"
import { v4 as uuidv4 } from "uuid"
import Background from "./components/Background"
import Start from "./components/Start"
import Loading from "./components/Loading"
import Quiz from "./components/Quiz"
import Score from "./components/Score"

export default function App() {
    const [quiz, setQuiz] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [quizIsRendered, setQuizIsRendered] = React.useState(false)
    const [requestedToCheck, setRequestedToCheck] = React.useState(false)
    const [correctAnswersNum, setCorrectAnswersNum] = React.useState(0)
    const [isDisabled, setIsDisabled] = React.useState(false)
    const [gamesPlayed, setGamesPlayed] = React.useState(0)

    // Get new quiz and meanwhile render Loading screen
    function newQuiz() {
        setIsLoading(true)
        setGamesPlayed(prevGamesPlayed => prevGamesPlayed + 1)
    }
    
    // Get new quiz data (depends on the number of games played)
    React.useEffect(() => {
        if (isLoading) {
            getQuizData()
        }
    }, [gamesPlayed])
    
    // Fetch API and set quiz with new quiz data
    function getQuizData() {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(data => {
                const quizArray = data.results.map(element => {
                    return {
                        question: he.decode(element.question),
                        answers: [
                            ...element.incorrect_answers.map(answer => ({
                                text: he.decode(answer),
                                isCorrect: false,
                                isChosen: false,
                                id: uuidv4()
                            })),
                            {
                                text: he.decode(element.correct_answer),
                                isCorrect: true,
                                isChosen: false,
                                id: uuidv4()
                            }
                        ].sort( () => 0.5 - Math.random() )
                    }
                })
            setQuiz(quizArray)
            setIsLoading(false)
            setQuizIsRendered(true)
            })
    }

    // Find the answer by it's id and change it to isChosen: true
    // Set quiz to the updated array of objects
    function handleAnswerClick(id) {
        setQuiz(prevQuiz => {
            let updatedQuiz = prevQuiz.map(element => {
                if (element.answers.some(el => el.id === id)) {
                    let updatedAnswers = element.answers.map(answer => {
                        return id === answer.id ? 
                            {...answer, isChosen: true} : 
                            {...answer, isChosen: false}
                    })
                    return {
                        ...element,
                        answers: updatedAnswers
                    }
                }
                else {
                    return element
                }
            })
            return updatedQuiz
        })
    }
    
    // Set requestedToCheck to true so we can apply styles
    // Count the number of correct answers
    function checkAnswers() {
        setRequestedToCheck(true)
        quiz.forEach(element => {
            element.answers.forEach(answer => {
                if (answer.isChosen && answer.isCorrect) {
                    setCorrectAnswersNum(prevCorrectAnswersNum => prevCorrectAnswersNum + 1)
                }
                setIsDisabled(true)
            })
        })
    }
    
    // Reset all states and render new quiz
    function playAgain() {
        setQuizIsRendered(false)
        setRequestedToCheck(false)
        setCorrectAnswersNum(0)
        setIsDisabled(false)
        newQuiz()
    }

    // Quiz component
    const quizQuestions = quiz.map(element => {
        return (
            <Quiz 
                key={element.question}
                question={element.question}
                answers={element.answers}
                handleAnswerClick={handleAnswerClick}
                requestedToCheck={requestedToCheck}
                isDisabled={isDisabled}
            />        
        )
    })
            
    return (
        <div className="main">
            <Background />
            {!isLoading && !quizIsRendered && <Start newQuiz={newQuiz} />}
            {isLoading && <Loading />}
            {quizIsRendered &&
                <div className="quiz-container">
                    {quizQuestions}
                    <Score 
                        checkAnswers={checkAnswers}
                        requestedToCheck={requestedToCheck}
                        correctAnswersNum={correctAnswersNum}
                        playAgain={playAgain}
                    />
                </div>
            }
            {requestedToCheck && correctAnswersNum === 5 && <Confetti />}
        </div>
    )
}
