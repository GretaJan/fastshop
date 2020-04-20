import { StyleSheet } from 'react-native';

export const styles = () => StyleSheet.create({
    container: {
        backgroundColor: '#335c67'
    },
    counter: {
        position: 'absolute',
        top: -6,
        left: 10,
        backgroundColor: '#ffcc33',
        width: 18,
        height: 18,
        borderRadius: 18/2
    },
    counterNo: {
        textAlign: 'center',
        textAlignVertical: 'center',
        right: 1,
        top: -1
    },
    iconItem: {
        color: '#FFFFE0',
        fontSize: 30,
    }
})