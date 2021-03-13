import React from 'react';
import { View, Text } from 'react-native';
import { inputErrors } from '../../src/styles/GeneralStyles';

const Error = ({message}) => {

    return (
        <View style={ inputErrors().container } >
            <Text style={ inputErrors().message }>{message}</Text>
        </View>
    )
}

export default Error