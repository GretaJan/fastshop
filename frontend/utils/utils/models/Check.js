import React, { useState, useEffect } from 'react';
import { View, Text, Animated, TouchableOpacity, Image } from 'react-native';
import { CriteriaStyles } from '../../src/styles/CompareStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

const { comparisonAnimations } = require('../../src/styles/Animations.js');
const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);

function CheckInput({ isVisible, func }){
    const checkScale = useState(new Animated.Value(0))[0];

    useEffect(() => {
        comparisonAnimations.checkScaleGrow(checkScale); 
    }, [])

    function changeAnimation(){
        comparisonAnimations.checkScaleGrow(checkScale); 
        func()
    }

    return (
        <TouchableOpacity style={CriteriaStyles().bulletWrap} onPress={ changeAnimation }>
            <View style={CriteriaStyles().bulletWrapInner}>
            { isVisible && (
                <AnimatedIonIcon name="ios-checkmark" style={CriteriaStyles(null, checkScale).bulletActive} />
            )}
            </View>
        </TouchableOpacity>
    )
}

export default CheckInput