import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { iconButtons } from '../../src/styles/ModalStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const { productAnimations } = require('../../src/styles/Animations.js');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedMaterialIcon = Animated.createAnimatedComponent(MaterialIcon);
const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);

function ActionIcon({ mainIcon, activeIcon, activeColor, activeColorSec, isActive, activateFunc, deactivateFunc, errorCondition, errorFunc }){
    const buttonRef = useRef(null);
    const [rotationDegrees, setRotationDegrees] = useState('0deg');
    const [backgroundColor, setBackgroundColor] = useState('#e5e9ee');
    const rotateBtn = useState(new Animated.Value(0))[0];
    const scaleActive = useRef(new Animated.Value(0)).current;
    const scaleInactive = useRef(new Animated.Value(0)).current;
    const toActiveTransition = useRef(new Animated.Value(-30)).current;

    useEffect( () => {
        if(isActive){
            setRotationDegrees('180deg')
            setBackgroundColor(activeColorSec)
            scaleActive.setValue(1)
            toActiveTransition.setValue(0)           
        } else {
            scaleInactive.setValue(1)
        }
    },[])
    
    function activateBtn(){
        if(errorCondition) errorFunc(buttonRef.current)
            else {
                const success = activateFunc(buttonRef.current)
                if(success){
                    callAnimation(productAnimations.btnAnimationToActive, rotateBtn, scaleActive, toActiveTransition, setRotationDegrees, '180deg')
                    setTimeout(() => {
                        setBackgroundColor(activeColorSec)
                    }, 1)
                }
            }
    }

    function deactivateBtn(){
        deactivateFunc()
        callAnimation(productAnimations.btnAnimationToInactive, rotateBtn, scaleInactive, scaleActive, setRotationDegrees, '180deg')
        setTimeout(() => {
            setBackgroundColor('#e5e9ee')
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