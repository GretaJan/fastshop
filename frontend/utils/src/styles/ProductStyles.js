import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';
import { colors } from './Colors';


export const stylesGuest = (background, rotateBtn, isSelected, translate) => StyleSheet.create( {
    itemWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        height: 65,
        marginBottom: 5,
        backgroundColor: colors.transparentMedium,
         // Shadow
         elevation   : .5,
         overflow: 'hidden',
         //iOS:
         shadowColor: 'red',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity: 0.8,
         shadowRadius: 2, 
    },
    itemWrapTranslation: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 65,
        marginVertical: 2,
        backgroundColor: colors.transparentMedium,
        // Shadow
        elevation: 0.8,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
        transform: [
            { translateX: translate  },
        ],
    },
    TextPicWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

    },
    itemText: {
        width: '78%',
        textAlign: 'left',
        paddingLeft: 10,
    },
    imageWrap: {
        width: 60,
        height: 60,
        paddingLeft: 2,
        justifyContent: 'center',
    },
    image: {
        height: '100%',
        resizeMode: 'cover'        
    },
    imageIcon: {
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed',
        fontSize: 50,
        color: '#000',
    },
    animatedWrap: {
        zIndex: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: isSelected ? colors.transparentLight : colors.mainGreyTransparent,
        borderLeftWidth: 1,
        transform: [
            { rotateY: rotateBtn }
        ],
        backgroundColor: isSelected ? colors.mainGreyTransparent : null,
    }
});

export const stylesGuestSingle = (background, isActive, rotateBtn, listScale, checkTransition, listCheckScale) => StyleSheet.create({
    imageStyle: {
        width: Dimensions.get('window').width - 140,
        height: '100%',
        zIndex: 15,
        borderRadius: 3,
        resizeMode: 'cover',
    },
    listContainer: {
        backgroundColor: background ? background : colors.mainGrey,
        width:  Dimensions.get('window').width - 20,
        paddingTop: 5,
    },
    flatlistContainer: {
        justifyContent: 'space-evenly',
        alignContent: 'center',
        height: Dimensions.get('window').height - Dimensions.get('window').height /3.5 - Dimensions.get('window').height/5.5 - 30,
    },
    listItemWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        paddingVertical: 4,
        borderTopColor: colors.mainWhiteGreyTrans,
        borderTopWidth: 1,
    },
    titleWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        flexBasis: '75%',
    },
    componentIconWrap: {
        height: 31,
        width: 31,
        marginRight: 10,
    },
    componentIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    listItemInfoWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        flexBasis: 60,
        justifyContent: 'flex-end'
    },
    componentAmount: {
        fontSize: 16,
        paddingRight: 5,
        color: colors.mainBtnOrange
  
    },
    componentMeasure: {
        paddingBottom: 6,
        color: colors.darkerGray
    },
    btnsWrap: {
        position: 'absolute',
        zIndex: 1, 
        right: 0,
        height: '100%',
        justifyContent: 'center'
    },
    // like button
    likeBtns: {
        width: 45,
        marginBottom: 10,
    },
    neutralBtnLiked: {
        backgroundColor: isActive ? colors.mainBtnGreen  : colors.mainGrey,
        width: 45,
        height: 45,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        // Shadow
        elevation   : 5,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
        position: 'relative',
        transform: [
            { rotateY: rotateBtn }
        ]
    },
    iconHeartLike: {
        fontSize: 26,
        color: colors.mainBtnOrange,
        position: 'absolute',
        fontWeight: 'bold'
    },
    cartTxt: {
        top: -1,
        position: 'absolute',
        color: colors.mainWhiteGrey,
        fontSize: 12,
    },
    iconCartLike: {
        color: '#000',
        fontSize: 28,
        fontWeight: 'normal',
        position: 'absolute',
        bottom: 4,
    },
    unlikeBtn: {
        backgroundColor: colors.mainBtnGreen,
        width: 45,
        height: 45,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 5,
          // Shadow
          elevation   : 5,
          overflow: 'hidden',
          //iOS:
          shadowColor: 'red',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2, 
          position: 'relative',
    },
    iconCart: {
        color: '#000',
        fontSize: 28,
        fontWeight: 'normal',
        position: 'absolute',
    },
    iconHeart: {
        position: 'absolute',
        top: 5,
        fontSize: 16,
        color: colors.mainBtnOrange,
     
    },
    //Check btn
    uncheckBtn: {
        backgroundColor: colors.mainBtnOrange,
        width: 45,
        height: 45,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 5,
          // Shadow
          elevation   : 5,
          overflow: 'hidden',
          //iOS:
          shadowColor: 'red',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2, 
          position: 'relative',
        transform: [
            { rotateY: rotateBtn }
        ]
    },
    calcCheck: {
        fontSize: 47,
        color: colors.mainBtnGreen,
        transform: [
            { scaleX: listCheckScale }
        ],
    },
    calcUncheckList: {
        fontSize: 28,
        position: 'absolute',
        fontWeight: 'bold',
        transform: [
            { rotateY: '-180deg' },
            { scale: listScale }
        ],
    },
    calcUncheck: {
        position: 'absolute',
        fontSize: 45,
        color: colors.mainBtnGreen,
        left: 3,
        top: -8,
        fontWeight: 'bold',
        transform: [
            { translateY: checkTransition },
            { rotateY: '-180deg' }
        ], 
    },
    calcUncheckMainPg: {
        position: 'absolute',
        fontSize: 50,
        color: colors.mainBtnGreen,
        left: 8,
        top: -3,
        fontWeight: 'bold',
        transform: [
            { translateY: checkTransition },
            { rotateY: '-180deg' }
        ], 
    },
    calcRemove: {
        fontSize: 30,
        color: colors.mainBlack
    }
});

export const authProducts = (background) => StyleSheet.create({
    container: {
        flex: 1,
        minHeight: Dimensions.get('window').height /1,
        backgroundColor: background ? background : colors.mainGrey,
        zIndex: 0,
    },
}) 


export const authProduct = (color, error) => StyleSheet.create({
    imageIconWrap: {
        zIndex: 10,
        width: '100%'    
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 250,
        borderBottomWidth: 90,
        borderLeftWidth: 250,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: color ? color : colors.yellowGreenish,
        borderLeftColor: 'transparent',
        position: 'absolute',
        top: 100,
        zIndex: 0
    },
    underTriangle: {
        height: 50,
        width: Dimensions.get('window').width /1,
        backgroundColor: color ? color : colors.yellowGreenish,
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: color ? color : colors.yellowGreenish,
        width: Dimensions.get('window').width /1,
    },
    backgroundRectangle: {
        // width: 80,
        height: 40,
        borderColor: colors.mainWhiteYellow,
        borderWidth: 2,
        flex: 1,
        marginRight: 55,
    },
    editBtnWrap: {
        position: 'absolute',
        right: 55,
        zIndex: 12,
        top: 25,
         // Shadow
         elevation   : 5,
         overflow: 'hidden',
         //iOS:
         shadowColor: 'red',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity: 0.8,
         shadowRadius: 2, 
    },
    editIcon: {
        fontSize: 45,
    },
    uploadIcon: {
        fontSize: 45,
        position: 'absolute',
        // right: 50,
        // zIndex: 10,
        top: 50,
    },
    iconsImgWrap: {
        position: 'absolute',
        right: 53,
        top: 22,
        zIndex: 11,
    },
    emptyItem: {
        position: 'absolute',
        zIndex: 12,
        alignSelf: 'center',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: colors.mainBtnOrange,
        height: 52,
        width: 52,
        borderRadius: 52/2,
        top: 160,
    },
    emptyIcon: {
        fontSize: 40,
    },
    editBtnImg: {
        backgroundColor: colors.mainBtnGreen,
        height: 45,
        width: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
         // Shadow
         elevation   : 5,
         overflow: 'hidden',
         //iOS:
         shadowColor: 'red',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity: 0.8,
         shadowRadius: 2, 
    },
    iconImgSave: {
        fontSize: 35,
    },
    editBtnWrapImg: {
        backgroundColor: colors.mainBtnGreen,
        height: 45,
        width: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        top: 30,
        position: 'absolute',
         // Shadow
         elevation   : 5,
         overflow: 'hidden',
         //iOS:
         shadowColor: 'red',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity: 0.8,
         shadowRadius: 2, 
    },
    editBtnsWrapImg: {
        right: 20,
        top: 30,
        position: 'absolute',
    },
    cancelBtnImg: {
        backgroundColor: colors.orange,
        height: 45,
        width: 45,
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
    editImgIcon: {
        fontSize: 35,
    },
    iconImgCancel: {
        fontSize: 35,
    },
    iconEdit: {
        fontSize: 35,
    },
    iconSave: {
        fontSize: 35,
    },
    iconCancel: {
        fontSize: 35,
    },

    // INPUTS:
    componentTitle: {
        width: '45%',
        fontSize: 20,
        paddingLeft: 0,
     },
     componentNameTitle: {
        width: '20%',
        fontSize: 20,
        paddingLeft: 0,
    },
     listItemWrap: {
        flex: 1,
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        // paddingBottom: 10,
        borderBottomColor: '#F7F7F7',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
     },
     iconsWrap: {
        //  flex: 1, 
         flexDirection: 'row',
     },
     saveWrap: {
        backgroundColor: colors.mainBtnGreen,
        height: 45,
        width: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
         // Shadow
         elevation   : 5,
         overflow: 'hidden',
         //iOS:
         shadowColor: 'red',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity: 0.8,
         shadowRadius: 2, 
    },
     itemInput: {
         flex: 1,
         backgroundColor: colors.mainWhiteYellow,
         borderRadius: 5,
         fontSize: 20,
         left: -4,
         paddingVertical: 0,
         height: 38,
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
     listItemInfoWrap: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nameItemInfoWrap: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nameItemBackground: {
        fontSize: 20,
        marginLeft: 30,
        flex: .9,
    },
    nameItemInput: {
        flex: 1,
        backgroundColor: colors.mainWhiteYellow,
        borderRadius: 5,
        fontSize: 20,
        flex: .98,
        height: 38,
        paddingVertical: 0,
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
    listItemBackground: {
        fontSize: 20,
    },
});

export const postProductStyle = (error = null, background) => StyleSheet.create({
    container: {
        backgroundColor: background ? background : colors.mainGrey,
        paddingHorizontal: 30,
    },
    inputsWrap: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        top: 10,
    },
    textInputName: {
        zIndex:10,
        width: '80%',
        fontSize: 17,
        height: 45,
        backgroundColor: colors.mainWhiteYellow,
        borderRadius: 10,
        marginBottom: 10,
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
    textInput: {
        width: 100,
        fontSize: 17,
        marginRight: 20,
        height: 45,
        backgroundColor: colors.mainWhiteYellow,
        borderRadius: 10,
        marginBottom: 10,
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
    singleWrap: {
        flex: .5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    singleName: {
        fontSize: 17,
        // flex: .6,
    },
    measure: {
        fontSize: 16,
        marginBottom: 20,
        width: 30,
        color: colors.mainBlack
    },
    backgroundWrap: {
        flex: 1,
        alignItems: 'center',
             
    },
    backgroundColor: {
        width: 140,
        height: 50,
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: colors.mainWhiteYellow,
        borderWidth: 1,
        borderRadius: 2,
    },
    textInputBackground: {
        width: 151,
        maxWidth: 151,
        fontSize: 17,
        height: 45,
        backgroundColor: colors.mainWhiteYellow,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 14,
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
    imageBtnsFlex: {
       flex: 1,
       flexDirection: 'row', 
       alignItems: 'center',
       marginTop: 20,
       justifyContent: 'space-between',
       paddingRight: '10%',
    },
    buttonsWrap: {
        flex: 1,
        alignItems: 'center',
        paddingTop:20,
    },
    imageWrap: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
      imageStyle: {
        width: 150,
        height: 150,
        resizeMode: 'cover' 
    },
    buttonsWrap: {
        alignItems: 'center',
        marginTop: 30,
    }

})