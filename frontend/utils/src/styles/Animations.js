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

const paramsNoDelay = (value, duration) => ({
    toValue: value,
    duration: duration,
    useNativeDriver: true,
})

const paramsWithDelay = (value, delay, duration) => ({
    toValue: value,
    delay: delay,
    duration: duration,
    useNativeDriver: true
})

const paramsWithDelayEasy = (value, delay, duration) => ({
    toValue: value,
    delay: delay,
    duration: duration,
    easing: Easing.linear,
    useNativeDriver: true
})


var comparisonAnimations = {
    pulsingBtn(scale, active) {
        Animated.sequence([
            Animated.spring(scale, paramsNoDelay(.98, 250)),
            Animated.spring(scale, paramsNoDelay(1, 250)),
            Animated.spring(scale, paramsNoDelay(.98, 250)),
        ]).start(() => comparisonAnimations.pulsingBtn(scale, active))
    },
    pulsingBtnStop(scale) {
        Animated.timing(scale, paramsNoDelay(1, 10)).start()
    },
    checkScaleGrow(scale){
        Animated.sequence([
            Animated.timing(scale, paramsNoDelay(0, 0)),
            Animated.timing(scale, paramsNoDelay(1, 200)),
        ]).start()
    },
    imageIconTranslation(translateMatch, translateMismatch){
        Animated.sequence([
            Animated.timing(translateMatch, paramsWithDelayEasy(0, .2, 300)),
            Animated.timing(translateMismatch, paramsWithDelayEasy(0, .2, 300)),
        ]).start();
    },
    diagramAnimation(translate) {
        Animated.timing(translate, paramsWithDelay(1, 5)).start();
    },
    numbersAnimation(translate, toValue) {
        Animated.timing(translate, paramsWithDelay(toValue, 6)).start()
    },
    AnimateAuth(translOne, translTwo, translThree) {
        Animated.sequence([
            Animated.timing(translOne, paramsWithDelayEasy(-5, 10, 50)),
            Animated.timing(translTwo, paramsWithDelayEasy(-5, 20, 50)),
            Animated.timing(translOne, paramsWithDelayEasy(0, 20, 50)),
            Animated.timing(translOne, paramsWithDelayEasy(-5, -20, 50)),
            Animated.timing(translOne, paramsWithDelayEasy(0, 20, 50)),
            Animated.timing(translOne, paramsWithDelayEasy(0, 0, 50)),
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
        Animated.timing(scale, paramsNoDelay(1, 300)).start();
    },
}

var productAnimations = {
    btnAnimationToActive(rotate, scale, transition) {
        Animated.sequence([
            Animated.timing(scale, paramsWithDelayEasy(0, 0, 0)),
            Animated.timing(transition, paramsWithDelay(-30, 0, 0)),
            Animated.timing(rotate, paramsWithDelayEasy(1, 1, 400)),
            Animated.timing(scale, paramsWithDelayEasy(1, .01, 0)),
            Animated.timing(transition, paramsWithDelay(0, 2, 200)),
        ]).start();
    },
    btnAnimationToInactive(rotate, scale, listScale) {
        Animated.sequence([
            Animated.timing(scale, paramsWithDelayEasy(0, 0, 0)),
            Animated.timing(listScale, paramsWithDelayEasy(0, .1, 0)),
            Animated.timing(rotate, paramsWithDelayEasy(0, 1, 400)),
            Animated.timing(scale, paramsWithDelayEasy(1, .1, 200)),
        ]).start();
    },
    removeItem(translation, heightFunc, removeFunc){
        const screenWidth = -(Dimensions.get('window').width /1);
        Animated.timing(translation, paramsWithDelayEasy(screenWidth, .3, 200)).start(() => {
            heightAnimation()
            heightFunc()
            removeFunc()
        })
    },
    removeLargeItem(translation, heightFunc, removeFunc){
        const screenWidth = -(Dimensions.get('window').width /1);
        Animated.timing(translation, paramsWithDelayEasy(screenWidth, .3, 300)).start(() => {
            heightLargeAnimation()
            heightFunc()
            removeFunc()
        })
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
