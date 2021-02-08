import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  HOMESCREEN_TITLE, ICON_SETTINGS, BUTTON_ICON_COLOR, BUTTON_ICON_BG_COLOR,
} from './api/constants';
import styles from './styles';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';

import { updateSettings } from './redux/actions';

const getData = async () => {
  try {
    const settings = await AsyncStorage.getItem('@pomodoro_dx_storage_Key');
    if (settings !== null) {
      // value previously stored
      return settings != null ? JSON.parse(settings) : null;
    }
  } catch (err) {
    // error reading value
    return err.message;
  }
  return false;
};

const Stack = createStackNavigator();

const PomodoroTimer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getData().then((settings) => {
      if (settings) dispatch(updateSettings(settings));
    });
  });

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={HOMESCREEN_TITLE}>

          {/* Home Screen */}
          <Stack.Screen
            name={HOMESCREEN_TITLE}
            component={HomeScreen}
            options={{
              headerTitle: HOMESCREEN_TITLE,
              headerRight: () => {
                const navigation = useNavigation();

                return (
                  <Ionicons.Button
                    backgroundColor={BUTTON_ICON_BG_COLOR}
                    name={ICON_SETTINGS}
                    onPress={() => navigation.navigate('Settings')}
                    color={BUTTON_ICON_COLOR}
                  />
                );
              },
            }}
          />

          {/* Settings Screen */}
          <Stack.Screen name="Settings" component={SettingsScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default PomodoroTimer;