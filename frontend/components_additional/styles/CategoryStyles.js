import { StyleSheet } from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import { colors } from './Colors';
import {Dimensions} from 'react-native';

export const authCategory = (background_color, border_color) => StyleSheet.create({
    container: {
        backgroundColor: colors.mainYellow,
        flex: 1,
        alignItems: 'center',
        paddingTop: '2%',
    },
    flatList: {
        marginTop: 30,
    },
    addBtn: {
        top: 10,
        height: 80,
        alignSelf: 'center',
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
        height: '100%',
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
        backgroundColor: colors.mainWhiteYellow,
        paddingVertical: 10,
        // paddingHorizontal: 50,
        width: Dimensions.get('window').width /1.7,
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
        marginLeft: 60,
    },  
    inactiveBtnsWrap: {
        width: 50,
        alignItems: 'center',
        marginLeft: 10,
    },
    editBtnWrap: {
        marginBottom: 20,
        paddingVertical: 5,
    },
    editBtn: {
        fontSize: 45,
        paddingVertical: 5,
        color: colors.mediumGreen2,
    },
    removeBtnWrap: {
        fontSize: 45,
    },
    removeBtn: {
        fontSize: 45,
        color: colors.bordo,
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
    imageStyleActive: {
        width: 100,
        height: 100,
        resizeMode: 'contain' 
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
    backgrounEditWrap: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        width: 150,
    },
    backgroundColor: {
        backgroundColor: background_color ? background_color : colors.mainWhiteYellow,
        height: 35,
        width: 35,
        borderColor: colors.mainBlack,
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
        paddingTop: '20%',
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
        height: 100,
        width: 100,
        marginBottom: 5,
    },
    image: {
        height: '100%',
        resizeMode: 'contain' 
    },
    flatList: {
    },
    itemWrap: {
        backgroundColor: colors.mainWhiteYellow,
        // paddingVertical: 15,
        paddingTop: 7,
        paddingBottom: 10,
        paddingHorizontal: 35,
        marginBottom: 30,
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
    itemText: {
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed',
        fontSize: 15
    },
    imageIcon: {
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed',
        fontSize: 50,
        color: '#000'
    }
})

// export const shadow = () => ({
//     width:100,
// 	height:100,
// 	color:"#000",
// 	border:2,
// 	radius:3,
// 	opacity:0.2,
// 	x:0,
// 	y:3,
// })