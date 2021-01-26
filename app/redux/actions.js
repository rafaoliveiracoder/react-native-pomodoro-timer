import {START_PAUSE_TIMER, UPDATE_TIMER, RESET_TIMER} from '../api/constants';

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