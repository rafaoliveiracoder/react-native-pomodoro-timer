import { State } from 'react-native-gesture-handler';
import {DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME, START_PAUSE_TIMER, UPDATE_TIMER, RESET_TIMER} from '../api/constants';
import { Timer } from '../utils';

const timerReducer = (state = { initialWorkTime:DEFAULT_WORK_TIME,
                                initialBreakTime:DEFAULT_BREAK_TIME,
                                timeToDisplay:DEFAULT_WORK_TIME,
                                isWorking:true, 
                                isRunning:false,
                                timerComplete:false,
                                pauseOnChange:false, //Based on settings file
                                clock: null}, action) => {


                                    console.log(state.timerComplete)
    switch(action.type){

        //Decreases timer in one second until it reaches zero
        //When timer reaches zero, it alternates automatically from Work Time to Break Time and vice-versa
        //and sets the initial Values that can be changed via Input.

        case UPDATE_TIMER:
            return  {...state,
                        timeToDisplay:  state.isRunning?
                                            (state.timeToDisplay.min===0&&state.timeToDisplay.sec===0)?(
                                                state.isWorking?state.initialBreakTime:state.initialWorkTime
                                            )
                                            :state.timeToDisplay.sec>0?
                                                state.timeToDisplay.min>=0?
                                                    ({min: state.timeToDisplay.min, sec: state.timeToDisplay.sec-1})
                                                :state.timeToDisplay
                                                :state.timeToDisplay.min>0?
                                                    ({min: state.timeToDisplay.min-1, sec: 1})
                                                    :state.timeToDisplay
                                                :state.timeToDisplay,

                        isWorking:  state.isRunning?
                                    (state.timeToDisplay.min===0&&state.timeToDisplay.sec===0)?
                                        !state.isWorking
                                        :state.isWorking
                                    :true,

                        clock: state.isRunning?
                                    (state.timeToDisplay.min===0&&state.timeToDisplay.sec===0)?
                                        state.pauseOnChange?state.clock.stop():state.clock
                                        :state.clock
                                    :state.clock,
                                    
                        isRunning:state.clock.isRunning,

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
                timeToDisplay: state.initialWorkTime
            }

        default:
            return state;
    }
}

export default timerReducer;