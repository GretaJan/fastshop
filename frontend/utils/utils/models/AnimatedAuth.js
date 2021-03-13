import React, {useEffect, useState} from 'react';
import { View, Text, Animated } from 'react-native';
import { authVerify } from '../../src/styles/AdditionalStyles';
const Animations = require('../../src/styles/Animations.js');

const AnimatedComp = () => {
    const translateOne = useState(new Animated.Value(0))[0];
    const translateTwo = useState(new Animated.Value(0))[0];
    const translateThree = useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animations.AnimateAuth(translateOne, translateTwo, translateThree);
    }, [])

    return (
        <View style={ authVerify().container } >
            <Text style={ authVerify().mainTxt } >Verifying</Text>
            <Animated.View style={ authVerify(translateOne, null, null).dotOne } >
                <View style={ authVerify().dotOneStyle } ></View>
            </Animated.View>
            <Animated.View style={ authVerify(null, translateTwo, null).dotTwo } >
                <Text style={ authVerify().dotTwoStyle }></Text>
            </Animated.View>
            <Animated.View style={ authVerify(null, null, translateThree).dotThree } >
                <Text style={ authVerify().dotThreeStyle }></Text>
            </Animated.View>
        </View>
    )
}

export default AnimatedComp


