import React, {useState, useEffect}  from 'react';
import { View, Text, Button, Switch} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {styles} from '../styles/';
import {WORK_INPUT, BREAK_INPUT, BUTTON_RESET_TO_DEFAULTS_LABEL, DEFAULT_WORK_TIME, DEFAULT_BREAK_TIME } from '../api/constants';
import {TimeInput} from '../components';
import { updateDefaultWorkTime, updateDefaultBreakTime, togglePauseOnStatusChange } from '../redux/actions';

//TODO Save input's values to a settings file
//TODO Add a Pause On Status Change Option

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [reset, resetInputs] = useState(0);
  const [defaults, setDefaults] = useState({defaultWorkTime:DEFAULT_WORK_TIME,defaultBreakTime:DEFAULT_BREAK_TIME})

  //Switch constants
  const [isEnabled, setIsEnabled] = useState(useSelector(state => state.pauseOnChange));
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
  
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
    setDefaults({...defaults, defaultWorkTime:DEFAULT_WORK_TIME,defaultBreakTime:DEFAULT_BREAK_TIME})
    resetInputs(oldState=> oldState+1);
  }

  useEffect(()=>{
    dispatch(togglePauseOnStatusChange(isEnabled))
  },[isEnabled])
  
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
      <Text>Pause timer when status changes</Text><Text>No</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      /><Text>Yes</Text>
    </View>
  );
}

export default SettingsScreen;