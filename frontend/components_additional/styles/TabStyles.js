import { StyleSheet } from 'react-native';

export const styles = () => StyleSheet.create({
    container: {
        backgroundColor: '#335c67'
    },
    counter: {
        position: 'absolute',
        top: -6,
        left: 11,
        backgroundColor: '#ffcc33',
        width: 20,
        height: 20,
        borderRadius: 20/2
    },
    counterNo: {
        textAlign: 'center',
        textAlignVertical: 'center',
        right: 1,
        top: -1,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed'
    },
    iconItem: {
        color: '#FFFFE0',
        fontSize: 30,
    }
})