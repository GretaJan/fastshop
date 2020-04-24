import React from 'react';
import {View, Text} from 'react-native';
import { modalStyle } from './styles/AdditionalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Modal = ({message}) => {

    return (
        <View style={modalStyle().container} >
            <View style={modalStyle().itemWrap} >
                <Icon style={modalStyle().icon} name="times" />
                <Text style={modalStyle().text} >{message}</Text>
            </View>
        </View>
    )
} 

export default Modal