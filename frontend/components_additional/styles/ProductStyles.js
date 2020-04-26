import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';
import { colors } from './Colors';

export const styles = (background_color, border_color) => StyleSheet.create({
    container: {
        marginTop: 8,
        // marginLeft: 10,
        // marginRight: 10
    },
    itemWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'lightgrey',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        height: 50
    },
    itemText: {
        width: 'auto',
        fontSize: 20
    },
    itemInput: {
        backgroundColor: '#fff',
        width: '75%',
        fontSize: 20
    },
    itemButton: {
        flexBasis: '40'
    },
    iconItem: {
        paddingRight: 10
    },
    image: {
        height: 65,
        width: 65
    },
    backgroundColorIs: {
        backgroundColor: background_color,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'lightgrey',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        height: 50
    },
    backgroundColorNull: {
        backgroundColor: '#E8E8E8',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'lightgrey',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        height: 50
    },
    borderColorIs: {
        borderColor: border_color,
        borderWidth: 2,
    },
    borderColorNull: {
        borderColor: '#989898',
        borderWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'lightgrey',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        height: 50
    },
});

export const stylesGuest = () => StyleSheet.create( {
    container: {
        // backgroundColor: '#ffdc75',
        backgroundColor: '#ffcc33',
        flex: 1,
        textAlign: 'center',
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

export const stylesGuestSingle = () => StyleSheet.create( {
    container: {
        flex: 1,
        textAlign: 'center',
        alignItems:'center',
        backgroundColor: colors.mainWhiteYellow,
    },
    imageContainer: {
        height: Dimensions.get('window').width /2.3,
        height: 180,
        textAlign: 'center',
        alignItems:'center',
        top: 10,
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
        backgroundColor: 'lightblue',
        flex: 1,
        // maxWidth: Dimensions.get('window').width /1,
        width: Dimensions.get('window').width /1,
        paddingHorizontal: 20,
        paddingTop: 15,
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
        borderBottomColor: 'lightblue',
        borderLeftColor: 'transparent',
        position: 'absolute',
        top: 120,
        zIndex: 0
      },
});