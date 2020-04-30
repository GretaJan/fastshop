import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { errorStyle } from './styles/AdditionalStyles';
const Error = ({ message, margin, left }) => {

    return (
        <View style={errorStyle(margin, left).container} >
            <View  style={errorStyle().iconWrap}>
                <Icon style={errorStyle().icon} name ="exclamation" />
            </View>
            <Text style={errorStyle().message}>{message}</Text>
        </View>
    )
} 

export default Error