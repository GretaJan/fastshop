import { StyleSheet } from 'react-native';
import { colors } from './Colors';
import { Dimensions } from 'react-native';

export const iconButtons = (rotateBtn, activeColor, iconColor, inactiveScale, activeScale, activeTransition) => StyleSheet.create({
    btnContainer: {
        backgroundColor: activeColor,
        width: 45,
        height: 45,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        // Shadow
        elevation: 5,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
        position: 'relative',
        transform: [
            { rotateY: rotateBtn }
        ],
        zIndex: 90,
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
        color: iconColor ? iconColor : '#000'
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

export const fullModal = () => StyleSheet.create({
    titleWrap: {
        marginTop: 0, 
        marginLeft: 30
    },
    navBtnWrap: {
        height: 60,
        width: 185,
        borderColor: colors.mainBtnGreen,
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: 20,
    },
    navBtnWrapHover: {
        height: 60,
        width: 185,
        borderColor: colors.mainBtnGreen,
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: 20,
    },
    btnWrapRow: {
        // backgroundColor: 'grey',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgIcon: {
        fontSize: 40,
        top: -25,
        left: '50%',
        transform: [
            { translateX: -25 }
        ],
        paddingHorizontal: 3,
        backgroundColor: '#fff', 
        color: colors.mainBtnGreen,
        position: 'absolute',
        zIndex: 1,
    }
})

export const searchBar = () =>  StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        // marginBottom: 25,
        height: Dimensions.get('window').height / 5.5 / 2 - 10,
        alignItems: 'center',
        backgroundColor: colors.mainWhiteGrey,
        borderColor: colors.darkerGray,
        borderWidth: 1,
        borderRadius: 2,
        flex: 1,
        // width: Dimensions.get('window').width - 20
    },
    iconWrap: {
        height: Dimensions.get('window').height / 5.5 / 2 - 11,
        width: Dimensions.get('window').height / 5.5 / 2 - 11,
        borderRightColor: colors.mainGrey,
        borderRightWidth: 1,
    },
    searchBarIcon: {
        fontSize: 22,
        alignSelf: 'center',
        top: 14,
    },
    searchBarInput: {
        width: '75%',
        fontSize: 18,
        textAlign: 'left',
        paddingLeft: 12
    },
    searchBarInputInSelected: {
        marginLeft: 15,
        fontSize: 16,
        marginTop: 5,
    },
    animatedWrap: {
        width: 60,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.mainGreyTransparent,
        borderLeftWidth: 1,
    },
    removeList: {
        fontSize: 40,
    }
});