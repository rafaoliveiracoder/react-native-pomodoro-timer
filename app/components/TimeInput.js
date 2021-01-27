import React, {useEffect, useState} from 'react';
import { View, TextInput } from 'react-native';

const TimeInput = props => {

    const [time, setTime] = useState({min:props.defaultValue.min, sec:props.defaultValue.sec});
      
    const handleText = (text, timeType) => {
        
        let number = text.replace(/\D/g,''); //Remove non digits

        !number&&(number='0');

        if(timeType==='min'){
            number = number.match(/^[0-9​][0-9​]{0,2}$/);
            setTime(oldValue=>({...time, min:parseInt(number||oldValue.min)}));
        }else{
            number = number.match(/^[0-5​][0-9​]{0,1}$/)
            setTime(oldValue=>({...time, sec:parseInt(number||oldValue.sec)}));
        }
    }

    useEffect(()=>props.onChange(time), [time])

    useEffect(()=>{
        //Detecting a reset move
        setTime(props.defaultValue);
    }, [props.reset])

    return (
        <View>
            <TextInput value={time.min} onChangeText = {text=> handleText(text,'min')}/>
            <TextInput value={time.sec} onChangeText = {text=> handleText(text,'sec')}/>
        </View>
    )
}

export default TimeInput;

