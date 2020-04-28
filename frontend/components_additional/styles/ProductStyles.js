import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';
import { colors } from './Colors';

export const styles = (background_color, border_color) => StyleSheet.create({
    // container: {
    //     marginTop: 8,
    //     // marginLeft: 10,
    //     // marginRight: 10
    // },
    // itemWrap: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     backgroundColor:'lightgrey',
    //     paddingLeft: 10,
    //     paddingRight: 10,
    //     paddingTop: 5,
    //     height: 50
    // },
    // itemText: {
    //     width: 'auto',
    //     fontSize: 20
    // },
    // itemInput: {
    //     backgroundColor: '#fff',
    //     width: '75%',
    //     fontSize: 20
    // },
    // itemButton: {
    //     flexBasis: '40'
    // },
    // iconItem: {
    //     paddingRight: 10
    // },
    // image: {
    //     height: 65,
    //     width: 65
    // },
    // backgroundColorIs: {
    //     backgroundColor: background_color,
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     backgroundColor:'lightgrey',
    //     paddingLeft: 10,
    //     paddingRight: 10,
    //     paddingTop: 5,
    //     height: 50
    // },
    // backgroundColorNull: {
    //     backgroundColor: '#E8E8E8',
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     backgroundColor:'lightgrey',
    //     paddingLeft: 10,
    //     paddingRight: 10,
    //     paddingTop: 5,
    //     height: 50
    // },
    // borderColorIs: {
    //     borderColor: border_color,
    //     borderWidth: 2,
    // },
    // borderColorNull: {
    //     borderColor: '#989898',
    //     borderWidth: 2,
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     backgroundColor:'lightgrey',
    //     paddingLeft: 10,
    //     paddingRight: 10,
    //     paddingTop: 5,
    //     height: 50
    // },

   

});

export const stylesGuest = () => StyleSheet.create( {
    container: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: colors.mainWhiteYellow,
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
        resizeMode: 'contain'        
    },
    imageIcon: {
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed',
        fontSize: 50,
        color: '#000'
    },
    iconWrap: {
        paddingRight: 10,
    },
    iconItem: {
        fontSize: 30,
    }
});

export const stylesGuestSingle = (color) => StyleSheet.create( {
    container: {
        flex: 1,
        textAlign: 'center',
        alignItems:'center',
        backgroundColor: colors.mainWhiteYellow,
    },
    imageContainer: {
        width: Dimensions.get('window').width /2.3,
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
        marginTop: 180,
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyIcon: {
        fontSize: 45,
        color: colors.mainYellow
        // top: 12,
        // left: 18, 
    },
    listContainer: {
        backgroundColor: color ? color : colors.yellowGreenish,
        flex: 1,
        // maxWidth: Dimensions.get('window').width /1,
        width: Dimensions.get('window').width /1,
        paddingHorizontal: 20,
        paddingTop: 15,
        marginTop: 10,
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
        // justifyContent: 'center'
        alignItems: 'flex-start',
    },
    componentTitle: {
       width: '65%',
       fontSize: 20,
       textTransform: 'uppercase',
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
        borderBottomColor: color ? color : colors.yellowGreenish,
        borderLeftColor: 'transparent',
        position: 'absolute',
        top: 120,
        zIndex: 0
      },
});

export const authProducts = () => StyleSheet.create({
    container: {
        flex: 1,
        minHeight: Dimensions.get('window').height /1,
        backgroundColor: colors.mainYellow,
        zIndex: 0,
    }
}) 


export const authProduct = (color) => StyleSheet.create({
    imageIconWrap: {
        zIndex: 10,
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
    listContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        backgroundColor: color ? color : colors.yellowGreenish,
        width: Dimensions.get('window').width /1,
        marginTop: 10,
    },
    backgroundRectangle: {
        width: 80,
        height: 40,
        borderColor: colors.mainWhiteYellow,
        borderWidth: 2,
    },
    editBtnWrap: {
        position: 'absolute',
        right: 50,
        zIndex: 10,
        top: 25,
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
    iconsWrap: {
        position: 'absolute',
        right: 50,
        zIndex: 10,
        top: 22,
        zIndex: 11,
    },
    emptyItem: {
        position: 'absolute',
        zIndex: 12,
        alignSelf: 'center',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: colors.mainWhiteYellow,
        height: 50,
        width: 50,
        borderRadius: 45/2,
        top: 160,
    },
    emptyIcon: {
        fontSize: 42,
        color: colors.bordo,
    },
    iconImgSave: {
        fontSize: 45,
        color: colors.mediumGreen2,
        padding: 5,
    },
    editImgIcon: {
        fontSize: 35,
    },
    iconImgCancel: {
        fontSize: 42,
        color: colors.bordo,
    },
    iconEdit: {
        fontSize: 35,
    },
    iconSave: {
        fontSize: 45,
        color: colors.mediumGreen2,
        padding: 5,
    },
    iconCancel: {
        fontSize: 45,
        color: colors.bordo,
        padding: 5,
    },
}) 