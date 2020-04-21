import { StyleSheet } from 'react-native';

export const searchBar = () =>  StyleSheet.create({
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
        fontSize: 14
    },
});