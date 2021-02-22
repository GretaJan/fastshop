import { Animated, Easing, LayoutAnimation, Platform, UIManager, AnimationType} from 'react-native';
import { animations } from './AnimationStyles';
import { Dimensions } from 'react-native';


if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const heightAnimation = () => {
    LayoutAnimation.configureNext({
        duration: 200,
        update: {
           delay: 0,
           type: LayoutAnimation.Types.linear,
        },
    })
}

var comparisonAnimations = {
    pulsingBtn(scale, active) {
        Animated.sequence([
            Animated.spring(scale, {
                toValue: .98,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.spring(scale, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.spring(scale, {
                toValue: .98,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start(() => comparisonAnimations.pulsingBtn(scale, active))
    },
    pulsingBtnStop(scale) {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 1,
                duration: 10,
                useNativeDriver: true,
            })
        ]).start()
    },
    checkScaleGrow(scale){
        Animated.sequence([
            Animated.timing(scale, {
               toValue: 0,
               delay: 0,
               duration: 0,
               useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                delay: .3,
                duration: 200,
                useNativeDriver: true,
             }),
        ]).start()
    },
    imageIconTranslation(translateMatch, translateMismatch){
        Animated.sequence([
            Animated.timing(translateMatch, {
                toValue: 0,
                delay: .2,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true
            }),
            Animated.timing(translateMismatch, {
                toValue: 0,
                delay: .2,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ]).start();
    },
    diagramAnimation(translate) {
        Animated.sequence([
            Animated.timing(translate, {
                toValue: 1,
                delay: 5,
                // Speed: 20, 
                // tension: 50,
                // duration: 2500,
                useNativeDriver: true,
            }).start()
        ])
    },
    numbersAnimation(translate, toValue) {
        Animated.sequence([
            Animated.timing(translate, {
                toValue: toValue,
                delay: 6,
                // Speed: 20, 
                // tension: 50,
                // duration: 2500,
                useNativeDriver: true,
            }).start()
        ])
    },
    AnimateAuth(translOne, translTwo, translThree) {
        Animated.sequence([
            Animated.timing(translOne, {
                toValue: -5,
                delay: 10,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
                bottom: 0,
            }),
            Animated.timing(translTwo, {
                toValue: -5,
                delay: -20,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(translOne, {
                toValue: 0,
                delay: 20,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
     
            Animated.timing(translThree, {
                toValue: -5,
                delay: -20,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(translTwo, {
                toValue: 0,
                delay: 20,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(translThree, {
                toValue: 0,
                delay: 0,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ]).start(() => comparisonAnimations.AnimateAuth(translOne, translTwo, translThree) )
    },
    optionBtnsHide(translate){
        Animated.sequence([
            Animated.timing(translate, {
                toValue: Dimensions.get('window').height /5 + 100,
                delay: 0,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start()
    },
    optionBtnsShow(translate, func){
        Animated.sequence([
            Animated.timing(translate, {
                toValue: 0,
                delay: 0,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start(() => {
            func()
        })
    }
}

var modalAnimations = {
    buttonScale(scale) {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start()
        ])
    },
}

var productAnimations = {
    btnAnimationToActive(rotate, scale, transition) {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 0,
                delay: 0,
                duration: 0,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(transition, {
                toValue: -30,
                delay: 0,
                duration: 0,
                // easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(rotate, {
                toValue: 1,
                delay: 1,
                duration: 400,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                delay: .01,
                duration: 0,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(transition, {
                toValue: 0,
                delay: 2,
                duration: 200,
                // easing: Easing.linear,
                useNativeDriver: true,
            })
        ]).start();
    },
    btnAnimationToInactive(rotate, scale, listScale) {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 0,
                delay: 0,
                duration: 0,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(listScale, {
                toValue: 0,
                delay: .1,
                duration: 0,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(rotate, {
                toValue: 0,
                delay: 1,
                duration: 400,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                delay: .1,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            // Animated.timing(listScale, {
            //     toValue: 0,
            //     delay: 0,
            //     duration: 0,
            //     easing: Easing.linear,
            //     useNativeDriver: true,
            // })
        ]).start();
    },
    removeItem(translation, heightFunc, removeFunc){
            Animated.timing(translation, {
                toValue: -(Dimensions.get('window').width /1),
                delay: .3,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => {
                heightAnimation()
                heightFunc()
                removeFunc()
            }
        )
    }
}

var calendarAnimations = {
    translateContainerForward(translationItem, translateTo){
        Animated.sequence([
            Animated.timing(translationItem, {
                toValue: translateTo,
                delay: 0,
                duration: 400,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start()
    },
    translateContainerBack(translationItem, translateTo){
            Animated.timing(translationItem, {
                toValue: translateTo,
                delay: 0,
                duration: 400,
                useNativeDriver: true,
            }).start()
    }
}

module.exports = {
    comparisonAnimations: comparisonAnimations,
    productAnimations: productAnimations,
    modalAnimations: modalAnimations,
    calendarAnimations: calendarAnimations,
};
