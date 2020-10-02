import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { adminButtonStyle } from './styles/AdditionalStyles';

const Button = ({ func, title, color, horizontal, vertical }) => {
    return (
        <TouchableOpacity style={ adminButtonStyle(color).buttonWrap } onPress={func} >
            <Text style={ adminButtonStyle(null, horizontal, vertical).buttonTxt } >{ title }</Text>
        </TouchableOpacity>
    )
}

export default Button
