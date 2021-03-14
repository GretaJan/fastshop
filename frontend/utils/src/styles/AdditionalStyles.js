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
