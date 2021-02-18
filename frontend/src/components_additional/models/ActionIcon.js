import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { iconButtons } from '../styles/ModalStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const { productAnimations } = require('../styles/Animations.js');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedMaterialIcon = Animated.createAnimatedComponent(MaterialIcon);
const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);

function ActionIcon({ mainIcon, activeIcon, activeColor, activeColorSec, isActive, activateFunc, deactivateFunc, errorCondition, errorFunc}){
    const buttonRef = useRef(null);
    const [rotationDegrees, setRotationDegrees] = useState('0deg');
    const [backgroundColor, setBackgroundColor] = useState(null);
    const rotateBtn = useState(new Animated.Value(0))[0];
    const scaleActive = useRef(new Animated.Value(0)).current;
    const scaleInactive = useRef(new Animated.Value(0)).current;
    const toActiveTransition = useRef(new Animated.Value(-30)).current;

    useEffect(() => {
        console.log("active?", isActive)
        if(isActive){
            console.log("YEASSS")
            setRotationDegrees('180deg')
            scaleActive.setValue(1)
            toActiveTransition.setValue(0)
            setBackgroundColor(activeColorSec)
        } else {
            scaleInactive.setValue(1)
        }
    },[])
    function activateBtn(){
        console.log("active", errorCondition)
        if(errorCondition) errorFunc(buttonRef.current)
            else {
                activateFunc(buttonRef.current)
                callAnimation(productAnimations.btnAnimationToActive, rotateBtn, scaleActive, toActiveTransition, setRotationDegrees, '180deg')
                setTimeout(() => {
                    setBackgroundColor(activeColorSec)
                },10)
            }
      
    }
    function deactivateBtn(){
        console.log("deactive")
        deactivateFunc()
        callAnimation(productAnimations.btnAnimationToInactive, rotateBtn, scaleInactive, scaleActive, setRotationDegrees, '180deg')
        setTimeout(() => {
            setBackgroundColor(null)
        },10)
    }

    return (
        <AnimatedTouchable 
                style={iconButtons(rotationDegrees, backgroundColor).btnContainer} 
                onPress={ !isActive ? activateBtn : deactivateBtn }
                ref={ buttonRef }
            >
            { !isActive ? (
                <AnimatedIonIcon name={ mainIcon } style={iconButtons(null, activeColor, scaleInactive).inactiveIcon} />
            ) : (
                <>
                    <AnimatedMaterialIcon name={ activeIcon } style={iconButtons(null, null, null, scaleActive).activeIconMain} />
                    <AnimatedIonIcon name={ mainIcon } style={iconButtons(null, activeColor, null, null, toActiveTransition).activeIconSec} />
                </>
            )}
        </AnimatedTouchable>
    )
}

async function callAnimation(animationFunc, itemOne, itemTwo, itemThree, rotationFunc, toDegrees){
    // await productAnimations[animationType](itemOne.current, itemTwo.current, itemThree.current)
    await animationFunc(itemOne, itemTwo, itemThree)
    let spinTemp = itemOne.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', toDegrees]
    })
    rotationFunc(spinTemp)
}

export default ActionIcon