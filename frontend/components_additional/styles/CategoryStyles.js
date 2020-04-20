import { StyleSheet } from 'react-native';

export const styles = (background_color, border_color) => StyleSheet.create({
    container: {
        marginTop: 8,
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

export const stylesGuest = () => StyleSheet.create({
    // itemWrap: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },
    // image: {
    //     height: 50,
    //     width: 50
    // }    
    container: {
        // display: 'flex',
        backgroundColor: '#F7B801',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
    image: {
        width: 100,
        height: 100,
    },
    categoriesContainer: {
        // 
        // flex: 1,
        

    }
})