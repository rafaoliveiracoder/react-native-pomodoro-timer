import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  HOMESCREEN_TITLE, ICON_SETTINGS, BUTTON_ICON_COLOR, BUTTON_ICON_BG_COLOR,
} from './api/constants';
import styles from './styles';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';

import { updateSettings } from './redux/actions';
import { getData } from './api/helper';

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
