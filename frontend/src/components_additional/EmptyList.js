import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { emptyList } from './styles/AdditionalStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import StyledButton from './AdminButton';
import { colors } from './styles/Colors';

const EmptyList = ({ message, background }) => {

    return (
        <View style={emptyList(background ? background : colors.mainGrey).container} >
            <View style={emptyList().itemContainer} >
                <View style={emptyList().imageWrap}>
                    <Image style={emptyList().image} name="list-ol" source={require('./images/List_04.png')} />
                </View>
                <Text style={emptyList().text} >{message}</Text>
            </View>
        </View>
    )
} 

export default EmptyList