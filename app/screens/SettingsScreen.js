import React, {useState}  from 'react';
import { View, Text, Button} from 'react-native';
import { useDispatch } from 'react-redux';
import {styles} from '../styles/';
import {WORK_INPUT, BREAK_INPUT, BUTTON_RESET_TO_DEFAULTS_LABEL, DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME } from '../api/constants';
import {TimeInput} from '../components';
import { updateDefaultWorkTime, updateDefaultBreakTime, backToDefaults } from '../redux/actions';

//TODO Implement inputs and save its values to a settings file

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [reset, resetInputs] = useState(0);
  const [defaults, setDefaults] = useState({defaultWorkTime:DEFAULT_WORK_TIME,defaultBreakTime:DEFAULT_BREAK_TIME})
  
  const onTimeChange = (time, type) => {
    if(type==='work'){
      setDefaults({...defaults,defaultWorkTime:time})
      dispatch(updateDefaultWorkTime(time))
    }else{
      setDefaults({...defaults,defaultBreakTime:time})
      dispatch(updateDefaultBreakTime(time))
    }
  } 

  const resetClock = () => {
    setDefaults({...defaults,defaultWorkTime:DEFAULT_WORK_TIME,defaultBreakTime:DEFAULT_BREAK_TIME})
    resetInputs(oldState=> oldState+1);
  }
  
  return (
    <View style={styles.wrapper}>
      <Text>Initial States</Text>
      <Text>Work Time</Text>
      <TimeInput type={WORK_INPUT} reset={reset} defaultValue={defaults.defaultWorkTime} onChange={(time)=>onTimeChange(time, 'work')}/>
      <Text>Break Time</Text>
      <TimeInput type={BREAK_INPUT} reset={reset} defaultValue={defaults.defaultBreakTime} onChange={(time)=>onTimeChange(time, 'break')}/>
      <Button
        onPress={resetClock}
        title={BUTTON_RESET_TO_DEFAULTS_LABEL}
        color="#841520"
        accessibilityLabel="Reset to defaults"
      />
    </View>
  );
}

export default SettingsScreen;