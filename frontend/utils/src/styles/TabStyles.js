import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors } from './Colors';

export const selectCountStyle = StyleSheet.create({
    counter: {
        position: 'absolute',
        top: -6,
        left: '5%',
        backgroundColor: colors.mainBtnOrange,
        width: 20,
        height: 20,
        borderRadius: 20/2
    },
    counterNo: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed'
    },
    iconItem: {
        color: colors.mainGrey,
        fontSize: 30,
    }
})
export const signinStyle = StyleSheet.create({
    container: {
        top: Dimensions.get('window').height /1 - 83,
        width: '33.33%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        zIndex: 1,
        position: 'absolute',
        alignSelf: 'flex-end',
    },
    iconItem: {
        color: colors.mainGrey,
        fontSize: 30,
    }
});