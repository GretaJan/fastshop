import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';

export const styles = () => StyleSheet.create({
    container: {
        backgroundColor: '#ffcc33',
        height: Dimensions.get('window').height /1,
    },
    inputsWrap: {
        marginTop: Dimensions.get('window').height /10,
    },
    textInput: {
        fontSize: 20,
        marginHorizontal: 30,
        height: 60,
        backgroundColor: '#FFFFE0',
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 15,
    },
    buttonsWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 140,
    },
    ButtonSave: {
        marginBottom: 20,
        borderColor: "#000",
        borderWidth: 1,
        width: Dimensions.get('window').width /2,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',   
        backgroundColor: '#aebd93', 
    },
    ButtonCancel: {
        borderColor: "#000",
        borderWidth: 1,
        width: Dimensions.get('window').width /2,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f79f79',
    },
    buttonTxt: {
        fontSize: 25,
    },
});