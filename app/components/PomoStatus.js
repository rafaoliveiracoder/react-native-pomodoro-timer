import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const PomoStatus = () => {

  const workStatus = useSelector(state => state.workStatus);
  
  return (
    <View>
      <Text>{workStatus?'WORK':'BREAK'} TIME</Text>
    </View>
  );
}

export default PomoStatus;