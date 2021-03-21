
import { combineReducers} from 'redux';

import allQuestions from './allQuestions';
import quizPhases from './quizPhases';

const rootReducer = combineReducers({
    allQuestions: allQuestions,
    quizPhases,
})

export default rootReducer;