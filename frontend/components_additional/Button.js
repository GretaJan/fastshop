import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { buttonStyle } from './styles/AdditionalStyles';

const Button = ({ func, title, color }) => {
    return (
            <TouchableOpacity style={ buttonStyle(color).buttonSave } onPress={func} >
                <Text style={ buttonStyle().buttonTxt } >{ title }</Text>
            </TouchableOpacity>
    )
}

export default Button

