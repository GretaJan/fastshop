import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { buttonStyle } from '../../src/styles/AdditionalStyles';

const Button = ({ func, title, color, width, height }) => {
    return (
            <TouchableOpacity style={ buttonStyle(color, width, height).buttonWrap } onPress={func} >
                <Text style={ buttonStyle().buttonTxt } >{ title }</Text>
            </TouchableOpacity>
    )
}

export default Button

