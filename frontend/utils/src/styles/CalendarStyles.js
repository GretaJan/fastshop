import { StyleSheet } from 'react-native';
import { colors } from './Colors';
import { Dimensions } from 'react-native';

export const calendarStyles = (widthOrtranslate) => StyleSheet.create({
    calculatorMainContainer: {
        width: Dimensions.get('window').width - 20,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderRadius: 5,
        marginBottom: 10
    },
    rowContainerMonth: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: (Dimensions.get('window').height /5.5 ) /2,
        alignItems: 'center',
    },
    rowContainerWeek: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: (Dimensions.get('window').height /5.5 ) /3,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.transparentLight,
        width: Dimensions.get('window').width,
        borderColor: colors.mainGrey,
        borderBottomWidth: 1,
    },
    dayTitleWrap: {
        width: (Dimensions.get('window').width / 7) - 20/7,
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowShort: {
        fontSize: 20,
    },
    arrowLong: {
        fontSize: 30,
    },
    iconMainWrap: {
        width: Dimensions.get('window').width / 7 - 20/7 + Dimensions.get('window').width / 7 - 20/7, 
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
    iconWrap: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 7 - 20/7,
    },
    calendarWrap: {
        width: Dimensions.get('window').width - 20,
        flexDirection: 'row',
        overflow: 'hidden',
        height: 6 * (Dimensions.get('window').width /7) - 20,
    },
    calendarWrapInner: {
        flexDirection: 'row',
        transform: [
            { translateX: widthOrtranslate }
        ],
    },
    btnsWrap: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center' 
    },
    //single month style
    dayWrap: {
        width: Dimensions.get('window').width / 7 - 20/7,
        height: Dimensions.get('window').width / 7 - 20/7,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.transparentLight,
        borderWidth: 1,
        position: 'relative'
    },
    currentDayMarker: {
        width: Dimensions.get('window').width / 7 - 20/7,
        height: Dimensions.get('window').width / 7 - 20/7,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.transparentLight,
        borderWidth: 1,
        backgroundColor: 'rgba(50, 189, 129, .5)',
    },
    listMarkerIcon: {
        position: 'absolute',
        top: Dimensions.get('window').width / 45,
        right: Dimensions.get('window').width / 45,
        fontSize: 20,
        transform: [
            { translateY: widthOrtranslate }
        ],
        color: colors.mainBtnOrange,
    },
    btnEdit: {
        alignSelf: 'center',
        justifyContent: 'flex-end',
        paddingTop: 10,
    },
    datesModal: {
        width: Dimensions.get('window').width - 40,
    },
    datesAnimWrapper: {
        height: Dimensions.get('window').height / 2.3, 
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width - 40,
    },
})

export const singleDayStyle = (translate, color) => StyleSheet.create({
    listItemWrapTranslation: {
        justifyContent: 'center',
        marginBottom: 7,
        backgroundColor: '#fff',
        // Shadow
        elevation   : 1,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
        transform: [
            { translateX: translate  },
        ],
        paddingLeft: 10, 
        paddingTop: 10,
        paddingBottom: 20,
    },
    listRowWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginBottom: 5,
    },
    titleWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        flexBasis: Dimensions.get('window').width - 180,
    },
    componentTotalNo: {
        fontSize: 16,
        paddingRight: 5,
        color: color,
        fontWeight: 'bold',
    },
})
export const buyListSingle = (color) => StyleSheet.create({
    innerContainer: {
        height: (Dimensions.get('window').height /5.5 ) /2,
        width: Dimensions.get('window').width - 20,
        justifyContent: 'center',
    },
    titleTextWrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        alignSelf: 'center',
        width: Dimensions.get('window').width /2.5,
    },
    iconsWrap: {
        position: 'absolute',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        height: Dimensions.get('window').height /5.5 / 2,
        width: Dimensions.get('window').height /5.5,
    },
    iconWrap: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 40,
        color: color
    }, 
    bottomBlock: {
        // height: (Dimensions.get('window').height /5.5 / 2),
        paddingTop: 5,
        justifyContent: 'center',
        marginHorizontal: 5,
        left: 0
    },
    editQuantity: {
        marginHorizontal: 10,
        width: 60,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    editIconStyle: {
        padding: 5,
    }
})

   
