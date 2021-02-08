import React from 'react';
import { View } from 'react-native';
import { PomoStatus, PomoDisplay, PomoControls } from '../components';
import styles from '../styles';

const HomeScreen = () => (
  <View style={styles.wrapper}>
    <PomoStatus />
    <PomoDisplay />
    <PomoControls />
  </View>
);

export default HomeScreen;
