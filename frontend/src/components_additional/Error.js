import React from 'react';
import { View, Text } from 'react-native';

const Error = ({message}) => {

    return (
        <View>
            <Text>{message}</Text>
        </View>
    )
}

export default Error