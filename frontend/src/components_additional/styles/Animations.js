import { Animated, Easing} from 'react-native';


var Animations = {
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
        ]).start(() => Animations.pulsingBtn(scale, active))
    },
    pulsingBtnStop(scale) {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 1,
                duration: 10,
                useNativeDriver: true,
            })
        ])
    },
    diagramAnimation(translate) {
        Animated.sequence([
            Animated.timing(translate, {
                toValue: 1,
                delay: 2,
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
                delay: 2,
                // Speed: 20, 
                // tension: 50,
                // duration: 2500,
                useNativeDriver: true,
            }).start()
        ])
    },
    buttonScale(scale) {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 1,
                duration: 300,
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
        ]).start(() => Animations.AnimateAuth(translOne, translTwo, translThree) )
    },
    // changeHeight(height) {
    //     console.log("height", height)
    //     Animated.sequence([
    //         Animated.timing(height, {
    //             toValue: 1,
    //             delay: 2,
    //             duration: 50,
    //             easing: Easing.linear,
    //             useNativeDriver: true,
    //         })
    //     ]).start();
    // }
}

var productAnimations = {
    btnAnimation(rotate, scale, transition) {
        Animated.sequence([
            Animated.timing(rotate, {
                toValue: 1,
                delay: 1,
                duration: 210,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                delay: 0,
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
    }
}

module.exports = {
    Animations: Animations,
    productAnimations: productAnimations
};
// module.exports = Animations;