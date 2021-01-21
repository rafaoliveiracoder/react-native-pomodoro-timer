import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PomodoroTimer from './app/PomodoroTimer';
import {styles} from './app/styles/';

export default function App({ navigation }) {
  return (
    <View style={styles.container}>
      <PomodoroTimer/>
      <StatusBar style="auto" />
    </View>
  );
}