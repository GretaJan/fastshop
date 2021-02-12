import React from 'react';
import { View, Text } from 'react-native';
import { modalStyles, textStyle } from './styles/GeneralStyles';

function TempPopup({ message }){
    return (
        <View style={ modalStyles().tempModalContainer }>
            <Text style={ textStyle().h4 }>{message}</Text>
        </View>
    )
}

export default TempPopup