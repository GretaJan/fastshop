import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';
import { containerStyles } from '../../src/styles/GeneralStyles';
import { colors } from '../../src/styles/Colors';

const EmptyList = ({ message, background }) => {

    return (
        <View style={containerStyles().flatListScrollSmall} >
            <View style={ componentStyle.itemContainer } >
                <View style={ componentStyle.imageWrap }>
                    <Image style={ componentStyle.image } name="list-ol" source={require('../../src/images/List_04.png')} />
                </View>
                <Text style={ componentStyle.text } >{message}</Text>
            </View>
        </View>
    )
} 

export default EmptyList

const componentStyle = StyleSheet.create({
    itemContainer: {
        top: (Dimensions.get('window').height /5.5 ) /2,
        alignItems: 'center',
        width: Dimensions.get('window').width - 30,
    },
    imageWrap: {
        backgroundColor: colors.transparentLight,
        paddingVertical: 16,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 55,
    },
    text: {
        fontSize: 18,
    }
})