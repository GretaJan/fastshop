import { StyleSheet } from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import { colors } from './Colors';
import {Dimensions} from 'react-native';

export const authCategory = (background=colors.mainWhiteYellow, error) => StyleSheet.create({
    container: {
        backgroundColor: colors.mainGrey,
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
        backgroundColor: colors.mainBtnGreen,
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
        backgroundColor: colors.mainBtnOrange,
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
        alignItems: 'center',
        width: 150,
    },
    backgroundColor: {
        backgroundColor: background,
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
        backgroundColor: colors.mainGrey,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: (Dimensions.get('window').height /1) - 142,
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
    descriptionText: {
        position: 'absolute',
        top: 20,
       width: Dimensions.get('window').width /2,
       textAlign: 'center',
    },
    flatList: {
        width: Dimensions.get('window').width /1,
        justifyContent: 'center',
        alignItems: 'center',
        height: (Dimensions.get('window').height /1) - 142,
    },
    itemWrap: {
        height: 60,
        width: 185,
        borderColor: colors.mainBtnGreen,
        borderWidth: 2,
        marginBottom: 40
    },
    itemWrapHover: {
        height: 60,
        width: 185,
        borderColor: colors.mainBtnGreen,
        borderWidth: 2,
        marginBottom: 40
    },
    itemText: {
        fontSize: 20,
        color: colors.mainBtnGreen,
        textAlign: 'center',
        height: '100%',
        textAlignVertical: 'center',
        fontWeight: 'bold',
    },
    itemTextHover: {
        fontSize: 20,
        color: colors.mainGrey,
        backgroundColor: colors.mainBtnGreen,
        textAlign: 'center',
        height: '100%',
        textAlignVertical: 'center',
        fontWeight: 'bold',
    },
    imgIcon: {
        fontSize: 40,
        top: -25,
        left: '50%',
        transform: [
            { translateX: -25 }
        ],
        paddingHorizontal: 3,
        backgroundColor: colors.mainGrey, 
        color: colors.mainBtnGreen,
        position: 'absolute',
        zIndex: 1,
    },
    imgIconHover: {
        // display: 'none',
        fontSize: 40,
        top: 3,
        left: 15, 
        color: colors.mainGrey,
        position: 'absolute',
        zIndex: 1,
    },
    arrowIcon: {
        position: 'absolute',
        right: 15,
        color: colors.mainBtnGreen,
        fontSize: 20,
        top: 15,
        paddingTop: 4,
    },
    arrowIconHover: {
        position: 'absolute',
        right: 15,
        color: colors.mainGrey,
        fontSize: 20,
        top: 15,
        paddingTop: 4,
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