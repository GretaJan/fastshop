import { StyleSheet } from 'react-native';
import { colors } from './Colors';
import {Dimensions} from 'react-native';

export const productWrap = () => StyleSheet.create({
    container: {
        flex: 1,
    },
    flatListScrollSmall: {
        height: Dimensions.get('window').height /2.4,
    },
    flatListScrollFull: {
        height: Dimensions.get('window').height /1,
        zIndex: 2
    },
    arrayContainer: {
        marginVertical: 5,
    },
    btnsContainer: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        // minHeight: Dimensions.get('window').height /5,
        marginBottom: 40,
        zIndex: 0
    },
    infoTxt: {
        fontSize: 20
    },
    iconItem: {
        fontSize: 45
    },
    btnOne: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginHorizontal: 20,
    },
    btnTwo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginHorizontal: 20,
    },
    iconWrapOne: {
        backgroundColor: colors.mediumGreen2,
        paddingHorizontal: 27.5,
        paddingVertical: 20,
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 10,
          // Shadow
          elevation   : 5,
          overflow: 'hidden',
          //iOS:
          shadowColor: 'red',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2, 
    },
    iconWrapTwo: {
        backgroundColor: colors.orangeBright,
        paddingHorizontal: 30,
        paddingVertical: 20,
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 10,
          // Shadow
          elevation   : 5,
          overflow: 'hidden',
          //iOS:
          shadowColor: 'red',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2, 
    },
    textWrap: {
        flex: 1,
        marginLeft: 10,
    },
    optionsBtnWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.transparentLight,
        position: 'absolute',
        zIndex: 3,
        // marginTop: 5,
        height: 40,
        bottom: 0,
        width: Dimensions.get('window').width /1
    },
    optionsBtnText: {
        fontSize: 22,
    }
});

export const descAsc = () => StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 5,
        backgroundColor: colors.mainYellow,
        width: Dimensions.get('window').width /1,
        minHeight: Dimensions.get('window').height /1,
     
    },
    itemWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        paddingHorizontal: 30,
        borderBottomColor: colors.transparentLight,
        borderBottomWidth: 1,
        // borderColor: activeItem ? colors.mainWhiteYellow : 'rgba(0, 0, 0, 0)',
        // borderWidth: 3,
    },
    text: {
        fontSize: 18,
        textTransform: 'uppercase'
    },
    btnWrap: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    iconWrap: {
        // backgroundColor: colors.mediumGreen2,
        // paddingVertical: 10,
    },
    btnIcon: {
        fontSize: 35,
        color: colors.mediumGreen2,
    },
    btnText: {
        fontSize: 20,
        marginLeft: 10 
    },
    icon: {
        fontSize: 20,
        color: colors.mainBlack,
    }
})