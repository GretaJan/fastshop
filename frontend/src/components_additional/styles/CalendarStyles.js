import { StyleSheet } from 'react-native';
import { colors } from './Colors';
import { Dimensions } from 'react-native';

export const calendarStyles = (widthOrtranslate) => StyleSheet.create({
    calculatorMainContainer: {
        width: Dimensions.get('window').width,
        position: 'relative',
    },
    // calculatorMainContainer: {
    //     // justifyContent: 'center',
    //     // height: '100%',
    // },
    // calculatorInnerContainer: {
    //     // height: Dimensions.get('window').height /1.6,
    //     // justifyContent: 'center',
    // },
    horizontalWrapWeek: {
        alignItems: 'flex-start',
    },
    horizontalWrapMonth: {
        alignItems: 'flex-start',
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
        // width: Dimensions.get('window').width - (20/7),
        width: Dimensions.get('window').width,
    },
    arrowShort: {
        fontSize: 20,
    },
    arrowLong: {
        fontSize: 30,
    },
    iconMainWrap: {
        // width: Dimensions.get('window').width / 7 - (20/7) + Dimensions.get('window').width / 7 - (20/7), 
        width: Dimensions.get('window').width / 7 + Dimensions.get('window').width / 7, 
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
    iconWrap: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // width: Dimensions.get('window').width / 7 - (20/7),
        width: Dimensions.get('window').width / 7,
        backgroundColor: colors.textGrey,
    },
    flatlistWrap: {
        alignItems: 'flex-start',
        width: widthOrtranslate
    },
    calendarMonthWrapStyle: {
        // transform: [
        //     { translateX:  widthOrtranslate }
        // ],
        backgroundColor: 'red',
        // display: 'flex',
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
        // width: Dimensions.get('window').width / 7 - (20/7),
        // height: Dimensions.get('window').width / 7 - (20/7),
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