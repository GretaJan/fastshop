import { StyleSheet } from 'react-native';
import { colors } from './Colors';
import {Dimensions} from 'react-native';

export const productWrap = () => StyleSheet.create({
    container: {
        flex: 1,
    },
    flatListScrollSmall: {
        height: Dimensions.get('window').height /2.4,
    },
    flatListScrollFull: {
        height: Dimensions.get('window').height /1.4,
        zIndex: 2
    },
    arrayContainer: {
        marginVertical: 5,
    },
    btnsContainer: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        // minHeight: Dimensions.get('window').height /5,
        marginBottom: 45,
        zIndex: 0,
    },
    transparentStripe: {
        width: '92%',
        height: 1,
        backgroundColor: colors.transparentLight,
        zIndex: 10,
        marginBottom: 10,
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
        width: 85,
        height: 85,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
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
        width: 85,
        height: 85,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
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
    },
    optionsBtnWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.transparentLight,
        position: 'absolute',
        zIndex: 3,
        // marginTop: 5,
        height: 40,
        bottom: 0,
        width: Dimensions.get('window').width /1
    },
    optionsBtnText: {
        fontSize: 22,
    },
});

export const descAscDropDown = () => StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 5,
        backgroundColor: colors.mainYellow,
        width: Dimensions.get('window').width /1,
        // minHeight: Dimensions.get('window').height /1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
     
    },
    itemWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        paddingHorizontal: 30,
        borderBottomColor: colors.transparentLight,
        borderBottomWidth: 1,
        // borderColor: activeItem ? colors.mainWhiteYellow : 'rgba(0, 0, 0, 0)',
        // borderWidth: 3,
    },
    text: {
        fontSize: 18,
        textTransform: 'uppercase'
    },
    btnWrap: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        paddingVertical: 10,
        alignItems: 'center',
    },
    iconWrap: {
        // backgroundColor: colors.mediumGreen2,
        // paddingVertical: 10,
    },
    btnIcon: {
        fontSize: 35,
        color: colors.mediumGreen2,
    },
    btnText: {
        fontSize: 20,
        marginLeft: 10 
    },
    icon: {
        fontSize: 20,
        color: colors.mainBlack,
    }
})

export const diagram = (diagramLength) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainYellow,
        paddingTop: 10
    },
    mainContentContainer: {
    },
    productsContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: 0,
    },
    itemGoodWrap: {
        flex: 0.5,
        alignItems: 'center'
    },
    itemBadWrap: {
        flex: 0.5,
        alignItems: 'center'
    },
    imageContainerGood: {
        width: '95%',
        height: 150,
        backgroundColor: colors.mediumGreen2,
        // borderColor: colors.mediumGreen2,
        // borderWidth: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    image: {
        width: '75%',
        height: '75%',
        // borderRadius: 10
    },
    imageContainerBad: {
        width: '95%',
        height: 150,
        backgroundColor: colors.orangeBright,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    title: {
        marginTop: 5,
        marginBottom: 7,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        paddingHorizontal: 12,
        textAlign: 'center',
        fontSize: 18,
    },
    // Diagram
    diagramContainer: {
        flex: 1,
        marginBottom: 20,
        marginTop: 10
    },
    diagramWrap: {
        paddingHorizontal: 20,
    },
    linesWrap: {

    },
    componentTitle: {
        fontSize: 18,
    },
    number: {
        fontSize: 18,
    },
    measure: {
        fontSize: 15,
        marginLeft: 5,
        color: colors.mainBlack,
    },
    diagramLineWrap: {
    },
    numberDiagramWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    singleLineWrap: {
        flex: .78,
        backgroundColor: colors.transparentLight,
        height: 10,
        // alignItems: 'flex-start',
    },
    itemNumberWrap: {
        flex: .18,
        paddingLeft: 20,
        // textAlign: 'center',
        flexDirection: 'row',

    },
    lineOne: {
        backgroundColor: colors.mediumGreen2,
        width: diagramLength !== 0 ? (diagramLength + '%') : 1,
        maxWidth: '100%',
        height: 10,
        // Shadow
        elevation: 3,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
    },
    lineTwo: {
        backgroundColor: colors.orangeBright,
        width: diagramLength !== 0 ? (diagramLength + '%') : (1),
        maxWidth: '100%',
        height: 10,
        // Shadow
        elevation: 3,
        overflow: 'hidden',
        //iOS:
        shadowColor: 'red',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
    },
    // Main Diagram style:
    mainDiagramWrap: {
        flex: 1,
        paddingHorizontal: 18,
        marginTop: 4,
        marginBottom: 5
    },
    mainLinesWrap: {

    },
    mainComponentTitle: {
        fontSize: 20
    },
    mainDiagramLineWrap: {
    },
    mainNumberDiagramWrap: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainSingleLineWrap: {
        flex: .7,
        backgroundColor: colors.transparentLight,
        height: 11,
        
    },
    mainLineOne: {
        backgroundColor: colors.mediumGreen2,
        width: diagramLength !== 0 ? (diagramLength / 100 + '%') : (0),
        maxWidth: '100%',
        height: 11,
        borderColor: colors.transparentLight,
        borderWidth: 2,
         // Shadow
         elevation: 3,
         overflow: 'hidden',
         //iOS:
         shadowColor: 'red',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity: 0.8,
         shadowRadius: 2, 
    },
    mainLineTwo: {
        backgroundColor: colors.orangeBright,
        width: diagramLength !== 0 ? (diagramLength / 100 + '%') : (0),
        maxWidth: '100%',
        height: 11,
         // Shadow
         elevation: 3,
         overflow: 'hidden',
         //iOS:
         shadowColor: 'red',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity: 0.8,
         shadowRadius: 2, 
    },
    mainItemNumberWrap: {
        flex: .3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    mainNumber: {
        paddingLeft: 30,
        fontSize: 20,
    },
    mainMeasure: {
        fontSize: 16,
        marginLeft: 5,
        color: colors.mainBlack,
    },
    dropDownIconWrapNoScroll: {
        backgroundColor: colors.transparentLight,
        height: Dimensions.get('window').height /12.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        width: Dimensions.get('window').width /1.05,
        alignSelf: 'center',
    },
   scrollUp: {
        backgroundColor: colors.transparentLight,
        height: Dimensions.get('window').height /12.5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 10,
        right: '1%',
    },
    ViewMoreIcon: {
        fontSize: 35
    },
    scrollUpIcon: {
        fontSize: 25
    }
})

export const CriteriaStyles = () => StyleSheet.create({
    container: {
        height: Dimensions.get('window').height /1 - 140,
        backgroundColor: colors.mainYellow
    },
    itemContainer: {
        flexDirection: 'row',
        marginVertical: '2.2%',
        marginHorizontal: '3%',
    },
    itemTitle: {
        fontSize: 20,
        flex: .5,
    },
    bulletContainer: {
        flexDirection: 'row',
        flex: .5,
    },
    wrapThird: {
        flex: .33,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
    },
    bulletWrap: {
        height: 26,
        width: 26,
        borderRadius: 13,
        borderColor: colors.mainBlack,
        borderWidth: 1,
        position: 'relative',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    bulletInactive: {
        height: 14,
        width: 14,
        borderRadius: 7,
        borderWidth: 1,
        position: 'absolute',
        // backgroundColor: '#dcdcdc',
        backgroundColor: colors.mainWhiteYellow,
        left: 5,
        top: 5,
    },
    bulletActive: {
        position: 'absolute',
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: colors.orangeBright,
        borderColor: colors.mainBlack, 
        borderWidth: 1,
        left: 5,
        top: 5,
    },
    buttonResults: {
        fontSize: 45,
    },
    buttonWrap: {
        width: 120,
        height: 70,
        backgroundColor: colors.orangeBright,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        bottom: 0,
        position: 'absolute',
        bottom: 8,
        zIndex: 20,
         // Shadow
         elevation   : 5,
         overflow: 'hidden',
         //iOS:
         shadowColor: 'red',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity: 0.8,
         shadowRadius: 2, 
    }
})