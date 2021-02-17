import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import { diagram } from '../../components_additional/styles/CompareStyles';
import { containerStyles } from '../../components_additional/styles/GeneralStyles';
import { stylesGuestSingle } from '../../components_additional/styles/ProductStyles';
import { animations } from '../../components_additional/styles/AnimationStyles';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { connect } from 'react-redux';
import { clearResults, saveCombination } from '../../redux/actions/comparisonActions';
import { withNavigation } from 'react-navigation';
import ResultsBestWorstChild from './ResultsBestWorstChild';

const { comparisonAnimations } = require('../../components_additional/styles/Animations.js');
const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon);

const ResultsOfBestWorst = ({ result, clearResults, navigation: { navigate } }) => {
    let scrollTopRef = null;
    const { match, mismatch } = result;
    const translateMatch = useState(new Animated.Value(-100))[0];
    const translateMismatch = useState(new Animated.Value(-100))[0];

    useEffect(() => {
        // callDiagramAnimation();
        comparisonAnimations.imageIconTranslation(translateMatch, translateMismatch);

    }, [])
    const nameSlice = (name) => {
        if(name.length > 33) {
           var newName = name.slice(0, 33);
            return (
                <Text style={diagram().text}>{ newName }...</Text>
            )
        } else {
            return (
                <Text style={diagram().text}>{ name }</Text>
            )
        }
    }
    const scrollUp = () => {
        scrollTopRef.scrollTo({y: 0, animated: true});
    }

    const invokeClearResults = () => {
        clearResults();
        setTimeout(() => {
            navigate("SelectedProducts");
        }, 0)
    }

    const invokeSaveCombination = () => {
        saveCombination(match, mismatch)
    }

    return (
        <ScrollView style={ containerStyles().simpleContainer } ref={scrollView => scrollTopRef = scrollView}>
            { Object.keys(result).length === 0 ? (
                <View style={diagram().container}>
                </View>
                ) : (
                <>
                    <View style={diagram().productsContainer} >
                        <View style={diagram().productsInnerContainer}>
                            <TouchableOpacity style={diagram().activeItemWrap} onPress={() => navigate("Product", {subcategoryId: match.subcategory_id, productId: match.id})} >
                                { match.image ? (
                                    <Image style={diagram().image} source={{ uri: match.image }} />
                                    ) : (
                                    <Image style={diagram().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                                )}
                                <View style={diagram().title} >
                                    <Text style={diagram().text}>{ nameSlice(match.name) }</Text>
                                </View>
                            </TouchableOpacity>
                            <AnimatedIonIcon name="md-checkmark" color='#32bd81' style={diagram(null, translateMatch).iconTranslation} />
                        </View>
                        <View  style={diagram().productsInnerContainer}>
                            <TouchableOpacity style={diagram().activeItemWrap} onPress={() => navigate("Product", {subcategoryId: mismatch.subcategory_id, productId: mismatch.id})}>
                                {mismatch.image ? (
                                    <Image style={diagram().image} source={{ uri: mismatch.image }} />
                                    ) : (
                                        <Image style={diagram().image} source={require('../../components_additional/images/noimage.jpeg')}  />
                                )}
                                <View style={diagram().title} >
                                    <Text style={diagram().text}>{ nameSlice(mismatch.name) }</Text>
                                </View>
                            </TouchableOpacity>
                            <AnimatedIonIcon name="md-close" color='#ff7725' style={ diagram(null, translateMismatch).iconTranslation } />
                        </View>
                        {/* Diagram */}
                    </View>
                    <View style={diagram().diagramContainer}>
                        <ResultsBestWorstChild 
                            title='Energy'
                            matchComponent={ match.energy }
                            matchComponentArr={ match.energyArr }
                            mismatchComponent={ mismatch.energy }
                            mismatchComponentArr={ mismatch.energyArr }
                        />
                        <ResultsBestWorstChild 
                            title='Fat'
                            matchComponent={ match.fat }
                            matchComponentArr={ match.fatArr }
                            mismatchComponent={ mismatch.fat }
                            mismatchComponentArr={ mismatch.fatArr }
                        />
                        <ResultsBestWorstChild 
                            title='Saturated fat'
                            matchComponent={ match.saturated }
                            matchComponentArr={ match.saturatedArr }
                            mismatchComponent={ mismatch.saturated }
                            mismatchComponentArr={ mismatch.saturatedArr }
                        />
                        <ResultsBestWorstChild 
                            title='Carbohidrates'
                            matchComponent={ match.carbs }
                            matchComponentArr={ match.carbsArr }
                            mismatchComponent={ mismatch.carbs }
                            mismatchComponentArr={ mismatch.carbsArr }
                        />
                        <ResultsBestWorstChild 
                            title='Sugar'
                            matchComponent={ match.sugar }
                            matchComponentArr={ match.sugarArr }
                            mismatchComponent={ mismatch.sugar }
                            mismatchComponentArr={ mismatch.sugarArr }
                        />
                        <ResultsBestWorstChild 
                            title='Fiber'
                            matchComponent={ match.fiber }
                            matchComponentArr={ match.fiberArr }
                            mismatchComponent={ mismatch.fiber }
                            mismatchComponentArr={ mismatch.fiberArr }
                        />
                        <ResultsBestWorstChild 
                            title='Protein'
                            matchComponent={ match.protein }
                            matchComponentArr={ match.proteinArr }
                            mismatchComponent={ mismatch.protein }
                            mismatchComponentArr={ mismatch.proteinArr }
                        />
                        <ResultsBestWorstChild 
                            title='Salt'
                            matchComponent={ match.salt }
                            matchComponentArr={ match.saltArr }
                            mismatchComponent={ mismatch.salt }
                            mismatchComponentArr={ mismatch.saltArr }
                        />  
                        <TouchableOpacity style={(diagram().scrollUp)} onPress={ scrollUp }>
                            <IonIcon style={diagram().scrollUpIcon} name="ios-arrow-up" />
                        </TouchableOpacity>
                        <TouchableOpacity style={diagram().optionsBtnWrap} onPress={ invokeSaveCombination }>
                            <Text style={diagram().optionsBtnText}>Save Results</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={diagram().optionsBtnWrap} onPress={ invokeClearResults }>
                            <Text style={diagram().optionsBtnText}>Clear Results</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </ScrollView>
    )
}

const mapStateToProps = state => ({
    result: state.selectedProducts.result,
})

// function useInterval(callback, delay) {
//     const getCallback = useRef();

//     useEffect(() => {
//         getCallback.current = callback;
//     }, [callback]);
//     useEffect(() => {
//         function tick() {
//             getCallback.current();
//         }
//         if(delay !== null) {
//             let id = setInterval(tick, 0);
//             return () => clearInterval(id);
//         }
//     }, [delay])
// }


export default withNavigation(connect(mapStateToProps, {clearResults})(ResultsOfBestWorst))
