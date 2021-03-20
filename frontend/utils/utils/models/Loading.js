import React from 'react';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../src/styles/Colors';

const Loading = () => {

    return (
        <ActivityIndicator size="large" color={colors.mainBlack} />
    )
}

export default Loading