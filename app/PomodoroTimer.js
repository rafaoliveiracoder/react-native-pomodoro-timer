import 'react-native-gesture-handler';
import React, {useEffect} from 'react'
import { View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import {HOMESCREEN_TITLE, ICON_SETTINGS, BUTTON_ICON_COLOR, BUTTON_ICON_BG_COLOR} from './api/constants'
import {styles} from './styles/';
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';

import { changeWorkStatus, resetTimer, setClock, startClock, stopClock, updateTimer } from './redux/actions';

const Stack = createStackNavigator();

const PomodoroTimer = () => {

  const dispatch = useDispatch();
  const timer = useSelector(state => state.timer);
  const initialTimes = useSelector(state => state.initialTimes);
  const workStatus = useSelector(state => state.workStatus);

  const pauseOnChange = false; //TODO Implement Settings feature

  useEffect(() => {
    //Init and starts Redux clock
    dispatch(setClock(dispatch, updateTimer));
    
    return () => dispatch(stopClock());
  }, []);

  useEffect(() => {
    if(timer.min===0 && timer.sec===0){
      if(pauseOnChange){
        dispatch(stopClock());
      }
      dispatch(changeWorkStatus());
    }
  }, [timer]);


  useEffect(() => {
    dispatch(resetTimer({
      min:workStatus?initialTimes.initialWorkTime.min:initialTimes.initialBreakTime.min,
      sec:workStatus?initialTimes.initialWorkTime.sec:initialTimes.initialBreakTime.sec,
    }));
  }, [workStatus]);

  return (
    <View style={styles.container}>
      <NavigationContainer >
        <Stack.Navigator initialRouteName={HOMESCREEN_TITLE} >
          <Stack.Screen
            name={HOMESCREEN_TITLE} component={HomeScreen}
            options={{
            headerTitle: HOMESCREEN_TITLE,
            headerRight: () => {
              const navigation = useNavigation();
              return (
              <Ionicons.Button
                backgroundColor = {BUTTON_ICON_BG_COLOR}
                name = {ICON_SETTINGS}
                onPress={() => navigation.navigate('Settings')}
                color={BUTTON_ICON_COLOR}
              />
              )},
            }}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default PomodoroTimer;