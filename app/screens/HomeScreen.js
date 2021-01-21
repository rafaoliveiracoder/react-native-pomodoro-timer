import React from 'react';
import { View } from 'react-native';
import {PomoStatus, PomoDisplay, PomoControls} from '../components';

const HomeScreen = () => {
  return (
    <View>
      <PomoStatus />
      <PomoDisplay />
      <PomoControls />
    </View>
  );
}

export default HomeScreen;
