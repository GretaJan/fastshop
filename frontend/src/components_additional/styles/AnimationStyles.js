import { StyleSheet } from 'react-native';
import { colors } from './Colors';
import {Dimensions} from 'react-native';

export const animations = (scale, translate) => StyleSheet.create({
    diagramScale: {
        transform: [
            { scaleX: scale }
        ]
    },
    numbersTransition: {
        position: 'absolute',
        transform: [
            { translateY: translate }
        ],
    },
    numbersTransitionFirst: {
        position: 'absolute',
        transform: [
            { translateY: translate }
        ],
    },
    numbersTransitionSec: {
        position: 'absolute',
        transform: [
            { translateY: translate }
        ],
    },
    numbersTransitionThird: {
        position: 'absolute',
        transform: [
            { translateY: translate }
        ],
    },
    numbersTransitionFourth: {
        position: 'absolute',
        transform: [
            { translateY: translate }
        ],
    },
    calendarAnimation: {
        // alignItems: 'flex-start',
        position: 'absolute',
        top: 120,
        width: scale, //scale represents calendar width
        transform: [
            { translateX: translate }
        ],
    },
})
