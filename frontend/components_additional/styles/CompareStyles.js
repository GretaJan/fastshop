import { StyleSheet } from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import { colors } from './Colors';

export const productWrap = () => StyleSheet.create({
    arrayContainer: {
        marginVertical: 10,
    },
    btnsContainer: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    infoTxt: {
        fontSize: 20
    },
    iconItem: {
        fontSize: 45
    },
    btnOne: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginHorizontal: 20,
    },
    btnTwo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginHorizontal: 20,
    },
    iconWrapOne: {
        backgroundColor: colors.mediumGreen2,
        paddingHorizontal: 30,
        paddingVertical: 20,
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 10,
          // Shadow
          elevation   : 5,
          overflow: 'hidden',
          //iOS:
          shadowColor: 'red',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2, 
    },
    iconWrapTwo: {
        backgroundColor: colors.orangeBright,
        paddingHorizontal: 30,
        paddingVertical: 20,
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 10,
          // Shadow
          elevation   : 5,
          overflow: 'hidden',
          //iOS:
          shadowColor: 'red',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2, 
    },
    textWrap: {
        flex: 1,
        marginLeft: 10,
    }
})