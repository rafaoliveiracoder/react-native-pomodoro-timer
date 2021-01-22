import React from 'react';
import { View, Text, Button } from 'react-native';
import { resetTimer, startPauseClock, stopClock, resetWorkStatus } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const PomoControls = () => {

  const dispatch = useDispatch();
  const initialTimes = useSelector(state => state.initialTimes);
  const isRunning = useSelector(state => state.clock.isRunning);

  const pauseStartClock = () => {
    dispatch(startPauseClock());
  }

  const resetClock = () => {
    dispatch(stopClock());
    dispatch(resetWorkStatus());
    dispatch(resetTimer({
      min:initialTimes.initialWorkTime.min,
      sec:initialTimes.initialBreakTime.sec
    }));
  }

  return (
    <View>
      <Button
        onPress={pauseStartClock}
        title={!isRunning?'START':'PAUSE'}
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />

      <Button
        onPress={resetClock}
        title='RESET'
        color="#841520"
        accessibilityLabel="Learn more about this purple button"
      />
      
    </View>
  );
}

export default PomoControls;