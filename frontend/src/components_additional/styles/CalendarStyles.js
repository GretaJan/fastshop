import { StyleSheet } from 'react-native';
import { colors } from './Colors';
import { Dimensions } from 'react-native';

export const calendarStyles = (widthOrtranslate) => StyleSheet.create({
    calculatorMainContainer: {
        width: Dimensions.get('window').width,
        position: 'relative',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.transparentLight,
        width: Dimensions.get('window').width,
    },
    arrowShort: {
        fontSize: 20,
    },
    arrowLong: {
        fontSize: 30,
    },
    iconMainWrap: {
        width: Dimensions.get('window').width / 7 + Dimensions.get('window').width / 7, 
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
    iconWrap: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 7,
        backgroundColor: colors.textGrey,
    },
    calendarWrap: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    calendarWrapInner: {
        // width: widthOrtranslate,
        // top: Dimensions.get('window').width / 7,
        flexDirection: 'row',
        transform: [
            { translateX: widthOrtranslate }
        ],
    },
    dayWrap: {
        width: Dimensions.get('window').width / 7,
        height: Dimensions.get('window').width / 7,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.transparentLight,
        borderWidth: 1,
    },
    currentDayMarker: {
        width: Dimensions.get('window').width / 7,
        height: Dimensions.get('window').width / 7,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.transparentLight,
        borderWidth: 1,
        backgroundColor: 'rgba(50, 189, 129, .5)',
    }
})