import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    startPhase: true,
    quizRunning: false,
    questionQty: null,
    quizEnd: false
}

const quizPhasesSlice = createSlice({
    name:'quizPhases',
    initialState,
    reducers: {
        startQuiz: (state, qty ) => {
            state.startPhase = false
            state.quizRunning = true
            state.questionQty = qty
        },
        finishQuiz: state => {
            state.startPhase = false
            state.quizRunning = false
            state.questionQty = null
            state.quizEnd = true
        },
        resetQuiz: state => {
            state.startPhase = true
            state.quizRunning = false
            state.questionQty = null
            state.quizEnd = false
        },
    }
});

export const { startQuiz, finishQuiz, resetQuiz } = quizPhasesSlice.actions

export default quizPhasesSlice.reducer


