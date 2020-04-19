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
    background_color: {
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
    border_color: {
        backgroundColor: border_color,
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