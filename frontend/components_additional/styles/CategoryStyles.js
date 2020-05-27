import { StyleSheet } from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import { colors } from './Colors';
import {Dimensions} from 'react-native';

export const authCategory = (background, error) => StyleSheet.create({
    container: {
        backgroundColor: colors.mainYellow,
        flex: 1,
        alignItems: 'center',
    },
    flatList: {
        paddingTop: 20,
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
        marginBottom: 17,
        marginTop: 15,
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
        backgroundColor: colors.mainWhiteYellow,
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
        // Shadow
        elevation   : 5,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
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
        // Shadow
        elevation   : 5,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
    },
    cancelBtnWrap: {
        backgroundColor: colors.orange,
        height: 55,
        width: 55,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // Shadow
        elevation   : 5,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
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
        backgroundColor: colors.inputOrange,
        height: 30,
        fontSize: 18,
        paddingBottom: -10,
        paddingHorizontal: 7,
        maxWidth: 160,
        width: 180,
        marginLeft: 3,
        borderRadius: 5,
        borderColor: colors.bordo,
        borderWidth: error ? .7 : 0,
        // Shadow
        elevation   : 2,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
    }, 
    backgroundEditWrap: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        width: 150,
    },
    backgroundColor: {
        backgroundColor:background ? background : colors.mainWhiteYellow,
        height: 35,
        width: 35,
        borderColor: colors.mainBlack,
        borderWidth: 1,
        borderRadius: 3,

    },
    backgroundEdit: {
        backgroundColor: colors.inputOrange,
        borderRadius: 5,
        height: 35,
        fontSize: 20,
        paddingBottom: -10,
        minWidth: 112,
        maxWidth: 112,
        marginLeft: 3,
        borderColor: colors.bordo,
        borderWidth: error ? .7 : 0,
        // Shadow
        elevation   : 2,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
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

export const categoryAdd = (error) => StyleSheet.create({
    inputsWrap: {
        marginTop: Dimensions.get('window').height /15,
    },
    textInput: {
        fontSize: 18,
        marginHorizontal: 30,
        height: 50,
        backgroundColor: '#FFFFE0',
        borderRadius: 10,
        marginBottom: 35,
        paddingHorizontal: 15,
        borderColor: colors.bordo,
        borderWidth: error ? .7 : 0,
          // Shadow
          elevation   : 5,
          overflow: 'hidden',
          //iOS:
          shadowColor: 'red',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2, 
    },
    imageBtnWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20,
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