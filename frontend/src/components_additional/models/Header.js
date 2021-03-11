
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { colors } from '../styles/Colors';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

function Header({ title, navigate }){
     
    return (
        <View style={ titleStyles.containerWrap }>
            <View style={ titleStyles.innerContainer }>
                { navigate && (
                    <TouchableOpacity style={ titleStyles.iconWrap } onPress={ navigate }>
                        <IonIcon name="md-arrow-back" style={ titleStyles.icon } />
                    </TouchableOpacity>
                ) }
                <Text style={ titleStyles.title }>{ title }</Text>
            </View>
        </View>
    )
}

export default Header

const titleStyles = StyleSheet.create({
    containerWrap: {
        height: Dimensions.get('window').height /5.5,
        zIndex: -1,
        backgroundColor: colors.mainBtnGreen,
        position: 'absolute',
        width: Dimensions.get('window').width,
        paddingHorizontal: 5,
    },
    innerContainer: {
        height: (Dimensions.get('window').height /5.5 ) /2,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '100',
        color: '#fff',
        alignSelf: 'center'
    },
    iconWrap: {
        position: 'absolute',
        height: (Dimensions.get('window').height /5.5 ) /2,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 30,
        color: '#fff',
    }, 
})