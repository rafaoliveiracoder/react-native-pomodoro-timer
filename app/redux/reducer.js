import {UPDATE_TIME, RESET_TIME} from '../api/constants';

const reducer = (state = {min:2, sec:0}, action) => {
    switch(action.type){
        case UPDATE_TIME:
        return  state.sec>0?
                    state.min>=0?
                    ({min: state.min, sec: state.sec-1})
                    :state
                :state.min>0?
                    ({min: state.min-1, sec: 59})
                    :state

        case RESET_TIME:
        return action.payload;

        default:
        return state;
    }
}

export default reducer;