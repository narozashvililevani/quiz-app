
const AnswerBtn = ( { order, answer, checkAnswer, correct } ) => {
    return (
        <button onClick={checkAnswer} className={`quiz-btn ${correct}`}>
            <span className="order">{order}</span>
            <span className="answer">{answer}</span>
            
            <div className="icons">
                <span> &#10004; </span>
                <span >&times;</span>
            </div>
         
        </button>
    )
}

export default AnswerBtn;