import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import { modalStyle } from './styles/AdditionalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import StyledButton from './AdminButton';
import { modalStyles, btnStyles, textStyle } from './styles/GeneralStyles';
import { colors } from './styles/Colors';

const { modalAnimations } = require('./styles/Animations.js');

const Modal = ({ message, close, title, ok, color, borderColor }) => {
    const scale = useState(new Animated.Value(0))[0];

    useEffect(() => {
        modalAnimations.buttonScale(scale);
    }, [])
  
    return (
        <TouchableOpacity style={modalStyles().modalWrapContainer} onPress={close} >
            <Animated.View style={modalStyles(null, null, scale).animatedContainer} >
                <View style={modalStyles(null, borderColor).iconWrap}>
                    <IonIcon style={modalStyles(color).icon} name="ios-alert" />
                    <Text style={textStyle().iconTitle}>{title}</Text>
                </View>
                <View style={modalStyle().textWrap}>
                    <Text style={textStyle().mainMsg} >{message}</Text>
                </View>
                <TouchableOpacity style={ btnStyles(color).smallModalBtn } onPress={ close } >
                    <Text style={ textStyle().p } >{ ok }</Text>
                </TouchableOpacity>
                    {/* <StyledButton func={close} title={ok} horizontal={horizontal} vertical={vertical} color={color}/> */}
            </Animated.View>
        </TouchableOpacity>
    )
} 

export default Modal