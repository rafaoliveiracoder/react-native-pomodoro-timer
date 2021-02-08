import { View, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const PomoDisplay = () => {
  const timer = useSelector((state) => state.timeToDisplay);

  // Displays the time in format XX:XX. If min < 10 or sec < 10, concats a '0' at number's start.
  return (
    <View>
      <Text>
        {timer.min < 10 ? `0${timer.min}` : timer.min}
        :
        {timer.sec < 10 ? `0${timer.sec}` : timer.sec}
      </Text>
    </View>
  );
};

export default PomoDisplay;
