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
          // Shadow
          elevation   : 5,
          overflow: 'hidden',
          //iOS:
          shadowColor: 'red',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2, 
    },
    buttonsWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 140,
    },
});