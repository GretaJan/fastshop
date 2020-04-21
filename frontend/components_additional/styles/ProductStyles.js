import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';

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
        backgroundColor: 'rgba(255, 255, 255, .6)',
         // Shadow
         elevation   : 1,
         overflow: 'hidden',
         //iOS:
         shadowColor: 'red',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity: 0.8,
         shadowRadius: 2, 
    },
    itemText: {
        fontFamily: 'sans-serif-condensed',
        width: '75%',
        fontSize: 17,
        textAlign: 'left',
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
        marginRight: 10,
    },
    iconItem: {
        fontSize: 20,
    }
});

export const stylesGuestSingle = () => StyleSheet.create( {
    container: {
        flex: 1,
        textAlign: 'center',
        alignItems:'center',
        backgroundColor: '#FFFFE0',
    },
    imageContainer: {
        width: '50%',
        height: 180,
        textAlign: 'center',
        alignItems:'center',
        top: 10,
        zIndex: 1,
    },
    image: {
        height: '100%',
        resizeMode: 'contain',
        // borderRadius: 10,
    },
    emptyItem: {
        position: 'absolute',
        // backgroundColor: '#f8f8f8',
        backgroundColor: '#FFFFE0',
        width: 45,
        height: 45,
        borderRadius: 45/2,
        marginTop: 180,
        zIndex: 2,
    },
    emptyIcon: {
        fontSize: 20,
        top: 12,
        left: 18, 
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
        height: 80,
        alignItems: 'center',
        borderBottomColor: '#F7F7F7',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
    },
    listItemInfoWrap: {
        flex: 1,
    },
    componentTitle: {
       width: '79%',
       fontSize: 20,
       textTransform: 'uppercase',
       paddingLeft: 20,
    },
    componentAmount: {
        fontSize: 26,
    },
    componentMeasure: {
        fontSize: 20,
        color: '#615E49'
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