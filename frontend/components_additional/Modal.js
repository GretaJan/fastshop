import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { modalStyle } from './styles/AdditionalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Modal = ({message, close}) => {

    return (
        <TouchableOpacity style={modalStyle().container} onPress={close} >
            <View style={modalStyle().itemContainer} >
                <View style={modalStyle().iconWrap}>
                    <Icon style={modalStyle().icon} name="times" />
                </View>
                <Text style={modalStyle().text} >{message}</Text>
            </View>
        </TouchableOpacity>
    )
} 

export default Modal