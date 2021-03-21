
import { useEffect, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';

// actions 
import { fetchAllQuestions } from '../Slices/allQuestions'

// components
import  AnswerBtn from './AnswerBtn';

const QuizForm = () => {
    const dispatch = useDispatch();

    // question and answers 
    const { loading, hasErrors, allQuestions } = useSelector( state => state.allQuestions)

    //console.log(loading,hasErrors, allQuestions[0])



    // message
    const [messageShown, setMessageShown] = useState(false);
    const [messageText, setMessageText] = useState("");
    
    // game scores
    const [initialQuestionQty, setInitialQuestionQty] = useState(5);
    const [questionLeft, setQuestionLeft] = useState(initialQuestionQty);
    const [score, setScore] = useState(0);
  

    // question type
    const [questionType, setQuestionType] = useState(1);

    // if buttons click able
    const [btnsClickable, setBtnsClickable] = useState(true);


    // get All Country - Set random Country and random answers
    useEffect( ()=> {
        dispatch(fetchAllQuestions(initialQuestionQty))
    },[])



    // Check answer 
    const checkAnswer = ( selectedCountry, btn) => {
        // set btns unclickable 
        setBtnsClickable(false)

        if(selectedCountry.name === allQuestions[0].question.name) {
            btn.classList.add('correct')
            setScore(score + 1)
            setMessageText("Correct Answer!")
        }else {                     
            btn.classList.add('incorrect')
            document.querySelector('.right').classList.add('was-correct')
            setMessageText("incorrect Answer!")
        }

        // change question QTY
        setQuestionLeft(questionLeft - 1)
        // show message - till game score in plan
        setMessageShown(true)

    }
    // next question handler
    const handleNext = () => {
        // clear classes (  'unclickable', swaped to btnsClickable )
        let btns = document.querySelectorAll('.quiz-btn');
        for(let el of btns) {
            el.classList.remove('incorrect', 'correct', 'was-correct')
        }

        // disapear bottom
        setMessageShown(false)

        // get other question and answers

        // random question type ( gues country by capital or flag ) - if 0 capital , if 1 flag.
        let randomType = Math.floor(Math.random() * 2);
        setQuestionType(randomType)
 
        // make questions clickable 
        setBtnsClickable(true)

        if(questionLeft === 0) {
            console.log(`u scored  ${ ( score / initialQuestionQty  ) * 100 } % !`)
        }
    }

    return (
        <div className="quiz-form">
    
            <div className="scores">
                <h2>Current score:{score}</h2>
                <h2>Turns left: {questionLeft}</h2>
            </div>
            


            {loading && <p>questions loading...</p>}
            {hasErrors && <p>questions failed to fetch from api</p>}

            {/* if data is recived */}
            {allQuestions.length > 0 && 
            <div className="quiz-form__main">
                <div className="quiz-form__question">
                    {questionType === 0 ? `${allQuestions[0].question.capital} is the capitol of` :
                    <div>
                        <img src={allQuestions[0].question.flag} /> 
                            which country does this flag belong to ?
                    </div>
                    }
                
                </div>

                <div className="quiz-form__content">
                
                    {allQuestions[0].answers.map( (answer, i) => {
                        return <AnswerBtn   checkAnswer={ btnsClickable ? (e) => checkAnswer(answer, e.target) : undefined }
                                            correct={answer.name === allQuestions[0].question.name ? "right" : "wrong" } 
                                            key={"answer-btn-" + i} 
                                            order={i} 
                                            answer={answer.name} />
                    })}

                    { messageShown && <div className="quiz-form__footer">
                        <p className="message">{messageText}</p>
                        <button className="next" onClick={handleNext}>next</button>
                    </div> }

                </div>
            </div> }

        </div>
    )
}

export default QuizForm