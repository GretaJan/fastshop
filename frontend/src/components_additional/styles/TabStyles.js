import { StyleSheet } from 'react-native';

export const styles = () => StyleSheet.create({
    container: {
        backgroundColor: '#335c67'
    },
    counter: {
        position: 'absolute',
        top: -6,
        // left: 11.3,
        left: '5%',
        backgroundColor: '#ffcc33',
        width: 20,
        height: 20,
        borderRadius: 20/2
    },
    counterNo: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed'
    },
    iconItem: {
        color: '#FFFFE0',
        fontSize: 30,
    }
})