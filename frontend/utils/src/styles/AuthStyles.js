import { StyleSheet } from 'react-native';
import { colors } from './Colors';
import { Dimensions } from 'react-native';

export const userModalStyle = () => StyleSheet.create({
    // container: {
    //     paddingVertical: 18,
    //     width: Dimensions.get('window').width /1.1,
    //     top: Dimensions.get('window').height /7.4,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     position: 'absolute',
    //     zIndex: 50,
    //     alignSelf: 'center',
    //     // Shadow
    //     elevation   : 1,
    //     overflow: 'hidden',
    //     //iOS:
    //     shadowColor: 'red',
    //     shadowOffset: { width: 1, height: 1 },
    //     shadowOpacity: 0.8,
    //     shadowRadius: 2, 
    //     backgroundColor: '#fff',
    // },
    // input: {
    //     borderColor: colors.mainBtnGreen,
    //     borderWidth: 2,
    //     width: '85%',
    //     marginBottom: 20,
    // },
    // buttonGreen: {
    //     height: 42,
    //     width: 112,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: colors.mainBtnGreen,
    //     // Shadow
    //     elevation: .02,
    //     overflow: 'hidden',
    //     //iOS:
    //     shadowColor: 'red',
    //     shadowOffset: { width: 1, height: 1 },
    //     shadowOpacity: 0.2,
    //     shadowRadius: 2, 
    // },
    // buttonsRowWrap: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     width: '100%'
    // },
    // buttonGrey: {
    //     height: 42,
    //     width: 112,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: colors.mainWhiteGrey,
    //     marginLeft: 10,
    //     // Shadow
    //     elevation: .02,
    //     overflow: 'hidden',
    //     //iOS:
    //     shadowColor: 'red',
    //     shadowOffset: { width: 1, height: 1 },
    //     shadowOpacity: 0.2,
    //     shadowRadius: 2, 
    // },
});

export const styles = (background) => StyleSheet.create({
    container: {
        backgroundColor: background ? background : '#e5e9ee',
        height: Dimensions.get('window').height /1,
    },
    inputsWrap: {
        marginTop: Dimensions.get('window').height /10,
    },
    textInput: {
        fontSize: 18,
        marginHorizontal: 30,
        height: 50,
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
    error: {
        
    }
});

// export const inputErrors = () => StyleSheet.create({
//     container: {
//         minHeight: 33,
//         justifyContent: 'center',
//         width: '85%',
//         paddingLeft: 4,
//         fontSize: 17,
//     },
//     message: {
//         fontSize: 16
//     }
// });