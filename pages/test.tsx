import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios'

const Test = () => {

    axios.get('http://192.168.0.100:8000/api/recharge').then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        console.log('finally');
    });


    return (
        <View>
            <Text>Test</Text>
        </View>
    )
}

export default Test

// https://reactnative.dev/movies.json