import React from 'react';
import {View, Text, Image} from 'react-native';
import { emptyListSelected } from './styles/AdditionalStyles';


const EmptyList = ({ message }) => {

    return (
        <View style={emptyListSelected().container} >
            <View style={emptyListSelected().itemContainer} >
                <Image style={emptyListSelected().image} name="list-ol" source={require('./images/List_04.png')} />
                <Text style={emptyListSelected().text} >{message}</Text>
            </View>
        </View>
    )
} 

export default EmptyList