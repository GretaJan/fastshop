import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { adminButtonStyle } from './styles/AdditionalStyles';

const Button = ({ func, title, color }) => {
    return (
        <TouchableOpacity style={ adminButtonStyle(color).buttonWrap } onPress={func} >
            <Text style={ adminButtonStyle().buttonTxt } >{ title }</Text>
        </TouchableOpacity>
    )
}

export default Button
