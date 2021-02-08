import {
  DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME, DEFAULT_PAUSEONCHANGE_STATE, START_PAUSE_TIMER,
  UPDATE_TIMER, RESET_TIMER, SET_DEFAULT_WORK_TIME, SET_DEFAULT_BREAK_TIME, SET_DEFAULT_VALUES,
  SET_PAUSE_STATE, UPDATE_SETTINGS,
} from '../api/constants';
import { Timer } from '../utils';

const getCurrentDisplayTime = (state) => {
  if (state.isRunning) {
    if (state.timeToDisplay.min === 0 && state.timeToDisplay.sec === 0) {
      if (state.isWorking) {
        return state.settings.defaultBreakTime;
      }
      return state.settings.defaultWorkTime;
    }
    if (state.timeToDisplay.sec > 0) {
      if (state.timeToDisplay.min >= 0) {
        return ({ min: state.timeToDisplay.min, sec: state.timeToDisplay.sec - 1 });
      }
    } else if (state.timeToDisplay.min > 0) {
      return ({ min: state.timeToDisplay.min - 1, sec: 59 });
    }
  }
  return state.timeToDisplay;
};

const getCurrentWorkingState = (state) => {
  if (state.isRunning) {
    if (state.timeToDisplay.min === 0 && state.timeToDisplay.sec === 0) {
      return !state.isWorking;
    }
    return state.isWorking;
  }
  return true;
};

const setClockStatus = (state, action) => {
  if (action.type === UPDATE_TIMER) {
    if (state.isRunning) {
      if (state.timeToDisplay.min === 0 && state.timeToDisplay.sec === 0) {
        if (state.settings.pauseOnChange) {
          state.clock.stop();
        }
      }
    }
  }
  if (action.type === START_PAUSE_TIMER) {
    if (!state.isRunning) {
      if (!state.clock) {
        return new Timer(() => action.payload.dispatch(action.payload.func()));
      }
      return state.clock.stop();
    }
    return state.clock.stop();
  }
  return state.clock;
};

const timerReducer = (state = {
  settings: {
    defaultWorkTime: DEFAULT_WORK_TIME,
    defaultBreakTime: DEFAULT_BREAK_TIME,
    pauseOnChange: DEFAULT_PAUSEONCHANGE_STATE,
  }, // Based on settings file
  timeToDisplay: DEFAULT_WORK_TIME,
  isWorking: true,
  isRunning: false,
  timerComplete: false,
  clock: null,
}, action) => {
  switch (action.type) {
    case UPDATE_TIMER:
      return {
        ...state,
        timeToDisplay: getCurrentDisplayTime(state),
        /* When timeToDisplay reaches zero, it alternates automatically
        from Work Time to Break Time and vice-versa */
        isWorking: getCurrentWorkingState(state),

        /* When timeToDisplay reaches zero, if pauseOnChange option is true,
        then our Timer object stops and is eliminated, else it just returns
        the old clock and time keeps ticking. */
        clock: setClockStatus(state, action),
        // Gets clock's state from our Timer object
        isRunning: state.clock.isRunning,

        // Just a control state for future use
        timerComplete: state.isRunning && (state.timeToDisplay.min === 0
                       && state.timeToDisplay.sec === 0),
      };

    case START_PAUSE_TIMER:
      return {
        ...state,
        isRunning: !state.isRunning,
        clock: setClockStatus(state, action),
      };

    case RESET_TIMER:
      return {
        ...state,
        isWorking: true,
        isRunning: false,
        clock: state.clock && state.clock.stop(),
        timeToDisplay: state.settings.defaultWorkTime,
      };

    case SET_DEFAULT_WORK_TIME:
      return {
        ...state,
        isWorking: true,
        isRunning: false,
        clock: state.clock && state.clock.stop(),
        settings: { ...state.settings, defaultWorkTime: action.payload },
        timeToDisplay: action.payload,
      };

    case SET_DEFAULT_BREAK_TIME:
      return {
        ...state,
        isWorking: true,
        isRunning: false,
        clock: state.clock && state.clock.stop(),
        settings: { ...state.settings, defaultBreakTime: action.payload },
        timeToDisplay: state.settings.defaultWorkTime,
      };

    case SET_DEFAULT_VALUES:
      return {
        ...state,
        isWorking: true,
        isRunning: false,
        clock: state.clock && state.clock.stop(),
        settings: {
          ...state.settings,
          defaultWorkTime: DEFAULT_WORK_TIME,
          defaultBreakTime: DEFAULT_BREAK_TIME,
        },
        timeToDisplay: state.settings.defaultWorkTime,
      };

    case SET_PAUSE_STATE:
      return {
        ...state,
        isRunning: false,
        clock: state.clock && state.clock.stop(),
        timeToDisplay: state.isWorking ? state.settings.defaultWorkTime
          : state.settings.defaultBreakTime,
        settings: { ...state.settings, pauseOnChange: action.payload },
      };

    case UPDATE_SETTINGS:
      return {
        ...state,
        settings: { ...action.payload },
        timeToDisplay: action.payload.defaultWorkTime,
      };

    default:
      return state;
  }
};

export default timerReducer;
