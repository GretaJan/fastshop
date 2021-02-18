import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { colors } from '../styles/Colors';
import {Dimensions} from 'react-native';

const Loading = () => {

    return (
        <View style={{position: 'absolute', zIndex: 50, justifyContent: 'center',height: Dimensions.get('window').height /1.5, width: Dimensions.get('window').width /1}}>
            <ActivityIndicator size="large" color={colors.mainBtnOrange} />
        </View>
    )
}

export default Loading