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

export const stylesGuest = (backgroundCategory, backgroundSubcategory, index) => StyleSheet.create({
    horizontalWrap: {
        alignItems: 'flex-start',
    },
    itemWrap: {
        backgroundColor: backgroundSubcategory ? backgroundSubcategory : colors.mainWhiteGrey,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        height: Dimensions.get('window').width / 3 - 14,
        width: Dimensions.get('window').width / 3 - 14,
        marginRight: (index % 3 != 0) ? 10 : 0,
        marginBottom: 10,
        // Shadow
        elevation   : .3,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
    },
    imageWrap: {
        height: (Dimensions.get('window').width / 3 - 14) / 1.7,
        width: '100%',
        paddingBottom: 5,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    image: {
        height: '100%',
        resizeMode: 'contain',
    },
    textWrap: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: (Dimensions.get('window').width / 3 - 14) / 2.8,
    },
    itemText: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    imageIcon: {
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed',
        fontSize: 50,
        color: '#000',
        backgroundColor: 'grey'
    }
})