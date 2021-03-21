import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';
import { colors } from './Colors';
import {Platform} from 'react-native';


export const buttonStyle = (color, width, height) =>  StyleSheet.create({
    buttonWrap: {
        marginBottom: 20,
        borderColor: colors.transparentLight,
        borderWidth: 1,
        borderRadius: 5,
        width: width ? width : Dimensions.get('window').width /2.2,
        height: height ? height : 50,
        alignItems: 'center',
        justifyContent: 'center',   
        backgroundColor: color, 
          // Shadow
          elevation   : 3,
          overflow: 'hidden',
          //iOS:
          shadowColor: 'red',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2, 
    },
    buttonTxt: {
        fontSize: 18,
    },
});

export const backgroundForPages = (background) => StyleSheet.create({
    backgroundContainer: {
        backgroundColor: background ? background : colors.mainGrey, 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export const emptyListSelected = () => StyleSheet.create({
    container: {
       height: Dimensions.get('window').height /2.4,
       backgroundColor: colors.mainGrey,
       alignItems: 'center',
       justifyContent: 'center',
    },
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
    },
    imageWrap: {
        backgroundColor: colors.transparentLight,
        paddingVertical: 16,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 50,
    },

});

export const errorStyle = (margin, left) => StyleSheet.create({
    container: {
        position: 'absolute',
        top: margin ? margin : -25,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        left: left ? left : 0,
    },
    iconWrap: {
        width: 20,
        height: 20,
        backgroundColor: colors.bordoTransparent,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 5,
    },
    icon: {
        fontSize: 16,
    },
    message: {
        fontSize: 16,
    }
});

export const authVerify = (translOne, translTwo, translThree) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        position: 'absolute',
        alignSelf: 'center',
        top: '3%'
    },
    mainTxt: {
        fontSize: 18,
        letterSpacing: 3
    },
    dotOne: {
        backgroundColor: 'grey',
        transform: [
            { translateY: translOne } 
        ],
        marginLeft: 5,
    },
    dotOneStyle: {
        height: 6,
        width: 6,
        borderColor: colors.mainBlack,
        borderWidth: 1,
        backgroundColor: 'red',
        borderRadius: 3,
    },
    dotTwo: {
        transform: [
            { translateY: translTwo } 
        ],
        marginLeft: 6,
    },
    dotTwoStyle: {
        height: 6,
        width: 6,
        borderColor: colors.mainBlack,
        borderWidth: 1,
        backgroundColor: colors.lightGreen2,
        borderRadius: 3,
    },
    dotThree: {
        transform: [
            { translateY: translThree } 
        ],
        marginLeft: 6,
    },
    dotThreeStyle: {
        height: 6,
        width: 6,
        borderColor: colors.mainBlack,
        borderWidth: 1,
        backgroundColor: colors.mainBtnOrange,
        borderRadius: 3,
    }
});

export const homeStyles = StyleSheet.create({
    mainBlock: {
        height: Dimensions.get('window').height - Dimensions.get('window').height / 5.5 - 100,
        justifyContent: 'space-between',
    },
    fourBtns: {
        minHeight: Dimensions.get('window').height /5 + 70,
        borderTopColor: colors.transparentLight,
        borderTopWidth: 1,
        justifyContent: 'center',
        paddingTop: 10,
    },
    halfWidth: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnWrap: {
        alignContent: 'center',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: colors.mainBtnGreen,
        width: 60,
        height: 60,
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
    },
    btnWrapOne: {
        marginBottom: 5,
        width: 45,
        height: 45,
        backgroundColor: colors.mainGrey,
        borderRadius: 5,
        // Shadow
        elevation: 5,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2, 
    },
    btnWrapTwo: {
        width: 45,
        height: 45,
        backgroundColor: colors.mainGrey,
        borderRadius: 5,
        marginLeft: 22.5,
        marginBottom: 10,
        // Shadow
        elevation: 5,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2, 
    },
    btnWrapThree: {
        marginBottom: 5,
        width: 45,
        height: 45,
        backgroundColor: colors.mainGrey,
        borderRadius: 5,
        // Shadow
        elevation: 5,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2, 
    },
    btnWrapFour: {
        marginLeft: 22.5,
        width: 45,
        height: 45,
        backgroundColor: colors.mainGrey,
        borderRadius: 5,
         // Shadow
         elevation: 5,
         overflow: 'hidden',
         //iOS:
         shadowColor: 'red',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity: 0.2,
         shadowRadius: 2, 
    },
    textWrap: {
        width: '65%',
        alignItems: 'center',
        left: '10%',
    },
    colorWrap: {
        paddingHorizontal: '4%',
        paddingVertical: '2%',
         alignItems: 'center',
         backgroundColor: colors.transparentLight,
    },
    innerTextWrap: {
        marginBottom: 5,
    }
})

export const topProductsStyle = (iconColor, numberColor) => StyleSheet.create({
    productsWrap: {
        top: -10
    },
    productWrap: {
        flexDirection: 'row',
        paddingVertical: 20,
        marginBottom: 10,
        backgroundColor: 'rgb(255, 255, 255)',
        // borderColor: '#fff',
        // borderTopWidth: 2,
    },
    wrapIcon: {
        width: '23%',
        height: 60,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.mainGrey,
        borderLeftWidth: 1,
    },
    icon: {
        fontSize: 25,
        color: iconColor,
        position: 'absolute',
        right: 2,
        top: 2,
        transform: [
            { rotateY: '180deg' }
        ]
    },
    text: {
        fontSize: 27,
        color: numberColor,
        fontWeight: 'bold',
    },
    fullWidth: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
    },
    countNumWrap: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        width: 60,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topIcon: {
        fontSize: 30,
        color: colors.mainGrey,
        color: colors.mainBtnGreen,
        position: 'absolute',
        // backgroundColor: colors.mainBtnOrange,
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    countNum: {
        fontSize: 25,
        fontWeight: 'bold',
        zIndex: 50,
        color: colors.mainBlack,
        paddingHorizontal: 40,
        position: 'absolute',
    },
    borderLineLeft: {
        backgroundColor: '#fff',
        height: '30%',
        width: 2,
        position: 'absolute',
    },
    borderLineRight: {
        position: 'absolute',
        backgroundColor: '#fff',
        height: '30%',
        width: 2,
        right: 0,
    }
})