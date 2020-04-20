import { StyleSheet } from 'react-native';

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
    searchBarContainer: {
        flexDirection: 'row',
        top: 0,
    },
    searchBarIcon: {
        width: 'auto',
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 5,
        marginBottom: 15,
        fontSize: 20,
        marginLeft: 5,
    },
    searchBarInput: {
        position: 'absolute',
        width: '85%',
        marginLeft: 35,
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingBottom: -20,
        marginTop: 0,
        marginBottom: 30,
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
    },
    image: {
        height: '100%',
        resizeMode: 'contain',
        // borderRadius: 10,
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // marginHorizontal: 20,
        flexDirection: 'row',
        paddingHorizontal: 20,
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
    listItemsTitleWrap: {
        marginTop: 30,
        width: '40%',
        backgroundColor: 'blue',
    },
    listItemsTitle: {
        fontSize: 16,
    },
    listItemsWrap: {
        marginTop: 30,
        width: '40%',
        backgroundColor: 'red',
        textAlign: 'center',
    },
    listItems: {
        fontSize: 16,
    }
});