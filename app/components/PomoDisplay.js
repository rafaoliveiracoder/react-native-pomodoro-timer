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
    // Atualiza o titulo do documento usando a API do browser
    if(timer.min===0 && timer.sec===0){
      clearInterval(interval);
      console.log('STOPPED')
    }
    console.log('time',timer)
  }, [timer]);

  return (
    <View>
      <Text>Timer</Text>
    </View>
  );
}

export default PomoDisplay;