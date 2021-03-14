import { Animated, Easing, LayoutAnimation, Platform, UIManager, AnimationType} from 'react-native';
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

const heightLargeAnimation = () => {
    LayoutAnimation.configureNext({
        duration: 400,
        update: {
           delay: 0,
           type: LayoutAnimation.Types.linear,
        },
    })
}

const screenAnimation = (translateTo, duration) => ({
    toValue: translateTo,
    delay: 0,
    duration: duration,
    easing: Easing.linear,
    useNativeDriver: true,
})

const translateZeroOptions = (translateTo) => ({
    toValue: translateTo,
    delay: 0,
    duration: 300,
    easing: Easing.linear,
    useNativeDriver: true,
})

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
                delay: 0,
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
    optionBtnsHide(translate, func){
        const height = Dimensions.get('window').height /5 + 100;
        Animated.timing(translate, translateZeroOptions(height)).start(() => {
            func()
        })
    },
    optionBtnsShow(translate, func){
        Animated.timing(translate, translateZeroOptions(0)).start(() => {
            func()
        })
    }
}

var modalAnimations = {
    modalScale(scale) {
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
    },
    removeLargeItem(translation, heightFunc, removeFunc){
            Animated.timing(translation, {
                toValue: -(Dimensions.get('window').width /1),
                delay: .3,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => {
                heightLargeAnimation()
                heightFunc()
                removeFunc()
            }
        )
    }
}

var calendarAnimations = {
    translateContainer(translationItem, translateTo, duration){
        Animated.timing(translationItem, screenAnimation(translateTo, duration)).start()
    },
    translateDayIcon(translate){
        Animated.timing(translate,  translateZeroOptions(0)).start()
    }
}

module.exports = {
    comparisonAnimations: comparisonAnimations,
    productAnimations: productAnimations,
    modalAnimations: modalAnimations,
    calendarAnimations: calendarAnimations,
};
