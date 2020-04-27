import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { emptyList } from './styles/AdditionalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import StyledButton from './AdminButton';
import { colors } from './styles/Colors';

const EmptyList = ({ message, backgroundColor }) => {

    return (
        <View style={emptyList().container} >
            <View style={emptyList().itemContainer} >
                <View style={emptyList().iconWrap}>
                    <Icon style={emptyList().icon} name="list-ol"/>
                </View>
                <Text style={emptyList().text} >{message}</Text>
            </View>
        </View>
    )
} 

export default EmptyList