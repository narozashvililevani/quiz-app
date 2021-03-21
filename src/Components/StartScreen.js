
import { useState} from 'react'

const StartScreen = () => {
    const [questionQty, setQuestionqty] = useState(5)

    const startGame = () => {
        console.log(questionQty)
    }

    return (

        <div className="start-phase">

           <h2 className="start-phase__heading"> in this quiz you will be given random question about country,
            you must guess country based on flag or capitol.</h2>

            <p className="start-phase__p">
                select quantity of questions
            </p>

            <div className="select-qty">

                <label>
                    5
                    < input type="radio" name="questions-qty" value="5"  defaultChecked
                    onChange={ e =>  setQuestionqty(Number(e.target.value))}    />
                </label>

                <label>
                    10
                    < input type="radio" name="questions-qty" value="10" 
                    onChange={ e =>  setQuestionqty(Number(e.target.value))}    />
                </label>

                <label>
                    15
                    < input type="radio" name="questions-qty" value="15" 
                    onChange={ e =>  setQuestionqty(Number(e.target.value))}    />
                </label>

              
            </div>

            <button className="start-quiz" onClick={startGame}>
                Start quiz!
            </button>
        </div>
    )
}

export default StartScreen;