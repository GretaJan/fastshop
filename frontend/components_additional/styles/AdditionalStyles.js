import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';
import { colors } from './Colors';

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
    buttonSave: {
        marginBottom: 20,
        borderColor: "#000",
        borderWidth: 1,
        width: Dimensions.get('window').width /2,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',   
        backgroundColor: color, 
          // Shadow
          elevation   : 5,
          overflow: 'hidden',
          //iOS:
          shadowColor: 'red',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2, 
    },
    buttonTxt: {
        fontSize: 25,
    },
});

export const modalStyle = () => StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 3,
        width: Dimensions.get('window').width /1,
        height: Dimensions.get('window').width /1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemWrap: {
        width: Dimensions.get('window').width /1.5,
        backgroundColor: colors.transparentMedium,
    },
    icon: {
        textAlign: 'left',
        fontSize: 24
    },
    text: {
        fontSize: 24
    }
})