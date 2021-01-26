import {createStore} from 'redux';
import timerReducer from './timerReducer';

const store = createStore(timerReducer);

export default store;