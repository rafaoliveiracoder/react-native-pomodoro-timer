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

  const defaultWorkTime = useSelector(state => state.defaultWorkTime);
  const defaultBreakTime = useSelector(state => state.defaultBreakTime)
  
  //Switch constants
  const [isEnabled, setIsEnabled] = useState(useSelector(state => state.pauseOnChange));
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
  const onTimeInputChange = (time, type) => {
    if(type==='work'){
      dispatch(updateDefaultWorkTime(time))
    }else{
      dispatch(updateDefaultBreakTime(time))
    }
  } 

  const resetClock = () => {
    dispatch(updateDefaultWorkTime(DEFAULT_WORK_TIME));
    dispatch(updateDefaultBreakTime(DEFAULT_BREAK_TIME));
  }

  useEffect(()=>{
    dispatch(togglePauseOnStatusChange(isEnabled))
  },[isEnabled])
  
  return (
    <View style={styles.wrapper}>
      <Text>Initial States</Text>
      <Text>Work Time</Text>
      <TimeInput type={WORK_INPUT} defaultValue={defaultWorkTime} onChange={(time)=>onTimeInputChange(time, 'work')}/>
      <Text>Break Time</Text>
      <TimeInput type={BREAK_INPUT} defaultValue={defaultBreakTime} onChange={(time)=>onTimeInputChange(time, 'break')}/>
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