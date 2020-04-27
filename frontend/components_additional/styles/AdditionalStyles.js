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

export const buttonStyle = (color) =>  StyleSheet.create({
    buttonWrap: {
        marginBottom: 20,
        borderColor: colors.transparentLight,
        borderWidth: 1,
        borderRadius: 5,
        width: Dimensions.get('window').width /2,
        height: 60,
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
        fontSize: 22,
    },
});

export const adminButtonStyle = (color, horizontal, vertical) => StyleSheet.create({
    buttonWrap: {
        backgroundColor: color,
        paddingHorizontal: 20,
        paddingVertical: 15,
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
    }
}) 

export const modalStyle = () => StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        flex: 1,
        width: Dimensions.get('window').width /1,
        height: Dimensions.get('window').height /1,
        alignItems: 'center',
        backgroundColor: colors.transparentLight,
        paddingTop: Dimensions.get('window').height /6,
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
        borderBottomColor: colors.mainYellowTransparent,
        borderBottomWidth: 2,
        paddingBottom: 5,
        marginBottom: 10,
    },
    icon: {
        fontSize: 35,
        color: colors.mainYellow,
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
        marginLeft: '65%',
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
        // paddingHorizontal: 35,
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
})