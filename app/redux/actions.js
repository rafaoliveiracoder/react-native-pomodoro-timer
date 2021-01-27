import {START_PAUSE_TIMER, UPDATE_TIMER, RESET_TIMER, SET_DEFAULT_WORK_TIME, SET_DEFAULT_BREAK_TIME, SET_DEFAULT_VALUES, SET_PAUSE_STATE, UPDATE_SETTINGS} from '../api/constants';

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

//DEFAULT VALUES
export const updateDefaultWorkTime = newTime => ({
    type: SET_DEFAULT_WORK_TIME,
    payload: newTime,
})

export const updateDefaultBreakTime = newTime => ({
    type: SET_DEFAULT_BREAK_TIME,
    payload: newTime,
})

export const backToDefaults = () => ({
    type: SET_DEFAULT_VALUES,
    payload: '',
})

export const togglePauseOnStatusChange = status => ({
    type: SET_PAUSE_STATE,
    payload: status,
})

export const updateSettings = settings => ({
    type: UPDATE_SETTINGS,
    payload: settings,
})

