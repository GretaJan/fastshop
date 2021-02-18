import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import { modalStyle } from '../styles/AdditionalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import StyledButton from './AdminButton';
import { modalStyles, btnStyles, textStyle } from '../styles/GeneralStyles';
import { colors } from '../styles/Colors';

const { modalAnimations } = require('../styles/Animations.js');

const Modal = ({ message, close, title, ok, color, borderColor, locationX, locationY }) => {
    const scale = useState(new Animated.Value(0))[0];

    useEffect(() => {
        modalAnimations.buttonScale(scale);
    }, [])
  
    return (
        <TouchableOpacity style={modalStyles().modalWrapNoColor} onPress={close} >
            <Animated.View style={modalStyles(null, null, scale, null, locationX, locationY).animatedContainerSmall} >
                {/* <View style={modalStyles(null, borderColor).iconWrap}>
                    <IonIcon style={modalStyles(color).icon} name="ios-alert" />
                    <Text style={textStyle().iconTitle}>{title}</Text>
                </View> */}
                <View style={modalStyle().textWrap}>
                    <Text style={textStyle().mainMsg} >{message}</Text>
                </View>
                <TouchableOpacity style={ btnStyles(color).smallModalBtn } onPress={ close } >
                    <Text style={ textStyle().p } >Ok</Text>
                </TouchableOpacity>
            </Animated.View>
        </TouchableOpacity>
    )
} 

export default Modal