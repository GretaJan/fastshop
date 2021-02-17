import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';
import { colors } from './Colors';


export const styles = (background) => StyleSheet.create({
    container: {
        backgroundColor: background ? background : colors.mainGrey,
        flex: 1,
        // flex: 1,
        // textAlign: 'center',
        // backgroundColor: color ? color : colors.mainGrey,
    },
    itemWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'lightgrey',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        height: 50,
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
        backgroundColor: background ? background : colors.mainGrey,
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
    }
});

export const stylesGuest = (backgroundCategory, backgroundSubcategory) => StyleSheet.create({
    // container: {
        // backgroundColor: backgroundCategory ? backgroundCategory : colors.mainGrey,
        // flex: 1,
        // textAlign: 'center',
        // paddingHorizontal: 12,
        // flex: 1,
        // textAlign: 'center',
        // backgroundColor: backgroundCategory ? backgroundCategory : colors.mainGrey,
    // },
    horizontalWrap: {
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        // alignSelf: 'center',
        alignItems: 'flex-start',
        maxWidth: Dimensions.get('window').width
    },
    itemWrap: {
        backgroundColor: backgroundSubcategory ? backgroundSubcategory : colors.mainWhiteGrey,
        paddingVertical: 5,
        marginBottom: Dimensions.get('window').width / 101,
        borderRadius: 10,
        alignItems: 'center',
        alignContent: 'center',
        width: Dimensions.get('window').width / 4.25,
        marginHorizontal: 2,
        // Shadow
        elevation   : 5,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
    },
    imageWrap: {
        width: '95%',
        height: 60,
        paddingTop: 7,
    },
    image: {
        height: '100%',
        resizeMode: 'contain'        
    },
    textWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 15,
        paddingTop: 5,
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    imageIcon: {
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed',
        fontSize: 50,
        color: '#000'
    }
})