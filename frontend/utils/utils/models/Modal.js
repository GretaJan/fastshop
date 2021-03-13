import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Pressable } from 'react-native';
import { modalStyle } from '../../src/styles/AdditionalStyles';
import { modalStyles, btnStyles, textStyle } from '../../src/styles/GeneralStyles';

const { modalAnimations } = require('../../src/styles/Animations.js');
const AnimatedPressable  = Animated.createAnimatedComponent(Pressable);

const Modal = ({ message, close, color, locationX, locationY }) => {
    const scale = useState(new Animated.Value(0))[0];

    useEffect(() => {
        modalAnimations.modalScale(scale);
    }, [])
  
    return (
        <TouchableOpacity style={modalStyles().modalWrapNoColor} onPress={close} >
            <AnimatedPressable style={modalStyles(scale, false, locationX, locationY).animatedContainerSmall} >
                <View style={modalStyle().textWrap}>
                    <Text style={textStyle().mainMsg} >{message}</Text>
                </View>
                <TouchableOpacity style={ btnStyles(color).smallModalBtn } onPress={ close } >
                    <Text style={ textStyle().p } >Ok</Text>
                </TouchableOpacity>
            </AnimatedPressable>
        </TouchableOpacity>
    )
} 

export default Modal