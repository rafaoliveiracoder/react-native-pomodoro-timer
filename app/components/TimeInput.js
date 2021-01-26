import React, {useEffect, useState} from 'react';
import { View, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import {WORK_INPUT} from '../api/constants';

//TODO Regex form validations

const TimeInput = props => {

    console.log(props.type) //TODO Return standard values based on redux and type

    const initTime = props.type===WORK_INPUT?useSelector(state => state.defaultWorkTime):useSelector(state => state.defaultBreakTime)

    const [time, setTime] = useState({min:initTime.min, sec:initTime.sec});
      
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
        props.reset>0&&setTime(props.defaultValue)
    }, [props.reset])

    return (
        <View>
            <TextInput value={time.min} onChangeText = {text=> handleText(text,'min')}/>
            <TextInput value={time.sec} onChangeText = {text=> handleText(text,'sec')}/>
        </View>
    )
}

export default TimeInput;

