import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';
import { colors } from './Colors';


export const stylesGuest = (background) => StyleSheet.create( {
    container: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: background ? background : colors.mainYellow,
    },
    itemWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        height: 65,
        marginHorizontal: 5,
        marginVertical: 3,
        backgroundColor: colors.transparentMedium,
         // Shadow
         elevation   : 1,
         overflow: 'hidden',
         //iOS:
         shadowColor: 'red',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity: 0.8,
         shadowRadius: 2, 
    },
    TextPicWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        fontFamily: 'sans-serif-condensed',
        width: '75%',
        fontSize: 18,
        textAlign: 'left',
        paddingLeft: 10
    },
    imageWrap: {
        width: 60,
        height: 60,
        paddingLeft: 2,
    },
    image: {
        height: '100%',
        resizeMode: 'cover'        
    },
    imageIcon: {
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed',
        fontSize: 50,
        color: '#000'
    },
    iconItem: {
        fontSize: 30,
        paddingRight: 10,
    }
});

export const stylesGuestSingle = (background) => StyleSheet.create( {
    container: {
        flex: 1,
        textAlign: 'center',
        alignItems:'center',
        backgroundColor: colors.mainWhiteYellow,
    },
    imageContainer: {
        // width: Dimensions.get('window').width /2.3,
        width: 265,
        height: 180,
        textAlign: 'center',
        alignItems:'center',
        // justifyContent: 'center',
        alignSelf: 'center',
        top: 5,
        zIndex: 1,
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        // borderRadius: 10,
    },
    emptyItem: {
        position: 'absolute',
        // backgroundColor: '#f8f8f8',
        backgroundColor: colors.mainWhiteYellow,
        width: 45,
        height: 45,
        borderRadius: 45/2,
        marginTop: 160,
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyIcon: {
        fontSize: 45,
        color: background ? background : colors.mainYellow
        // top: 12,
        // left: 18, 
    },
    listContainer: {
        backgroundColor: background ? background : colors.yellowGreenish,
        flex: 1,
        // maxWidth: Dimensions.get('window').width /1,
        width: Dimensions.get('window').width /1,
    },
    //Items
    listItemWrap: {
        flex: 1,
        flexDirection: 'row',
        height: 65,
        alignItems: 'center',
        borderBottomColor: '#F7F7F7',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
    },
    listItemInfoWrap: {
        flex: 1,
        flexDirection: 'row',
        // alignContent: 'center',
        // justifyContent: 'center',
        alignItems: 'flex-start',
    },
    componentTitle: {
       width: '65%',
       fontSize: 20,
       paddingLeft: 20,
    },
    componentAmount: {
        fontSize: 24,
        flex: 0.5,
    },
    componentMeasure: {
        fontSize: 20,
        color: colors.mainBlack,
        flex: 0.5,
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
        borderBottomColor: background ? background : colors.yellowGreenish,
        borderLeftColor: 'transparent',
        position: 'absolute',
        top: 100,
        zIndex: 0
      },
      underTriangle: {
        height: 50,
        width: Dimensions.get('window').width /1,
        backgroundColor: background ? background : colors.yellowGreenish,
    },
});

export const authProducts = (background) => StyleSheet.create({
    container: {
        flex: 1,
        minHeight: Dimensions.get('window').height /1,
        backgroundColor: background ? background : colors.mainYellow,
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
        backgroundColor: colors.orangeBright,
        height: 52,
        width: 52,
        borderRadius: 52/2,
        top: 160,
    },
    emptyIcon: {
        fontSize: 40,
    },
    editBtnImg: {
        backgroundColor: colors.mediumGreen2,
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
        backgroundColor: colors.mediumGreen2,
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
        height: 100,
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
        backgroundColor: colors.mediumGreen2,
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
        left: -4,
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

export const postProductStyle = (error, background) => StyleSheet.create({
    container: {
        backgroundColor: background ? background : colors.mainYellow,
        // height: Dimensions.get('window').height /1,
        paddingHorizontal: 30,
    },
    inputsWrap: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        top: 10,
    },
    textInputName: {
        zIndex:10,
        width: '99.5%',
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
        // flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
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
    imageStyle: {
        width: 120,
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