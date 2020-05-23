import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';
import { colors } from './Colors';
import {Platform} from 'react-native';

export const searchBar = () =>  StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        top: 0,
    },
    searchBarIcon: {
        width: 'auto',
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 5,
        marginBottom: 15,
        fontSize: 20,
        marginLeft: 5,
    },
    searchBarInput: {
        position: 'absolute',
        width: '85%',
        marginLeft: 35,
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingBottom: -20,
        marginTop: 0,
        marginBottom: 30,
        fontSize: 14
    },
});

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

export const adminButtonStyle = (color, horizontal, vertical) => StyleSheet.create({
    buttonWrap: {
        backgroundColor: color,
        borderRadius: 3,
         // Shadow
         elevation: 3,
         overflow: 'hidden',
         //iOS:
         shadowColor: 'red',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity: 0.8,
         shadowRadius: 2, 
    },
    buttonTxt: {
        fontSize: 15,
        paddingHorizontal: horizontal,
        paddingVertical: vertical,
    }
}) 

export const modalStyle = (color, borderColor) => StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 40,
        flex: 1,
        width: Dimensions.get('window').width /1,
        height: Dimensions.get('window').height /1,
        minHeight: Dimensions.get('window').height /1,
        alignItems: 'center',
        backgroundColor: colors.transparentLight,
        paddingTop: Dimensions.get('window').height /6,
        top: -5,
        // Shadow
        elevation   : 5,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
    },
    itemContainer: {
        width: Dimensions.get('window').width /1.4,
        backgroundColor: colors.mainWhiteYellow,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingBottom: 15,
        borderRadius: 10,
         // Shadow
         elevation: 2,
         overflow: 'hidden',
         //iOS:
         shadowColor: 'red',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity: 0.8,
         shadowRadius: 2, 
    },
    iconWrap: {
        width: 220,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: borderColor,
        borderBottomWidth: 2,
        paddingBottom: 5,
        marginBottom: 10,
    },
    icon: {
        fontSize: 35,
        color: color,
    },
    title: {
        marginLeft: '3%',
        fontSize: 20,
    },
    textWrap: {
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
export const modalStyleDelete = (color, borderColor) => StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 40,
        flex: 1,
        width: Dimensions.get('window').width /1,
        alignItems: 'center',
        // Shadow
        elevation   : 5,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
    },
    itemContainer: {
        width: Dimensions.get('window').width /1.4,
        backgroundColor: colors.mainWhiteYellow,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingBottom: 15,
        borderRadius: 10,
         // Shadow
         elevation: 2,
         overflow: 'hidden',
         //iOS:
         shadowColor: 'red',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity: 0.8,
         shadowRadius: 2, 
    },
    iconWrap: {
        width: 220,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: borderColor,
        borderBottomWidth: 2,
        paddingBottom: 5,
        marginBottom: 10,
    },
    icon: {
        fontSize: 35,
        color: color,
    },
    title: {
        marginLeft: '3%',
        fontSize: 20,
    },
    textWrap: {
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
export const modalConfirm = (color) => StyleSheet.create({
    itemContainer: {
        width: Dimensions.get('window').width /1.2,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        top: '10%',
        paddingBottom: 30,
        borderRadius: 10,
    },
    btnsWrap: {
        flexDirection: 'row',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    btnOne: {
    },
    btnTwo: {

    }
});

export const emptyList = (background) => StyleSheet.create({
    container: {
        backgroundColor: background ? background : colors.mainYellow,
        height: Dimensions.get('window').height /1,
        width: Dimensions.get('window').width /1,
        position: 'absolute',
        alignItems: 'center',
    },
    itemContainer: {
        alignItems: 'center',
        top: (Dimensions.get('window').height /4),
    },
    imageWrap: {
        backgroundColor: colors.transparentLight,
        paddingVertical: 16,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    text: {
        marginTop: 55,
        fontSize: 18,
    }
});

export const roundButton = (color) => StyleSheet.create({
    buttonWrap: {
        position: 'absolute',
        zIndex: 20,
        top: Dimensions.get('window').height /1.55,
        right: 15,
        paddingLeft: 20,
        paddingTop: 20,
        // Shadow
        elevation: 5,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
    },
    icon: {
        color: color ? color : colors.mainWhiteYellow,
        fontSize: 70,
    }
})
export const backgroundForPages = (background) => StyleSheet.create({
    backgroundContainer: {
        backgroundColor: background ? background : colors.mainYellow, 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // minHeight: Dimensions.get('window').height /1,
    }
});

export const emptyListSelected = () => StyleSheet.create({
    container: {
       height: Dimensions.get('window').height /2.4,
       backgroundColor: colors.mainYellow,
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
})


