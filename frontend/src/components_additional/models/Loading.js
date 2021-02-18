import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { colors } from '../styles/Colors';
import { loadingBackground } from '../styles/AdditionalStyles';

const Loading = () => {

    return (
        <View >
            <ActivityIndicator size="large" color={colors.mainBlack} />
        </View>
    )
}

export default Loading