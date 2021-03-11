import React, { useState, useEffect } from 'react';
import { View, Text, Animated, TouchableOpacity, Pressable } from 'react-native';
// import { modalConfirm, modalStyle } from '../styles/AdditionalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import StyledButton from './AdminButton';
import { textStyle, modalStyles, modalTextStyle, btnStyles, inputStyles } from '../styles/GeneralStyles';
import PropTypes from 'prop-types';

const { modalAnimations } = require('../styles/Animations.js');
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Modal = ({message, confirm, title, close, iconColor, iconName }) => {
    const scale = useState(new Animated.Value(0))[0];

    useEffect(() => {
        modalAnimations.modalScale(scale);
    }, [])
    return (
        // <View style={modalStyle().container} >
        //     <Animated.View style={modalConfirm(background, scale).itemContainer} >
        //         <View style={modalStyle(null, borderColor).iconWrap}>
        //             <Icon style={modalStyle(iconColor).icon} name="times" onPress={close} />
        //             <Text style={modalStyle().title}>{title}</Text>
        //         </View>
        //         <Text style={modalStyle().text} >{message}</Text>
        //         <View style={modalConfirm().btnsWrap}>
        //             <View style={modalConfirm().btnOne}>
        //                 <StyledButton title="Delete" func={confirm}  horizontal={horizontal} vertical={vertical} color={colorOne}/>
        //             </View>
        //             <View style={modalConfirm().btnTwo}>
        //                 <StyledButton title="Cancel" func={close}  horizontal={horizontal} vertical={vertical}  color={colorTwo}/>
        //             </View>
        //         </View>
        //     </Animated.View>
        // </View>
        <TouchableOpacity style={modalStyles().modalWrapContainer} onPress={ close } >
             <AnimatedPressable style={ modalStyles(scale, true).animatedContainer } >
                <View style={ modalTextStyle().headerWrap } >
                    <IonIcon style={ modalTextStyle(iconColor).icon } name={ iconName } onPress={close} />
                    <Text style={ textStyle().h2 }>{ title }</Text>
                </View>
                <View style={ inputStyles().formTextGap } >
                    <Text style={ textStyle().h4 }>{ message }</Text>
                </View>
                <View style={ btnStyles().buttonsRowWrap }>
                    <TouchableOpacity 
                        onPress={ confirm } 
                        style={ btnStyles().inputBtnOrange }
                    >
                        <Text style={ btnStyles().inputBtnText } >Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={ close } 
                        style={ btnStyles().inputBtnGrey }
                    >
                        <Text style={ btnStyles().inputBtnText } >Cancel</Text>
                    </TouchableOpacity>
                </View>
             </AnimatedPressable>
        </TouchableOpacity>
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
