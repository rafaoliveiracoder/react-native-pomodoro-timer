import {DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME, DEFAULT_PAUSEONCHANGE_STATE, START_PAUSE_TIMER, UPDATE_TIMER, RESET_TIMER, SET_DEFAULT_WORK_TIME, SET_DEFAULT_BREAK_TIME, SET_DEFAULT_VALUES, SET_PAUSE_STATE} from '../api/constants';
import { Timer } from '../utils';

const timerReducer = (state = { defaultWorkTime:DEFAULT_WORK_TIME,
                                defaultBreakTime:DEFAULT_BREAK_TIME,
                                timeToDisplay:DEFAULT_WORK_TIME,
                                isWorking:true, 
                                isRunning:false,
                                timerComplete:false,
                                pauseOnChange:DEFAULT_PAUSEONCHANGE_STATE, //Based on settings file
                                clock: null}, action) => {

    switch(action.type){

        case UPDATE_TIMER:
            return  {...state,
                        timeToDisplay:  state.isRunning?
                                            //Resets to next default state (work or break) if time is done.
                                            (state.timeToDisplay.min===0&&state.timeToDisplay.sec===0)?
                                                state.isWorking?state.defaultBreakTime:state.defaultWorkTime
                                            //Decreases timeToDisplay in one second until it reaches zero
                                            :state.timeToDisplay.sec>0?
                                                state.timeToDisplay.min>=0?
                                                    ({min: state.timeToDisplay.min, sec: state.timeToDisplay.sec-1})
                                                :state.timeToDisplay
                                                :state.timeToDisplay.min>0?
                                                    ({min: state.timeToDisplay.min-1, sec: 59})
                                                    :state.timeToDisplay
                                                :state.timeToDisplay,

                        //When timeToDisplay reaches zero, it alternates automatically from Work Time to Break Time and vice-versa
                        isWorking:  state.isRunning?
                                    (state.timeToDisplay.min===0&&state.timeToDisplay.sec===0)?
                                        !state.isWorking
                                        :state.isWorking
                                    :true,

                        //When timeToDisplay reaches zero, if pauseOnChange option is true, then our Timer object stops and is eliminated, else it just returns the old clock and time keeps ticking.
                        clock: state.isRunning?
                                    (state.timeToDisplay.min===0&&state.timeToDisplay.sec===0)?
                                        state.pauseOnChange?state.clock.stop():state.clock
                                        :state.clock
                                    :state.clock,
                        //Gets clock's state from our Timer object           
                        isRunning: state.clock.isRunning,

                        //Just a control state for future use
                        timerComplete: state.isRunning&&(state.timeToDisplay.min===0 && state.timeToDisplay.sec===0)
                    }
        
        case START_PAUSE_TIMER:
            return  {...state,
                isRunning:  !state.isRunning,
                clock: !state.isRunning?
                            !state.clock&&new Timer(()=>action.payload.dispatch(action.payload.func()))
                       :state.clock
            }

        case RESET_TIMER:
            return {...state,
                isWorking: true,
                isRunning:false,
                clock:state.clock&&state.clock.stop(),
                timeToDisplay: state.defaultWorkTime
            }

        case SET_DEFAULT_WORK_TIME:
            return {...state,
                isWorking: true,
                isRunning:false,
                clock:state.clock&&state.clock.stop(),
                defaultWorkTime: action.payload,
                timeToDisplay: action.payload
            }

        case SET_DEFAULT_BREAK_TIME:
            return {...state,
                isWorking: true,
                isRunning:false,
                clock:state.clock&&state.clock.stop(),
                defaultBreakTime: action.payload,
                timeToDisplay: state.defaultWorkTime
            }

        case SET_DEFAULT_VALUES:
            return {...state,
                isWorking: true,
                isRunning:false,
                clock:state.clock&&state.clock.stop(),
                defaultWorkTime: DEFAULT_WORK_TIME,
                defaultBreakTime: DEFAULT_BREAK_TIME,
                timeToDisplay: state.defaultWorkTime
            }

        case SET_PAUSE_STATE:
            return {...state,
                pauseOnChange: action.payload,
                isRunning:false,
                clock:state.clock&&state.clock.stop(),
                timeToDisplay: state.isWorking?state.defaultWorkTime:state.defaultBreakTime
            }

        default:
            return state;
    }
}

export default timerReducer;