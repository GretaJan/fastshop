import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { inputStyles, textStyle } from '../styles/GeneralStyles';
import { CriteriaStyles } from '../styles/CompareStyles';
import { stylesGuest } from '../styles/SubcategoryStyles';
import { calendarStyles } from '../styles/CalendarStyles';
import { animations } from '../styles/AnimationStyles';

const { modalAnimations, comparisonAnimations, calendarAnimations } = require('../styles/Animations.js');
const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);

function CheckWithText({ isSelected, item, selectItem }){
    const checkScale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if(isSelected){
            checkScale.setValue(1);
        }
    }, [])

    function selectItemLocal(){
        selectItem()
        comparisonAnimations.checkScaleGrow(checkScale);  
    }

    return (
        <TouchableOpacity style={inputStyles().inputRow} onPress={ selectItemLocal }>
            <View style={CriteriaStyles().bulletWrapInner}>
                { isSelected && (
                    <AnimatedIonIcon name="ios-checkmark" style={CriteriaStyles(null, checkScale).bulletActive} />
                )}
            </View>
            <View style={ inputStyles().optionText }>
                <Text style={ textStyle().h4 }>{ item }</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CheckWithText