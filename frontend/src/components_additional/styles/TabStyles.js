import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors } from './Colors';

export const styles = () => StyleSheet.create({
    container: {
        backgroundColor: '#335c67'
    },
    counter: {
        position: 'absolute',
        top: -6,
        // left: 11.3,
        left: '5%',
        // backgroundColor: '#e5e9ee',
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
        // color: '#FFFFE0',
        color: colors.mainGrey,
        fontSize: 30,
    }
})
export const signinStyle = (modelCalled) => StyleSheet.create({
    container: {
        // top: Dimensions.get('window').height /1 - 69,
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
        color: modelCalled ? colors.mainBtnGreen : colors.mainGrey,
        fontSize: 30,
    }
});