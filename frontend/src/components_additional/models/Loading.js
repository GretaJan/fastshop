import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { colors } from '../styles/Colors';
import { loadingBackground } from '../styles/AdditionalStyles';

const Loading = () => {

    return (
        <ActivityIndicator size="large" color={colors.mainBlack} />
    )
}

export default Loading