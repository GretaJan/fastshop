import { StyleSheet } from 'react-native';
import { colors } from './Colors';
import { Dimensions } from 'react-native';

export const iconButtons = (rotateBtn, activeColor, inactiveScale, activeScale, activeTransition) => StyleSheet.create({
    btnContainer: {
        backgroundColor: activeColor ? activeColor : colors.mainGrey,
        width: 45,
        height: 45,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        // Shadow
        elevation   : 5,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
        position: 'relative',
        transform: [
            { rotateY: rotateBtn }
        ]
    },
    inactiveIcon: {
        fontSize: 33,
        color: activeColor,
        transform: [
            { scaleX: inactiveScale }
        ],
    },
    activeIconMain: {
        fontSize: 28,
        position: 'absolute',
        fontWeight: 'bold',
        transform: [
            { rotateY: '-180deg' },
            { scale: activeScale }
        ],
    },
    activeIconSec: {
        position: 'absolute',
        fontSize: 27,
        color: activeColor,
        left: 3,
        top: 0,
        transform: [
            { translateY: activeTransition },
            { rotateY: '-180deg' }
        ], 
    },
})