import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { modalStyle } from './styles/AdditionalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import StyledButton from './AdminButton';

const Modal = ({message, close, title, ok, color, horizontal, vertical}) => {

    return (
        <TouchableOpacity style={modalStyle().container} onPress={close} >
            <View style={modalStyle().itemContainer} >
                <View style={modalStyle().iconWrap}>
                    <IonIcon style={modalStyle().icon} name="ios-alert" />
                    <Text style={modalStyle().title}>{title}</Text>
                </View>
                <View style={modalStyle().textWrap}>
                    <Text style={modalStyle().text} >{message}</Text>
                </View>
                <View style={modalStyle().okTxt} >
                    <StyledButton func={close} title={ok} horizontal={horizontal} vertical={vertical} color={color}/>
                </View>
            </View>
        </TouchableOpacity>
    )
} 

export default Modal