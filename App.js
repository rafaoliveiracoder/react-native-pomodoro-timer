import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {styles} from './app/styles/';
import store from './app/redux/store';
import { Provider} from 'react-redux';

import PomodoroTimer from './app/PomodoroTimer';

export default function App({ navigation }) {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PomodoroTimer/>
        <StatusBar style="auto" />
      </Provider>
    </View>
  );
}