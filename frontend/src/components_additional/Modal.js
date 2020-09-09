import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import { modalStyle } from './styles/AdditionalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import StyledButton from './AdminButton';

const Animations = require('./styles/Animations.js');

const Modal = ({message, close, title, ok, color, borderColor, horizontal, vertical}) => {
    const scale = useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animations.buttonScale(scale);
    }, [])

    return (
        <TouchableOpacity style={modalStyle().container} onPress={close} >
            <Animated.View style={modalStyle(null, null, scale).itemContainer} >
                <View style={modalStyle(null, borderColor).iconWrap}>
                    <IonIcon style={modalStyle(color).icon} name="ios-alert" />
                    <Text style={modalStyle().title}>{title}</Text>
                </View>
                <View style={modalStyle().textWrap}>
                    <Text style={modalStyle().text} >{message}</Text>
                </View>
                <View style={modalStyle().okTxt} >
                    <StyledButton func={close} title={ok} horizontal={horizontal} vertical={vertical} color={color}/>
                </View>
            </Animated.View>
        </TouchableOpacity>
    )
} 

export default Modal