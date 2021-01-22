import {SET_CLOCK, START_PAUSE_CLOCK, STOP_CLOCK, UPDATE_TIMER, RESET_TIMER, CHANGE_WORK_STATUS, RESET_WORK_STATUS} from '../api/constants';

export const changeWorkStatus = () =>({
    type: CHANGE_WORK_STATUS,
    payload:''
})

export const resetWorkStatus = () =>({
    type: RESET_WORK_STATUS,
    payload:''
})

export const setInitialWorkTime = initialTime =>({
    type: SET_INITIAL_WORK_TIME,
    payload: initialTime
})

export const setInitialBreakTime = initialTime =>({
    type: SET_INITIAL_BREAK_TIME,
    payload: initialTime
})

export const setClock = (dispatch, func) =>({
    type: SET_CLOCK,
    payload:{dispatch,func}
})

export const startPauseClock = () =>({
    type: START_PAUSE_CLOCK,
    payload:''
})

export const stopClock = () =>({
    type: STOP_CLOCK,
    payload:''
})

export const updateTimer = () => ({
    type: UPDATE_TIMER,
    payload: '',
})

export const resetTimer = resetStatus => ({
    type: RESET_TIMER,
    payload: resetStatus,
})