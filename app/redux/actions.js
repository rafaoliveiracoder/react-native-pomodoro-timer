import {START_PAUSE_TIMER, UPDATE_TIMER, RESET_TIMER, SET_INITIAL_WORK_TIME, SET_INITIAL_BREAK_TIME} from '../api/constants';

//TIMER ACTIONS

export const startPauseTimer = (dispatch, func) =>({
    type: START_PAUSE_TIMER,
    payload:{dispatch,func}
})

export const updateTimer = () => ({
    type: UPDATE_TIMER,
    payload: '',
})

export const resetTimer = () => ({
    type: RESET_TIMER,
    payload: '',
})

//INITIAL VALUES
export const updateInitialWorkTime = newTime => ({
    type: SET_INITIAL_WORK_TIME,
    payload: newTime,
})

export const updateInitialBreakTime = newTime => ({
    type: SET_INITIAL_BREAK_TIME,
    payload: newTime,
})

