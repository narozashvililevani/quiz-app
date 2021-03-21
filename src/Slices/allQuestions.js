import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    hasErrors: false,
    allQuestions: []
}

const allQuestionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        getQuestions: state => {
            state.loading = true
        },
        getQuestionsSuccess: (state, { payload }) => {
            state.allQuestions = payload
            state.loading = false
            state.hasErrors = false
        },
        getQuestionsFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
    }
});


export const { getQuestions, getQuestionsSuccess, getQuestionsFailure} = allQuestionsSlice.actions

export default  allQuestionsSlice.reducer

// action
export const fetchAllQuestions = (qty) => {
    return async dispatch => {
        dispatch(getQuestions());

        try {
            const res = await fetch('https://restcountries.eu/rest/v2/all')
            const data = await res.json()

            // random 10cty + rest of the countries
            const [randomCountries , restCountries] = getRandomCountries( qty, data);

            // create arr of all questeions + answers   { question{} , answers[] }
            const questionsAndAnswers = randomCountries.map( randomQuestion => {
                return {
                    question: randomQuestion,
                    answers: generateAnswers( randomQuestion, restCountries)
                }
            })

            // SET to state
            dispatch(getQuestionsSuccess(questionsAndAnswers))

        } catch (error) {
            dispatch(getQuestionsFailure());
            console.log(error);
        }
    }
}

// get qty x random country + rest of the (250 - random * n);
function getRandomCountries( qty ,allCountry) {
    let countriesLeft = allCountry;
   
    let randomCountries = []
 
    for(let i = 0;  i < qty; i++) {
        // get random 
        const randomCountry = countriesLeft[Math.floor(Math.random() * countriesLeft.length)];

        // push randomCountries[] with random
        randomCountries.push(randomCountry)
       
        // exclude random country from
        countriesLeft = countriesLeft.filter( e =>  {
            return e.alpha3Code !== randomCountry.alpha3Code
        })
    }

    return [randomCountries, countriesLeft]
}

// get answers with random question (includes answer from random question)
function generateAnswers(randomCountry, allCountries) {

    // alpha3Cod === 3digit shorten name of country (data.OBJ > {})
    let wrongCountries = allCountries.filter(country => country.alpha3Code !== randomCountry.alpha3Code); 
    
    const countOfAnswers = 4;
    const positionOfCorrectAnswer = Math.floor(Math.random() * countOfAnswers);
    const answers = []; 
    for(let i=0; i< countOfAnswers; i++) {
       if (i === positionOfCorrectAnswer) {
          answers.push({ name: randomCountry.name,
            alpha3Code: randomCountry.alpha3Code,
            capital: randomCountry.capital });
       } else {
         let randomAnswer = wrongCountries[Math.floor(Math.random() * wrongCountries.length)]; 
          wrongCountries = wrongCountries.filter(country => country.alpha3Code !== randomAnswer.alpha3Code); 
          answers.push({name: randomAnswer.name,
                        alpha3Code: randomAnswer.alpha3Code,
                        capital: randomAnswer.capital });
                       
                    
       }
    }
    return answers;
};
