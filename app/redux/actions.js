import {UPDATE_TIME, RESET_TIME} from '../api/constants';

export const updateTime = () => ({
    type: UPDATE_TIME,
    payload: '',
})

export const resetTime = resetStatus => ({
    type: RESET_TIME,
    payload: resetStatus,
})