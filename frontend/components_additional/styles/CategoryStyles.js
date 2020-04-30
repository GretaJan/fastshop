import { StyleSheet } from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import { colors } from './Colors';
import {Dimensions} from 'react-native';

export const authCategory = (background) => StyleSheet.create({
    container: {
        backgroundColor: colors.mainYellow,
        flex: 1,
        alignItems: 'center',
        paddingTop: '2%',
    },
    flatList: {
        marginTop: 20,
        width: Dimensions.get('window').width /1,
    },
    itemContainer: {
       flex: 1,
       flexDirection: 'row',
       justifyContent: 'space-between',
       justifyContent: 'center',
        alignItems: 'center',
    },
    imageWrap: {
        height: 100,
        width: 100,
        justifyContent: 'center',
    },
    imageStyle: {
        height: 100,
        resizeMode: 'contain' 
    },
    imageActiveStyle: {
        width: 100,
        height: 100,
        resizeMode: 'contain' 
    },
    imageIcon: {
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed',
        fontSize: 50,
        color: '#000'
    },
    nameTxtWrap: {
        marginTop: 5,
        marginBottom: 7,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif-condensed',
        fontSize: 15,
        height: 40,
        width: '100%',
    },
    nameTxt: {
        fontSize: 15,
        fontFamily: 'sans-serif-condensed',
    },
    inactiveItemWrap: {
        backgroundColor: background ? background : colors.mainWhiteYellow,
        paddingVertical: 10,
        // paddingHorizontal: 50,
        width: Dimensions.get('window').width /1.8,
        marginBottom: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // Shadow
        elevation   : 5,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
        marginRight: 60,
    },  
    inactiveBtnsWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
    editBtnWrap: {
        backgroundColor: colors.mediumGreen2,
        height: 55,
        width: 55,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        top: -15,
    },
    editBtn: {
        fontSize: 45,
       
    },
    removeBtnWrap: {
        backgroundColor: colors.orangeBright,
        height: 55,
        width: 55,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeBtn: {
        fontSize: 45,
    },
    goToSubBtnWrap: {
    },
    goToSubBtn: {
    },
    imageWrapActive: {
        flex: 1,
        flexDirection: 'row',
        width: 100,
        height: 100,
    },
    uploadIcon: {
        position: 'absolute',
        fontSize: 35,
        height: 35,
        width: 35,
        top: 50 - 17.5,
        right: 50 - 17.5,

    },
    nameEdit: {
        borderBottomColor: colors.mainBlack,
        backgroundColor: colors.inputOrange,
        borderBottomWidth: 1,
        height: 35,
        fontSize: 20,
        paddingBottom: -10,
        minWidth: 150,
        marginLeft: 3,
    }, 
    backgroundEdit: {
        backgroundColor: colors.lightGreen,
    },
    editIcon: {

    },
    cancelIcon: {

    },
    backgroundEditWrap: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        width: 150,
    },
    backgroundColor: {
        // backgroundColor: backgroundColor ? backgroundColor : colors.mainWhiteYellow,
        height: 35,
        width: 35,
        borderColor: colors.mainWhiteYellow,
        borderWidth: 1,
        borderRadius: 3,
    },
    backgroundEdit: {
        borderBottomColor: colors.mainBlack,
        backgroundColor: colors.inputOrange,
        borderBottomWidth: 1,
        height: 35,
        fontSize: 20,
        paddingBottom: -10,
        minWidth: 112,
        maxWidth: 112,
        marginLeft: 3,
    }
});

export const stylesGuest = () => StyleSheet.create({
    container: {
        // backgroundColor: '#ffdc75',
        backgroundColor: '#ffcc33',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    searchBarContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    searchBarIcon: {
        width: 'auto',
        paddingTop: 10,
        paddingBottom: 15,
    },
    searchBarInput: {
        marginLeft: 5
    },
    imageWrap: {
        height: 120,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain' 
    },
    flatList: {
        width: Dimensions.get('window').width /1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '25%',
    },
    itemWrap: {
        backgroundColor: colors.mainWhiteYellow,
        marginBottom: 20,
        borderRadius: 10,
        height: 155,
        width: 160,
        justifyContent: 'center',
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
    itemText: {
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed',
        fontSize: 16,
    },
    imageIcon: {
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed',
        fontSize: 100,
        color: '#000'
    }
})

export const categoryAdd = () => StyleSheet.create({
    imageBtnWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadIcon: {
        position: 'absolute',
        fontSize: 35
    },
    imageWrap: {
        width: 130,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: 130,
        height: 130,
        resizeMode: 'contain' 
    }

})