import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, Switch,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles';
import {
  DEFAULT_PAUSEONCHANGE_STATE, WORK_INPUT, BREAK_INPUT,
  BUTTON_RESET_TO_DEFAULTS_LABEL, DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME,
} from '../api/constants';
import { TimeInput } from '../components';
import { updateDefaultWorkTime, updateDefaultBreakTime, togglePauseOnStatusChange } from '../redux/actions';
import { storeData } from '../api/helper';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  // ResetToDefaults signal
  const [reset, doReset] = useState(false);

  // Switch button constants
  const [isEnabled, setIsEnabled] = useState(settings.pauseOnChange);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const onTimeInputChange = (time, type) => {
    if (type === 'work') {
      dispatch(updateDefaultWorkTime(time));
    } else {
      dispatch(updateDefaultBreakTime(time));
    }
  };

  const resetClockToDefaults = () => {
    doReset((oldState) => !oldState);
    setIsEnabled(DEFAULT_PAUSEONCHANGE_STATE);
    dispatch(updateDefaultWorkTime(DEFAULT_WORK_TIME));
    dispatch(updateDefaultBreakTime(DEFAULT_BREAK_TIME));
  };

  // TODO Put storeData and GetData inside api helper.js
  useEffect(() => {
    if (settings) storeData(settings);
  }, [settings]);

  useEffect(() => {
    dispatch(togglePauseOnStatusChange(isEnabled));
  }, [isEnabled]);

  return (
    <View style={styles.wrapper}>
      <Text>Initial States</Text>
      <Text>Work Time</Text>
      <TimeInput type={WORK_INPUT} reset={reset} defaultValue={settings.defaultWorkTime} onChange={(time) => onTimeInputChange(time, 'work')} />
      <Text>Break Time</Text>
      <TimeInput type={BREAK_INPUT} reset={reset} defaultValue={settings.defaultBreakTime} onChange={(time) => onTimeInputChange(time, 'break')} />
      <Text>Pause timer when status changes</Text>
      <Text>No</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text>Yes</Text>
      <Button
        onPress={resetClockToDefaults}
        title={BUTTON_RESET_TO_DEFAULTS_LABEL}
        color="#841520"
        accessibilityLabel="Reset to defaults"
      />
    </View>
  );
};

export default SettingsScreen;
