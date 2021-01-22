import { View, Text } from 'react-native';
import React, { useEffect } from 'react'
import { updateTime } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const PomoDisplay = () => {
  
  const dispatch = useDispatch();

  const timer = useSelector(state => state);

  let interval = null;

  useEffect(() => {
      interval = setInterval(()=>{
      dispatch(updateTime());
  }
  , 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    
    if(timer.min===0 && timer.sec===0){
      clearInterval(interval);
      console.log('STOPPED')
    }
    console.log('time',timer)
  }, [timer]);

  //Displays the time in format XX:XX. If min < 10 or sec < 10, concats a '0' at number's start.

  return (
    <View>
      <Text>{timer.min<10?'0'+timer.min:timer.min}:{timer.sec<10?'0'+timer.sec:timer.sec}</Text>
    </View>
  );
}

export default PomoDisplay;