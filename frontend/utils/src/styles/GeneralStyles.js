import { StyleSheet } from 'react-native';
import { colors } from './Colors';
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';

export const textStyle = () => StyleSheet.create({
    h1: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 24,
    },
    h2Bold: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 20,
        fontWeight: 'bold',
    },
    h2: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 20,
    },
    h3: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 19,
        marginBottom: 20,
    },
    h4: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 18,
    },
    h5: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 16,
    },
    p: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 16,
        paddingBottom: 3,
        paddingHorizontal: 10,
    },
    emailTxt: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 17,
        color: colors.mainBlack,
        marginBottom: 3,
        paddingHorizontal: 10,
        fontWeight: 'bold',
    },
    mainMsg: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 17,
        paddingVertical: 15,
    },
    iconTitle: {
        fontFamily: 'sans-serif-condensed',
        marginLeft: '3%',
        fontSize: 20,
    },
    greyText: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 15,
        color: colors.lighterBlack
    },
    whiteTitle: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 22,
        fontWeight: '100',
        color: '#fff',
        alignSelf: 'center'
    },
    largeFont: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 30,
    }
});

export const containerStyles = () => StyleSheet.create({
    screenHeightContainerNoHeader: {
        alignSelf: 'center',
        width: Dimensions.get('window').width /1 - 20,
        height: Dimensions.get('window').height - (Dimensions.get('window').height / 5.5 / 2 + 146),
        top: (Dimensions.get('window').height /5.5 ) /2,
        zIndex: 1,
        paddingVertical: 10,
    },
    screenHeightContainerNoHeaderFullHeight: {
        alignSelf: 'center',
        width: Dimensions.get('window').width /1 - 20,
        height: Dimensions.get('window').height - (Dimensions.get('window').height / 5.5 / 2) - 85,
        top: (Dimensions.get('window').height /5.5 ) /2,
        zIndex: 1,
        paddingVertical: 10,
        backgroundColor: colors.mainGrey,
    },
    screenHeightContainerCenter: {
        alignSelf: 'center',
        width: Dimensions.get('window').width /1 - 20,
        height: Dimensions.get('window').height - (Dimensions.get('window').height / 5.5) - 100,
        top: (Dimensions.get('window').height /5.5 ) /2,
        justifyContent: 'space-between',
    },
    screenHeightContainer: {
        height: Dimensions.get('window').height - (Dimensions.get('window').height / 5.5) - 100,
        zIndex: -1,
        justifyContent: 'space-between'
    },
    simpleContainer: {
        flex: 1,
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
        zIndex: 2,
        top: (Dimensions.get('window').height /5.5 ) /2,
        marginBottom: 60,
    },
    flatListScrollSmall: {
        height: Dimensions.get('window').height /2.8,
    },
    flatListScrollFull: {
        height: Dimensions.get('window').height /1.4 - Dimensions.get('window').height /5.5 /2,
        zIndex: 2,
    },
    screenHeightContainerNoHeaderMargin: {
        paddingHorizontal: 10,
        paddingTop: 7,
        paddingBottom: 10,
        // flex: 1,
        textAlign: 'center',
        alignItems:'center',
        maxHeight: Dimensions.get('window').height /1 - 130,
    },
    topContainer: {
        height: Dimensions.get('window').height /5.5,
        backgroundColor: '#fff',
    },
    horizontalWrap: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: Dimensions.get('window').width - 40,
    },
    topTitle: {
        top: Dimensions.get('window').height /5.5 / 10,
        height: Dimensions.get('window').height /5.5 / 2,
        flexDirection: 'row',
    },
    topTitleTwo: {
        flexDirection: 'row',
        flex: 1,
    },
    flatListScrollFullCalendar: {
        minHeight: Dimensions.get('window').height - (Dimensions.get('window').height /5.5) - 100,
        zIndex: 2,
        justifyContent: 'space-between',
    },
    rowContainer: {
        flexDirection: 'row',
        height: Dimensions.get('window').height /5.5 / 2,
        top: Dimensions.get('window').height /5.5 / 2,
        width: Dimensions.get('window').width - 20,
        left: 10,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowOuterContainer: {
        flexDirection: 'row',
        width: Dimensions.get('window').width - 60,
    },
    rowContainerTop: {
        flexDirection: 'row',
        height: Dimensions.get('window').height /3.8,
        width: '100%',
        top: 0,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowContainerTopSmaller: {
        flexDirection: 'row',
        height: Dimensions.get('window').height /4.8,
        width: '100%',
        top: 0,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        backgroundColor: colors.mainGrey
    },
    centeredItemVertically: {
        height: '100%',
        //top: Dimensions.get('window').height /5.5 /2,
        justifyContent: 'center',
    },
})

export const inputStyles = (errorOrCol) => StyleSheet.create({
    inputContainer: {
        width: '86%',
        marginBottom: 15,
    },
    inputGreen: {
        borderColor: !errorOrCol ? colors.mainBtnGreen : colors.mainBtnOrange,
        borderWidth: 2,
        marginVertical: 7,
        paddingHorizontal: 10,
        fontSize: 17,
        height: 50,
    },
    inputGreenCentered: {
        borderColor: !errorOrCol ? colors.mainBtnGreen : colors.mainBtnOrange,
        borderWidth: 2,
        marginHorizontal: 15,
        paddingLeft: 15,
        paddingRight: 10,
        marginBottom: 7,
        minWidth: 25,
        fontSize: 17,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    disabledEmailField: {
        height: 50,
        backgroundColor: colors.mainWhiteGrey,
        justifyContent: 'center',
        marginVertical: 7,
    },
    inputRow: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row', 
        width: 150,  
        textAlign: 'center'
    },
    shortInputContainer: {
        marginBottom: 15,
        alignItems: 'center',
        flexBasis: (Dimensions.get('window').width - 40)  / errorOrCol,
    },
    optionText: {
        fontSize: 18,
        paddingLeft: 10
    },
    formTextGap: {
        marginBottom: 15,
        justifyContent: 'center',
    }
})

export const btnStyles = () => StyleSheet.create({
    inputBtnText: {
        fontSize: 16,
        textAlign: 'center',
    },
    buttonsRowWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    inputBtnGreen: {
        height: 42,
        width: 112,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.mainBtnGreen,
        // Shadow
        elevation: .02,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2, 
    },
    inputBtnOrange: {
        height: 42,
        width: 112,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.mainBtnOrange,
        // Shadow
        elevation: .02,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2, 
    },
    inputBtnGrey: {
        height: 42,
        width: 112,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.mainWhiteGrey,
        marginLeft: 10,
        // Shadow
        elevation: .02,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2, 
    },
    smallModalBtn: {
        paddingVertical: 4,
        paddingHorizontal: 6, 
        // backgroundColor: color,
        backgroundColor: colors.darkerGray,
        alignSelf: 'flex-end',
    },
})

export const modalStyles = (scale, wideComp, locationX, locationY) => StyleSheet.create({
    whiteContainer: {
        paddingVertical: 18,
        paddingHorizontal: '5%',
        width: Dimensions.get('window').width /1.1,
        top: Dimensions.get('window').height /7.4,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 50,
        alignSelf: 'center',
        // Shadow
        elevation   : 1,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
        backgroundColor: '#fff',
    },
    tempModalContainer: {
        paddingVertical: 9,
        paddingHorizontal: 14,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 51,
        backgroundColor: colors.mainBtnOrange,
        // Shadow
        elevation   : 1,
        overflow: 'hidden',
         //iOS:
         shadowColor: 'red',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity: 0.8,
         shadowRadius: 2, 
    },
    modalWrapContainer: {
        position: 'absolute',
        zIndex: 41,
        flex: 1,
        width: Dimensions.get('window').width /1,
        minHeight: Dimensions.get('window').height - 30 - (Platform === "ios" ? 64 : 56),
        alignItems: 'center',
        backgroundColor: colors.transparentLight,
        justifyContent: 'center',
        // top: Platform === "ios" ? 64 : 56,
    },
    modalWrapNoColor: {
        position: 'absolute',
        zIndex: 40,
        flex: 1,
        width: Dimensions.get('window').width /1,
        minHeight: Dimensions.get('window').height /1 - 85 - (Platform === "ios" ? 64 : 56),
    },
    animatedContainer: {
        paddingVertical: 18,
        paddingHorizontal: '10%',
        borderColor: colors.mainBtnOrange,
        width: wideComp ? Dimensions.get('window').width /1.1 : Dimensions.get('window').width /1.4,
        top: Dimensions.get('window').height /7.4,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 60,
        alignSelf: 'center',
        // Shadow
        elevation   : 1,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
        backgroundColor: colors.transparentLight,
         transform: [
             { scale: scale }
         ],
        backgroundColor: '#fff',
    },
    animatedContainerFull: {
        borderColor: colors.mainBtnOrange,
        width: Dimensions.get('window').width /1.1,
        height: Dimensions.get('window').height /1.7,
        paddingHorizontal: 20,
        position: 'absolute',
        paddingVertical: 10,
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: 50,
        // Shadow
        elevation   : 1,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
        backgroundColor: '#fff',
        transform: [
            { scale: scale }
        ],
        top: Dimensions.get('window').height /5.5 /2,
    },
    animatedContainerSmall: {
        paddingTop: 0,
        paddingBottom: 14,
        paddingHorizontal: 17,
        backgroundColor: 'red',
        borderColor: colors.mainBtnOrange,
        width: Dimensions.get('window').width /1.8,
        position: 'absolute',
        left: locationX,
        top: locationY,
        zIndex: 50,
        // Shadow
        elevation   : 1,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
        backgroundColor: '#fff',
         transform: [
             { scale: scale }
         ]
    },
});

export const modalTextStyle = (color) => StyleSheet.create({
    icon: {
        fontSize: 25,
        color: color,
        transform: [
            { rotate: '-4deg' },
        ],
        marginRight: 5,
    },
    headerWrap: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
    },
});

export const inputErrors = () => StyleSheet.create({
    container: {
        minHeight: 33,
        justifyContent: 'center',
        width: '85%',
        paddingLeft: 4,
        fontSize: 17,
    },
    message: {
        fontSize: 16,
        color: colors.textGrey,
        marginBottom: 3,
    }
});

export const iconsStyles = StyleSheet.create({
    iconWrap: {
        zIndex: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.mainGreyTransparent,
        borderLeftWidth: 1,
    },
    iconWrapSmall: {
        zIndex: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.mainGreyTransparent,
        borderLeftWidth: 1,
    },
    editIcon: {
        fontSize: 30,
        color: colors.mainBtnGreen
    },
    orangeIcon: {
        fontSize: 30,
        color: colors.mainBtnOrange
    }
})

export const animationStyles = (scale, translate, width) => StyleSheet.create({
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
        width: width, 
        transform: [
            { translateX: translate }
        ],
    },
    calendarDatesAnimation: {
        position: 'absolute',
        transform: [
            { translateX: translate }
        ],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: (Dimensions.get('window').width - 40) * 3,
    },
    deleteAnimationWithHeight: {
        transform: [
            { translateX: translate }
        ],
    } 
})