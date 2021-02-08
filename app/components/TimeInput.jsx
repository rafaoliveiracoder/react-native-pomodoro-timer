import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { DEFAULT_WORK_TIME } from '../api/constants';

const TimeInput = (props) => {
  const { defaultValue, reset } = props;
  const { min, sec } = defaultValue;

  const [time, setTime] = useState({ min, sec });

  const handleText = (text, timeType) => {
    let number = text.replace(/\D/g, ''); // Remove non digits

    if (!number) number = '0';

    if (timeType === 'min') {
      number = number.match(/^[0-9​][0-9​]{0,2}$/);
      setTime((oldValue) => ({ ...time, min: parseInt(number || oldValue.min, 10) }));
    } else {
      number = number.match(/^[0-5​][0-9​]{0,1}$/);
      setTime((oldValue) => ({ ...time, sec: parseInt(number || oldValue.sec, 10) }));
    }
  };

  TimeInput.propTypes = {
    defaultValue: PropTypes.objectOf,
    onChange: PropTypes.func,
    reset: PropTypes.bool,
  };

  TimeInput.defaultProps = {
    defaultValue: DEFAULT_WORK_TIME,
    onChange: null,
    reset: false,
  };

  useEffect(() => props.onChange(time), [time]);

  useEffect(() => {
    // Detecting a reset move
    setTime(props.defaultValue);
  }, [reset]);

  return (
    <View>
      <TextInput value={time.min} onChangeText={(text) => handleText(text, 'min')} />
      <TextInput value={time.sec} onChangeText={(text) => handleText(text, 'sec')} />
    </View>
  );
};

export default TimeInput;
