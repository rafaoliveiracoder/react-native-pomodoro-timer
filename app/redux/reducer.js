import { combineReducers } from 'redux';
import {DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME, CHANGE_WORK_STATUS, RESET_WORK_STATUS, SET_CLOCK, STOP_CLOCK, START_PAUSE_CLOCK, UPDATE_TIMER, RESET_TIMER} from '../api/constants';
import { Timer } from '../utils';


//controls WORK and BREAK times
const workStatusReducer = (state=true, action) => {

    switch(action.type){
        case CHANGE_WORK_STATUS:
            return !state;
        case RESET_WORK_STATUS:
            return true;
        default: 
        return state;
    }
}

const initialValuesReducer = (state = {initialWorkTime: DEFAULT_WORK_TIME, initialBreakTime: DEFAULT_BREAK_TIME}, action) => {
    return state;
}

//The tic tac guy
const clockReducer = (state = {timer:new Timer(), isRunning:false}, action) => {
    switch(action.type){
        case SET_CLOCK:
            state.timer.setDispatcher(action.payload.dispatch, action.payload.func) 
            break;
        case START_PAUSE_CLOCK:
            !state.timer.isRunning?state.timer.start():state.timer.stop();
            state.isRunning=state.timer.isRunning;
            break;
        case STOP_CLOCK:
            state&&state.timer.stop();
            state.isRunning=state.timer.isRunning; 
            break;
        default:
            return state;
    }
}

const timerReducer = (state = DEFAULT_WORK_TIME, action) => {
    switch(action.type){

        //Decreases timer in one second
        case UPDATE_TIMER:
        return  state.sec>0?
                    state.min>=0?
                    ({min: state.min, sec: state.sec-1})
                    :state
                :state.min>0?
                    ({min: state.min-1, sec: 59})
                    :state

        //Resets timer values with initialValues set in initialValuesReducer
        case RESET_TIMER:
        return action.payload;

        default:
        return state;
    }
}

const reducer = combineReducers({
    workStatus: workStatusReducer,
    initialTimes: initialValuesReducer,
    timer: timerReducer,
    clock: clockReducer
})

export default reducer;