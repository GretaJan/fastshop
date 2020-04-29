import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { colors } from './styles/Colors';
import { loadingBackground } from '../../components_additional/styles/AdditionalStyles';

const Loading = ({background}) => {

    return (
        <View style={loadingBackground(background).container}>
            <ActivityIndicator size="large" color={colors.mainBlack} />
        </View>
    )
}

export default Loading