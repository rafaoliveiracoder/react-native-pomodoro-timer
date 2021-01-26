import React, { useEffect } from 'react';
import { View, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {styles} from '../styles/';
import {WORK_INPUT, BREAK_INPUT} from '../api/constants';
import {TimeInput} from '../components';
import { updateInitialWorkTime, updateInitialBreakTime } from '../redux/actions';

//TODO Implement inputs and save its values to a settings file

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  
  const onTimeChange = (time, type) => {
    (type==='work')?
    (dispatch(updateInitialWorkTime(time)))
    :(dispatch(updateInitialBreakTime(time)))
  } 
  
  return (
    <View style={styles.wrapper}>
      <Text>Initial States</Text>
      <Text>Work Time</Text>
      <TimeInput type={WORK_INPUT} onChange={(time)=>onTimeChange(time, 'work')}/>
      <Text>Break Time</Text>
      <TimeInput type={BREAK_INPUT} onChange={(time)=>onTimeChange(time, 'break')}/>
    </View>
  );
}

export default SettingsScreen;