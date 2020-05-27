import React, { useState, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { modalConfirm, modalStyle } from './styles/AdditionalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import StyledButton from './AdminButton';
import { colors } from './styles/Colors';

const Animations = require('./styles/Animations.js')

const Modal = ({message, confirm, title, close, background, borderColor, iconColor, colorOne, colorTwo, height, horizontal, vertical}) => {
    const scale = useState(new Animated.Value(0))[0];

    useEffect(() => {
        console.log("heello world")
        Animations.buttonScale(scale);
    }, [])

    return (
        <View style={modalStyle().container} >
            <Animated.View style={modalConfirm(background, scale).itemContainer} >
                <View style={modalStyle(null, borderColor).iconWrap}>
                    <Icon style={modalStyle(iconColor).icon} name="times" onPress={close} />
                    <Text style={modalStyle().title}>{title}</Text>
                </View>
                <Text style={modalStyle().text} >{message}</Text>
                <View style={modalConfirm().btnsWrap}>
                    <View style={modalConfirm().btnOne}>
                        <StyledButton title="Delete" func={confirm}  horizontal={horizontal} vertical={vertical} color={colorOne}/>
                    </View>
                    <View style={modalConfirm().btnTwo}>
                        <StyledButton title="Cancel" func={close}  horizontal={horizontal} vertical={vertical}  color={colorTwo}/>
                    </View>
                </View>
            </Animated.View>
        </View>
    )
} 

export default Modal
