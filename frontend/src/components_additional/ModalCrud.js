import React, { useState, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { modalConfirm, modalStyle } from './styles/AdditionalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import StyledButton from './AdminButton';
import { colors } from './styles/Colors';
import PropTypes from 'prop-types';

const Animations = require('./styles/Animations.js')

const Modal = ({message, confirm, title, close, background, borderColor, iconColor, colorOne, colorTwo, horizontal, vertical}) => {
    const scale = useState(new Animated.Value(0))[0];

    useEffect(() => {
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
Modal.propTypes = {
    message: PropTypes.string,
    confirm: PropTypes.func,
    close: PropTypes.func,
    background: PropTypes.string,
    borderColor: PropTypes.string,
    iconColor: PropTypes.string,
    colorOne: PropTypes.string,
    colorTwo: PropTypes.string,
    horizontal: PropTypes.number,
    vertical: PropTypes.number,
}
export default Modal
