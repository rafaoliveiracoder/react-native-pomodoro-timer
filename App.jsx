import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import styles from './app/styles';
import store from './app/redux/store';

import PomodoroTimer from './app/PomodoroTimer';

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PomodoroTimer />
      </Provider>
    </View>
  );
}
