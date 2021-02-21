import { StyleSheet } from 'react-native';
import { colors, fonts } from './Colors';
import { Dimensions } from 'react-native';
// import { useHeaderHeight  } from '@react-navigation/stack';
import { Platform } from 'react-native';

export const textStyle = () => StyleSheet.create({
    h1: {
        fontSize: 24,
    },
    h2: {
        fontSize: 20,
    },
    h3: {
        fontSize: 19,
        marginBottom: 20,
    },
    h4: {
        fontSize: 18,
    },
    h5: {
        fontSize: 16,
    },
    p: {
        fontSize: 16,
        paddingBottom: 3,
        paddingHorizontal: 10,
    },
    emailTxt: {
        fontSize: 17,
        color: colors.mainBlack,
        marginBottom: 3,
        paddingHorizontal: 10,
        fontWeight: 'bold',
    },
    mainMsg: {
        fontSize: 17,
        paddingVertical: 15,
    },
    iconTitle: {
        marginLeft: '3%',
        fontSize: 20,
    },
});

export const containerStyles = (color) => StyleSheet.create({
    screenHeightContainer: {
        flex: 1,
        textAlign: 'center',
        alignItems:'center',
        width: Dimensions.get('window').width /1,
        maxHeight: Dimensions.get('window').height /1 - 140,
        position: 'relative',
        backgroundColor: color ? color : colors.mainGrey,
    },
    simpleContainer: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: color ? color : colors.mainGrey,
        paddingHorizontal: 5
    },
    flatListScrollSmall: {
        height: Dimensions.get('window').height /2.25,
        width: Dimensions.get('window').width,
        paddingHorizontal: 5,
    },
    flatListScrollFull: {
        height: Dimensions.get('window').height /1.4,
        width: Dimensions.get('window').width,
        paddingHorizontal: 5,
        zIndex: 2,
    },
    screenHeightContainerMargin: {
        paddingHorizontal: 10,
        paddingTop: 7,
        paddingBottom: 10,
        flex: 1,
        textAlign: 'center',
        alignItems:'center',
        // width: Dimensions.get('window').width /1,
        maxHeight: Dimensions.get('window').height /1 - 140,
        position: 'relative',
        backgroundColor: color ? color : colors.mainGrey,
    }
})

export const inputStyles = (error) => StyleSheet.create({
    inputContainer: {
        width: '86%',
        marginBottom: 15,
    },
    inputGreen: {
        borderColor: !error ? colors.mainBtnGreen : colors.mainBtnOrange,
        borderWidth: 2,
        marginVertical: 7,
        paddingHorizontal: 10,
        fontSize: 17,
        height: 50,
    },
    disabledEmailField: {
        height: 50,
        backgroundColor: colors.mainWhiteGrey,
        justifyContent: 'center',
        marginVertical: 7,
    },
})

export const btnStyles = (color) => StyleSheet.create({
    inputBtnText: {
        fontSize: 16,
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
    }
})

export const modalStyles = (color, borderColor, scale, wideComp, locationX, locationY) => StyleSheet.create({
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
        minHeight: Dimensions.get('window').height /1 - 85 - (Platform === "ios" ? 64 : 56),
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
        // alignItems: 'center',
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
        backgroundColor: colors.transparentLight,
         transform: [
             { scale: scale }
         ]
    },
    animatedContainerFull: {
        borderColor: colors.mainBtnOrange,
        width: Dimensions.get('window').width /1.1,
        height: Dimensions.get('window').height /1.7,
        paddingHorizontal: 20,
        position: 'absolute',
        paddingBottom: 7,
        display: 'flex',
        // alignItems: 'stretch',
        justifyContent: 'space-between',
        // alignContent: 'space-between',
        // justifyContent: 'center',
        // alignContent: 'center',
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
    textWrap: {
        backgroundColor: 'red',
    },
    // iconWrap: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     alignSelf: 'flex-start',
    //     width: '100%',
    //     // borderBottomColor: borderColor,
    //     borderBottomColor: colors.mainWhiteGrey,
    //     borderBottomWidth: 2,
    //     paddingBottom: 5,
    // },
    // icon: {
    //     fontSize: 35,
    //     // color: color,
    //     color: colors.darkerGray,
    // },
});

export const modalStyle = (color, borderColor, scale) => StyleSheet.create({
    // container: {
    //     position: 'absolute',
    //     zIndex: 40,
    //     flex: 1,
    //     width: Dimensions.get('window').width /1,
    //     height: Dimensions.get('window').height /1,
    //     minHeight: Dimensions.get('window').height /1,
    //     alignItems: 'center',
    //     backgroundColor: colors.transparentLight,
    //     paddingTop: Dimensions.get('window').height /6,
    //     top: -5,
    //     // Shadow
    //     elevation   : 5,
    //     overflow: 'hidden',
    //     //iOS:
    //     shadowColor: 'red',
    //     shadowOffset: { width: 1, height: 1 },
    //     shadowOpacity: 0.8,
    //     shadowRadius: 2, 
    // },
    // itemContainer: {
    //     width: Dimensions.get('window').width /1.4,
    //     backgroundColor: colors.mainWhiteYellow,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     paddingVertical: 10,
    //     paddingBottom: 15,
    //     borderRadius: 10,
    //      // Shadow
    //      elevation: 2,
    //      overflow: 'hidden',
    //      //iOS:
    //      shadowColor: 'red',
    //      shadowOffset: { width: 1, height: 1 },
    //      shadowOpacity: 0.8,
    //      shadowRadius: 2, 
    //      transform: [
    //          { scale: scale }
    //      ]
    // },
    // iconWrap: {
    //     width: 220,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     borderBottomColor: borderColor,
    //     borderBottomWidth: 2,
    //     paddingBottom: 5,
    //     marginBottom: 10,
    // },
    // icon: {
    //     fontSize: 35,
    //     color: color,
    // },
    title: {
        marginLeft: '3%',
        fontSize: 20,
    },
    text: {
        width: 220,
        fontSize: 18,
        lineHeight: Platform.OS === 'ios' ? 26 : 28,
    },
    okTxt: {
        // marginLeft: Dimensions.get('window').width /6,
        marginLeft: '55%',
        fontSize: 18,
        marginTop: 10,
    }
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

