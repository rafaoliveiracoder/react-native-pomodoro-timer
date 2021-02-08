import React from 'react';
import { View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { resetTimer, updateTimer, startPauseTimer } from '../redux/actions';
import { BUTTON_START_LABEL, BUTTON_PAUSE_LABEL, BUTTON_RESET_LABEL } from '../api/constants';

const PomoControls = () => {
  const dispatch = useDispatch();
  const isRunning = useSelector((state) => state.isRunning);

  const onPressStartPause = () => {
    dispatch(startPauseTimer(dispatch, updateTimer));
  };

  const resetClock = () => {
    dispatch(resetTimer());
  };

  return (
    <View>
      <Button
        onPress={onPressStartPause}
        title={!isRunning ? BUTTON_START_LABEL : BUTTON_PAUSE_LABEL}
        color="#841584"
        accessibilityLabel="Start/Pause timer"
      />

      <Button
        onPress={resetClock}
        title={BUTTON_RESET_LABEL}
        color="#841520"
        accessibilityLabel="Reset timer"
      />
    </View>
  );
};

export default PomoControls;
