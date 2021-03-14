import React from 'react';
import { TouchableOpacity } from 'react-native';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

const Button = ({ func, color }) => {
    return (
        // <TouchableOpacity style={ roundButton(color).buttonWrap } onPress={func} >
        //     <IonIcon style={ roundButton(color).icon} name="ios-add-circle" />
        // </TouchableOpacity>
        <TouchableOpacity onPress={func} >
        <IonIcon name="ios-add-circle" />
    </TouchableOpacity>
    )
}


export default Button