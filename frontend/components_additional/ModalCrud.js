import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { modalConfirm, modalStyleDelete } from './styles/AdditionalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import StyledButton from './AdminButton';
import { colors } from './styles/Colors';

const Modal = ({message, confirm, title, close, background, borderColor, iconColor, colorOne, colorTwo, height, horizontal, vertical}) => {

    return (
        <View style={modalStyleDelete().container} >
            <View style={modalStyleDelete(background).itemContainer} >
                <View style={modalStyleDelete(null,borderColor).iconWrap}>
                    <Icon style={modalStyleDelete(iconColor).icon} name="times" onPress={close} />
                    <Text style={modalStyleDelete().title}>{title}</Text>
                </View>
                <Text style={modalStyleDelete().text} >{message}</Text>
                <View style={modalConfirm().btnsWrap}>
                    <View style={modalConfirm().btnOne}>
                        <StyledButton title="Delete" func={confirm}  horizontal={horizontal} vertical={vertical} color={colorOne}/>
                    </View>
                    <View style={modalConfirm().btnTwo}>
                        <StyledButton title="Cancel" func={close}  horizontal={horizontal} vertical={vertical}  color={colorTwo}/>
                    </View>
                </View>
            </View>
        </View>
    )
} 

export default Modal