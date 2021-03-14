import { StyleSheet } from 'react-native';
import { colors } from './Colors';
import { Dimensions } from 'react-native';

export const productWrap = (scale, translate) => StyleSheet.create({
    container: {
        flex: 1,
    },
    btnsContainer: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        width: Dimensions.get('window').width - 20,
        minHeight: Dimensions.get('window').height /5,
        marginBottom: 40,
        zIndex: 2,
        transform: [
            { translateY: translate },
        ],
    },
    transparentStripe: {
        width: Dimensions.get('window').width - 20,
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
    },
    btnTwo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 10,
    },
    iconWrapOne: {
        backgroundColor: colors.mainBtnGreen,
        width: 80,
        height: 80,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 5,
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
        backgroundColor: colors.mainBtnOrange,
        width: 80,
        height: 80,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 5,
          // Shadow
          elevation   : 5,
          overflow: 'hidden',
          //iOS:
          shadowColor: 'red',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2, 
    },
    iconWrapWhite: {
        backgroundColor: '#fff',
        width: 80,
        height: 80,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 5,
          // Shadow
          elevation   : 5,
          overflow: 'hidden',
          //iOS:
          shadowColor: 'red',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2, 
    },
    buttonWrapAnimated: {
        backgroundColor: colors.mainBtnOrange,
        width: 80,
        height: 80,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        transform: [
            { scale: scale }
        ],
        borderRadius: 5,
          // Shadow
          elevation   : 5,
          overflow: 'hidden',
          //iOS:
          shadowColor: 'red',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2, 
    },
    buttonAnimated: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textWrap: {
        flex: 1,
        marginLeft: 20,
    },
    optionsBtnWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.transparentLight,
        backgroundColor: colors.mainGrey,
        position: 'absolute',
        zIndex: 3,
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
        backgroundColor: colors.mainGrey,
        width: Dimensions.get('window').width /1,
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
        height: 65,
        paddingHorizontal: 5,
        borderBottomColor: colors.transparentLight,
        borderBottomWidth: 1,
    },
    btnWrap: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        paddingVertical: 10,
        alignItems: 'center',
    },
    btnIcon: {
        fontSize: 35,
        color: colors.mainBtnGreen,
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

export const diagram = (diagramLength, translate) => StyleSheet.create({
    productsContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: 7,
        height: Dimensions.get('window').height /4.7,
    },
    productsInnerContainer: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.mainGrey,
        paddingVertical: 5,
    },
    activeItemWrap: {
        maxHeight: '100%',
        flex: .95,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainerBad: {
        width: '95%',
        height: 150,
        backgroundColor: colors.mainBtnOrange,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    title: {
        marginBottom: 2,
        alignItems: 'center',
    },
    iconTranslation: {
        position: 'absolute',
        top: 0,
        right: 0,
        fontSize: 45,
        transform: [
            { translateY: translate }
        ]
    },
    // Diagram
    diagramContainer: {
        flex: 1,
        marginBottom: 20,
        marginTop: 10,
    },
    diagramWrap: {
        paddingHorizontal: 10,
    },
    measure: {
        fontSize: 15,
        paddingLeft: 5,
        bottom: 4,
        color: colors.mainBlack,
    },
    numberDiagramWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    singleLineWrap: {
        flex: .8,
        backgroundColor: colors.transparentLight,
        height: 10,
        alignItems: 'flex-start',
        marginRight: '1%',
    },
    itemNumberWrap: {
        flex: .2,
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    itemNumberWrapAnimation: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        zIndex:1,
    },
    itemNumberWrapAnimationSingle: {
        overflow: 'hidden',
        position: 'relative',
        // flex: .30,
        // backgroundColor: 'green'
        width: 10
    },
    itemNumberWrapAnimationEnergy: {
        overflow: 'hidden',
        position: 'relative',
        flex: .49,
    },
    amountDot: {
        paddingTop: 4,
    },
    animatedNumberContainer: {
        zIndex: -1,
        transform: [
           { translateY: 0 }
        ]
    },
    lineOneEnergy: {
        position: 'absolute',
        backgroundColor: colors.mainBtnGreen,
        height: '100%',
        width: diagramLength !== 0 ? (diagramLength / 9 + '%') : 1,
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
    lineTwoEnergy: {
        position: 'absolute',
        backgroundColor: colors.mainBtnOrange,
        width: diagramLength !== 0 ? ((diagramLength) / 9 + '%') : 1,
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
    lineOne: {
        position: 'absolute',
        backgroundColor: colors.mainBtnGreen,
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
        position: 'absolute',
        backgroundColor: colors.mainBtnOrange,
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
   scrollUp: {
        backgroundColor: colors.transparentLight,
        height: Dimensions.get('window').height /12.5,
        width: Dimensions.get('window').width /9.3,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 80,
        right: '1%',
    },
    ViewMoreIcon: {
        fontSize: 35
    },
    scrollUpIcon: {
        fontSize: 25
    },
    optionsBtnWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.transparentLight,
        marginTop: 20,
        height: 60,
        bottom: 0,
        marginHorizontal: 5,
    },
    optionsBtnText: {
        fontSize: 22,
        color: colors.mainBtnOrange
    },
    neutralBtnLiked: {
        backgroundColor: colors.mainGrey,
        width: 45,
        height: 45,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        position: 'absolute',
        bottom: 30,
    },
    neutralBtnLikedTwo: {
        backgroundColor: colors.editGreen,
        width: 45,
        height: 45,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        position: 'absolute',
        bottom: 4,
        left: 2
    },
})

export const CriteriaStyles = (scale, checkScale) => StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: .5,
        height: 49,
    },
    bulletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: .6,
        height: 49,
    },
    wrapThird: {
        flex: .33,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    bulletWrap: {
        height: 46,
        width: 46,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bulletWrapInner: {
        height: 28,
        width: 28,
        paddingVertical: 5,
        position: 'relative',
        borderRadius: 3,
        borderColor: colors.mainBlack,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    bulletActive: {
        fontSize: 75,
        color: colors.mainBtnGreen,
        paddingBottom: 15,
        left: 2,
        transform: [
            { scaleX: checkScale }
        ]
    },
    buttonResults: {
        fontSize: 35,
    },
    buttonWrapOne: {
        width: 90,
        height: 60,
        backgroundColor: colors.mainBtnOrange,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
         // Shadow
         elevation   : 5,
         overflow: 'hidden',
         //iOS:
         shadowColor: 'red',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity: 0.8,
         shadowRadius: 2, 
    },
    buttonWrapTwo: {
        width: 120,
        height: 70,
        backgroundColor: colors.mainBtnGreen,
        borderRadius: 5,
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
    },
    resultBtnsWrap: { 
        bottom: 10, 
        position: 'absolute', 
        alignSelf: 'center' 
    },
    buttonWrapAnimated: {
        width: 90,
        height: 60,
        backgroundColor: colors.mainBtnGreen,
        borderRadius: 5,
        transform: [
            { scale: scale },
        ],
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        zIndex: 20,
         // Shadow
         elevation: 5,
         overflow: 'hidden',
         //iOS:
         shadowColor: 'red',
         shadowOffset: { width: 1, height: 1 },
         shadowOpacity: 0.8,
         shadowRadius: 2, 
    },
    buttonAnimated: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})