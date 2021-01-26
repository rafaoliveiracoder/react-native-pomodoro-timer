import React from 'react';
import { View, Button } from 'react-native';
import { resetTimer,updateTimer, startPauseTimer } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const PomoControls = () => {

  const dispatch = useDispatch();
  const isRunning = useSelector(state => state.isRunning);

  const onPressStartPause = () => {
    dispatch(startPauseTimer(dispatch, updateTimer));
  }

  const resetClock = () => {
    dispatch(resetTimer());
  }

  return (
    <View>
      <Button
        onPress={onPressStartPause}
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