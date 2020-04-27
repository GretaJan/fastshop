import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { modalStyle } from './styles/AdditionalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

const Modal = ({message, close, title, ok}) => {

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
                {/* <View style={modalStyle().okWrap}> */}
                    <Text style={modalStyle().okTxt} >{ok}</Text>
                {/* </View> */}
            </View>
        </TouchableOpacity>
    )
} 

export default Modal